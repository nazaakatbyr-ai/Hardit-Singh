import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { db, BUSINESS_INFO } from './server/db.ts';
import { processChatMessage, extractProductIntent } from './server/chatEngine.ts';
import { processLeadSubmission, emailOutbox } from './server/emailService.ts';
import { syncAllApprovedPages, syncApprovedUrl, APPROVED_NAZAAKAT_URLS } from './server/knowledgeSync.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Middleware
  app.use(cors());
  app.use(express.json());

  // Embed script serving with correct JS header
  app.get('/widget.js', (req, res) => {
    const filePath = path.join(process.cwd(), 'public', 'widget.js');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.sendFile(filePath);
    } else {
      res.status(404).send('// Widget script not found');
    }
  });

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Nazaakat Concierge Backend',
      brand: BUSINESS_INFO.brandName,
      website: BUSINESS_INFO.websiteUrl,
      leadEmail: BUSINESS_INFO.leadEmail,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Business contact info
  app.get('/api/contact', (req, res) => {
    res.json({
      success: true,
      contact: BUSINESS_INFO,
    });
  });

  app.post('/api/contact', (req, res) => {
    res.json({
      success: true,
      contact: BUSINESS_INFO,
    });
  });

  // 3. POST /api/chat - Main conversational AI endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { sessionId = 'default_session', message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Valid message string is required.' });
      }

      // Record user message
      db.addMessage({
        session_id: sessionId,
        role: 'user',
        message: message.trim(),
      });

      // Process grounded response through chatEngine
      const assistantMessage = await processChatMessage(sessionId, message.trim());

      res.json({
        success: true,
        sessionId,
        reply: assistantMessage.message,
        intent: assistantMessage.intent,
        matched_products: assistantMessage.matched_products || [],
        verified_facts: assistantMessage.verified_facts || [],
        action_required: assistantMessage.action_required || null,
      });
    } catch (error: any) {
      console.error('[API /api/chat] Error:', error);
      res.status(500).json({
        success: false,
        reply:
          'I’m having a little trouble accessing that information right now. Please try again or contact our NazaakatbyR team for assistance.',
      });
    }
  });

  // 4. Products APIs
  app.get('/api/products', (req, res) => {
    const { category, occasion, style, max_price, colour, size, is_new_arrival } = req.query;

    const filtered = db.filterProducts({
      category: category as string,
      occasion: occasion as string,
      style: style as string,
      max_price: max_price ? parseInt(max_price as string, 10) : undefined,
      colour: colour as string,
      size: size as string,
      is_new_arrival: is_new_arrival === 'true' ? true : undefined,
    });

    res.json({
      success: true,
      total: filtered.length,
      products: filtered,
    });
  });

  app.get('/api/products/search', (req, res) => {
    const q = (req.query.q as string) || '';
    const filtered = db.filterProducts({ search: q });
    res.json({
      success: true,
      query: q,
      total: filtered.length,
      products: filtered,
    });
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.products.find((p) => p.id === req.params.id || p.slug === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found in verified database.' });
    }
    res.json({ success: true, product });
  });

  // 5. GET /api/categories
  app.get('/api/categories', (req, res) => {
    const categories = [
      { id: 'ethnic-suit', name: 'Ethnic Suit', description: 'Curated suits with artisanal handblock and embroidery.' },
      { id: 'anarkali', name: 'Anarkali', description: 'Regal flared silhouettes for weddings and grand festivities.' },
      { id: 'co-ord-set', name: 'Co-ord Set', description: 'Contemporary coordinated sets in modal silk and georgette.' },
    ];
    res.json({ success: true, categories });
  });

  // 6. FAQs and Policies
  app.get('/api/faqs', (req, res) => {
    res.json({
      success: true,
      faqs: db.faqs.filter((f) => f.status === 'active'),
    });
  });

  app.get('/api/policies', (req, res) => {
    res.json({
      success: true,
      policies: db.policies.filter((p) => p.status === 'active'),
    });
  });

  // 7. Leads API (POST and GET)
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, phone, email, product, requirement, sessionId = 'web_lead' } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and Phone number are required.' });
      }

      const result = await processLeadSubmission({
        name,
        phone,
        email,
        product,
        requirement: requirement || 'General outfit assistance',
        sessionId,
      });

      res.json(result);
    } catch (err: any) {
      console.error('[API /api/leads] Error:', err);
      res.status(500).json({ error: 'Failed to process enquiry.' });
    }
  });

  app.get('/api/leads', (req, res) => {
    res.json({
      success: true,
      total: db.leads.length,
      leads: db.leads,
      emailOutbox,
    });
  });

  // 8. Analytics API
  app.post('/api/analytics', (req, res) => {
    const { event_name, session_id, metadata } = req.body;
    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required.' });
    }
    const event = db.trackAnalytics(event_name, session_id, metadata);
    res.json({ success: true, event });
  });

  app.get('/api/analytics', (req, res) => {
    res.json({
      success: true,
      total: db.analytics.length,
      events: db.analytics.slice(-100),
    });
  });

  // 9. Knowledge Base & Sync
  app.get('/api/knowledge', (req, res) => {
    res.json({
      success: true,
      approvedUrls: APPROVED_NAZAAKAT_URLS,
      totalDocuments: db.knowledgeDocs.length,
      totalChunks: db.knowledgeChunks.length,
      documents: db.knowledgeDocs,
    });
  });

  app.post('/api/knowledge/sync', async (req, res) => {
    try {
      const { url } = req.body || {};
      if (url) {
        const result = await syncApprovedUrl(url);
        return res.json({ success: true, result });
      }

      const syncResult = await syncAllApprovedPages();
      res.json({ success: true, ...syncResult });
    } catch (err: any) {
      console.error('[API /api/knowledge/sync] Error:', err);
      res.status(500).json({ error: err.message || 'Failed to sync knowledge' });
    }
  });

  // 10. Outfit Finder Guided Endpoint
  app.post('/api/outfit-finder', (req, res) => {
    const { occasion, style, category, colour, budget, size } = req.body;

    let maxPrice: number | undefined = undefined;
    if (budget && budget !== 'No Budget Preference') {
      const numMatch = budget.toString().replace(/[^0-9]/g, '');
      if (numMatch) maxPrice = parseInt(numMatch, 10);
    }

    const matched = db.filterProducts({
      category: category && category !== 'Surprise Me' ? category : undefined,
      occasion: occasion && occasion !== 'Other' ? occasion : undefined,
      style: style || undefined,
      colour: colour && colour !== 'No Preference' ? colour : undefined,
      size: size || undefined,
      max_price: maxPrice,
    });

    db.trackAnalytics('outfit_finder_completed', req.body.sessionId, {
      occasion,
      style,
      category,
      matchCount: matched.length,
    });

    res.json({
      success: true,
      count: matched.length,
      products: matched,
      recommendationNote:
        matched.length > 0
          ? `We found ${matched.length} verified NazaakatbyR piece${matched.length > 1 ? 's' : ''} matching your preferences.`
          : 'No active pieces directly match this combination right now. Our team can assist with bespoke tailoring.',
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nazaakat Concierge] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
