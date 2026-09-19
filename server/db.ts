import {
  Product,
  FAQ,
  Policy,
  KnowledgeDocument,
  KnowledgeChunk,
  Lead,
  ChatSession,
  ChatMessage,
  AnalyticsEvent,
  BusinessContactInfo,
} from '../src/types.ts';

export const BUSINESS_INFO: BusinessContactInfo = {
  brandName: 'NazaakatbyR',
  tagline: 'Where Indian Elegance Meets Modern Fashion',
  boutiqueOverview:
    'NazaakatbyR is a women’s ethnic fashion boutique where Indian elegance meets modern fashion. The brand celebrates timeless elegance, individuality, graceful ethnic wear, festive outfits, contemporary silhouettes, and statement pieces.',
  leadEmail: process.env.LEAD_EMAIL || 'nazaakatbyr@gmail.com',
  phone: process.env.BUSINESS_PHONE || '8377090909',
  whatsapp: process.env.WHATSAPP_NUMBER || '8377090909',
  instagram: '@nazaakatbyR',
  businessHours: '10 a.m. – 6 p.m.',
  websiteUrl: process.env.WEBSITE_URL || 'https://nazaakatbyr.com/',
  orderProcessing: '2–3 business days',
  orderDelivery: '5–7 business days',
  returnExchangeWindow: '7 days of delivery',
};

// Verified Policy Records Grounded in NazaakatbyR Website
export const INITIAL_POLICIES: Policy[] = [
  {
    policy_type: 'shipping_delivery',
    title: 'Shipping & Delivery Policy',
    content:
      'Orders are generally processed within 2–3 business days. Once dispatched, standard delivery usually takes 5–7 business days across India. Tracking information is provided via SMS and email upon shipment. We partner with reliable courier partners to ensure safe and prompt transit.',
    source_url: 'https://nazaakatbyr.com/shipping-delivery/',
    version: '2026.1',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    policy_type: 'return_exchange',
    title: 'Return & Exchange Policy',
    content:
      'Eligible return or exchange requests must be initiated within 7 days of delivery, subject to our published conditions. The garment must be unworn, unwashed, unaltered, and returned in its original boutique packaging with all tags intact. Custom-tailored or altered outfits are not eligible for exchange.',
    source_url: 'https://nazaakatbyr.com/return-exchange/',
    version: '2026.1',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    policy_type: 'privacy_policy',
    title: 'Privacy Policy',
    content:
      'NazaakatbyR respects customer privacy. We collect personal contact details (such as name, phone number, and email) solely for fulfilling orders, providing customer service assistance, and responding to boutique enquiries. We do not sell or trade personal data to third parties.',
    source_url: 'https://nazaakatbyr.com/privacy-policy/',
    version: '2026.1',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    policy_type: 'terms_conditions',
    title: 'Terms & Conditions',
    content:
      'All boutique orders are subject to acceptance and availability. Prices are listed in INR inclusive of applicable taxes. In case of size discrepancies, our 7-day exchange policy applies according to published boutique guidelines.',
    source_url: 'https://nazaakatbyr.com/terms-and-conditions/',
    version: '2026.1',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
];

// Verified FAQs Grounded in NazaakatbyR Website
export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What does NazaakatbyR sell?',
    answer:
      'NazaakatbyR is a women’s ethnic boutique offering handcrafted ethnic suits, regal Anarkalis, and modern coordinated/co-ord sets designed for festive occasions, weddings, family functions, and celebrations.',
    source_url: 'https://nazaakatbyr.com/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-2',
    question: 'How can I place an order?',
    answer:
      'You can place an order directly on our official website (https://nazaakatbyr.com/) by browsing our collections, selecting your preferred size, and completing the secure checkout. You may also contact our team via WhatsApp at 8377090909 for personalized order assistance.',
    source_url: 'https://nazaakatbyr.com/faqs/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-3',
    question: 'How long does delivery take?',
    answer:
      'Orders are generally processed in 2–3 business days, and delivery usually takes 5–7 business days across India.',
    source_url: 'https://nazaakatbyr.com/shipping-delivery/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-4',
    question: 'What is your return and exchange policy?',
    answer:
      'Eligible return or exchange requests must be made within 7 days of delivery, subject to published conditions. Garments must be unworn with original tags intact.',
    source_url: 'https://nazaakatbyr.com/return-exchange/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-5',
    question: 'Can I exchange my size?',
    answer:
      'Yes, size exchange requests are accepted within 7 days of delivery, provided the item is in pristine condition with original tags attached and inventory allows.',
    source_url: 'https://nazaakatbyr.com/return-exchange/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-6',
    question: 'How can I contact NazaakatbyR?',
    answer:
      'You can reach us directly via WhatsApp or Phone at 8377090909, or email us at nazaakatbyr@gmail.com. Our business hours are 10 a.m. – 6 p.m. Monday through Saturday. You can also follow us on Instagram @nazaakatbyR.',
    source_url: 'https://nazaakatbyr.com/contact-us/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-7',
    question: 'What are your business hours?',
    answer:
      'Our team is available from 10 a.m. – 6 p.m. to answer your styling queries, size questions, and order follow-ups.',
    source_url: 'https://nazaakatbyr.com/contact-us/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-8',
    question: 'What makes NazaakatbyR special?',
    answer:
      'NazaakatbyR bridges Indian elegance with contemporary fashion. Each outfit highlights timeless craftsmanship, graceful silhouettes, flattering cuts, and handpicked fabrics tailored for modern women.',
    source_url: 'https://nazaakatbyr.com/about-us/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'faq-9',
    question: 'Do you offer Anarkalis and co-ord sets?',
    answer:
      'Yes! Anarkalis and coordinated ethnic co-ord sets are signature staples of NazaakatbyR, alongside our curated ethnic suits.',
    source_url: 'https://nazaakatbyr.com/',
    last_updated: new Date().toISOString(),
    status: 'active',
  },
];

// Connected Product Database (with clear DEMO DATA designation as required in Section 44)
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Gulabo Handcrafted Anarkali Set',
    slug: 'gulabo-handcrafted-anarkali-set',
    category: 'Anarkali',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Flared rose-pink silk-blend Anarkali with intricate gota patti embroidery, paired with a matching churidar and scalloped organza dupatta.',
    price: 6499,
    sale_price: 5999,
    currency: 'INR',
    colour: 'Rose Pink',
    sizes: ['S', 'M', 'L', 'XL'],
    occasion: ['Wedding', 'Festive Occasion'],
    style: 'Royal & Traditional',
    tags: ['Anarkali', 'Wedding', 'Gota Patti', 'Silk', 'Festive'],
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/gulabo-anarkali-set',
    inventory: 8,
    status: 'active',
    is_new_arrival: true,
    created_at: '2026-01-15T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-02',
    name: 'Zeenat Emerald Embroidered Suit',
    slug: 'zeenat-emerald-embroidered-suit',
    category: 'Ethnic Suit',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Rich emerald green straight-cut Chanderi suit adorned with delicate thread work and zari accents, paired with cigarette pants and silk dupatta.',
    price: 4899,
    currency: 'INR',
    colour: 'Emerald Green',
    sizes: ['M', 'L', 'XL'],
    occasion: ['Festive Occasion', 'Family Function'],
    style: 'Elegant & Feminine',
    tags: ['Ethnic Suit', 'Chanderi', 'Green', 'Festive', 'Embroidery'],
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/zeenat-emerald-suit',
    inventory: 5,
    status: 'active',
    is_new_arrival: false,
    created_at: '2026-01-20T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-03',
    name: 'Mehtab Royal Velvet Anarkali',
    slug: 'mehtab-royal-velvet-anarkali',
    category: 'Anarkali',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Deep wine micro-velvet Anarkali with gold tilla hand embroidery along neckline and cuffs, paired with heavy banarasi dupatta.',
    price: 8999,
    sale_price: 8499,
    currency: 'INR',
    colour: 'Deep Wine',
    sizes: ['S', 'M', 'L'],
    occasion: ['Wedding', 'Party'],
    style: 'Statement & Glamorous',
    tags: ['Anarkali', 'Velvet', 'Wine', 'Wedding', 'Tilla Work'],
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/mehtab-velvet-anarkali',
    inventory: 4,
    status: 'active',
    is_new_arrival: true,
    created_at: '2026-02-01T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-04',
    name: 'Noor Ivory Modal Silk Co-ord Set',
    slug: 'noor-ivory-modal-silk-co-ord-set',
    category: 'Co-ord Set',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Contemporary ivory modal silk co-ord set featuring an asymmetrical tunic with cowl detailing and tailored wide-leg trousers.',
    price: 3999,
    currency: 'INR',
    colour: 'Ivory Cream',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    occasion: ['Party', 'Casual', 'Formal Occasion'],
    style: 'Modern & Minimal',
    tags: ['Co-ord Set', 'Silk', 'Ivory', 'Contemporary', 'Minimal'],
    image_url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/noor-ivory-co-ord',
    inventory: 12,
    status: 'active',
    is_new_arrival: true,
    created_at: '2026-02-10T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-05',
    name: 'Roshni Handblock Chanderi Suit',
    slug: 'roshni-handblock-chanderi-suit',
    category: 'Ethnic Suit',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Mustard yellow artisanal handblock printed Chanderi kurta with hand-embroidered mirrorwork neckline, palazzos, and kota doria dupatta.',
    price: 5299,
    currency: 'INR',
    colour: 'Mustard Yellow',
    sizes: ['S', 'M', 'L'],
    occasion: ['Family Function', 'Festive Occasion'],
    style: 'Classic & Timeless',
    tags: ['Ethnic Suit', 'Chanderi', 'Yellow', 'Handblock', 'Palazzo'],
    image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/roshni-chanderi-suit',
    inventory: 6,
    status: 'active',
    is_new_arrival: false,
    created_at: '2026-01-25T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-06',
    name: 'Afreen Peplum Embroidered Co-ord Set',
    slug: 'afreen-peplum-embroidered-co-ord-set',
    category: 'Co-ord Set',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Royal navy blue peplum top with hand-beaded belt and flared sharara pants in fluid georgette fabric.',
    price: 4599,
    currency: 'INR',
    colour: 'Royal Navy',
    sizes: ['S', 'M', 'L', 'XL'],
    occasion: ['Party', 'Festive Occasion'],
    style: 'Contemporary Silhouette',
    tags: ['Co-ord Set', 'Peplum', 'Navy', 'Sharara', 'Georgette'],
    image_url: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/afreen-peplum-co-ord',
    inventory: 7,
    status: 'active',
    is_new_arrival: true,
    created_at: '2026-02-14T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-07',
    name: 'Mehrunissa Royal Gharara Suit',
    slug: 'mehrunissa-royal-gharara-suit',
    category: 'Ethnic Suit',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Ruby maroon raw silk kurta with resham and dabka zardozi craftsmanship, paired with an authentic double-flare gharara and tissue dupatta.',
    price: 9499,
    sale_price: 8999,
    currency: 'INR',
    colour: 'Ruby Maroon',
    sizes: ['M', 'L', 'XL'],
    occasion: ['Wedding', 'Festive Occasion'],
    style: 'Royal & Traditional',
    tags: ['Ethnic Suit', 'Gharara', 'Maroon', 'Wedding', 'Zardozi'],
    image_url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/mehrunissa-gharara-suit',
    inventory: 3,
    status: 'active',
    is_new_arrival: false,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
  {
    id: 'prod-08',
    name: 'Jannat Sage Linen Silk Co-ord Set',
    slug: 'jannat-sage-linen-silk-co-ord-set',
    category: 'Co-ord Set',
    description:
      '[DEMO DATA — REPLACE WITH REAL NAZAAKATBYR DATA] Pastel sage green straight tunic with floral thread embroidery on the collar and cuffs, paired with cropped ankle-length trousers.',
    price: 3499,
    currency: 'INR',
    colour: 'Pastel Sage',
    sizes: ['XS', 'S', 'M', 'L'],
    occasion: ['Casual', 'Family Function', 'Party'],
    style: 'Modern & Minimal',
    tags: ['Co-ord Set', 'Sage Green', 'Linen Silk', 'Daywear', 'Minimal'],
    image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    product_url: 'https://nazaakatbyr.com/products/jannat-sage-co-ord',
    inventory: 10,
    status: 'active',
    is_new_arrival: true,
    created_at: '2026-02-18T10:00:00Z',
    updated_at: new Date().toISOString(),
    is_demo: true,
  },
];

// In-Memory Database Store
class NazaakatDatabase {
  products: Product[] = [...INITIAL_PRODUCTS];
  faqs: FAQ[] = [...INITIAL_FAQS];
  policies: Policy[] = [...INITIAL_POLICIES];
  knowledgeDocs: KnowledgeDocument[] = [];
  knowledgeChunks: KnowledgeChunk[] = [];
  leads: Lead[] = [];
  sessions: Map<string, ChatSession> = new Map();
  messages: ChatMessage[] = [];
  analytics: AnalyticsEvent[] = [];

  constructor() {
    this.seedKnowledgeBase();
  }

  private seedKnowledgeBase() {
    const docs = [
      {
        document_id: 'doc-home',
        title: 'NazaakatbyR | Premium Women’s Ethnic Wear - Home',
        url: 'https://nazaakatbyr.com/',
        content:
          'NazaakatbyR is a women’s ethnic fashion boutique where Indian elegance meets modern fashion. Offering handcrafted ethnic suits, regal Anarkalis, and chic coordinated/co-ord sets. Contact: nazaakatbyr@gmail.com, WhatsApp/Phone: 8377090909. Instagram @nazaakatbyR.',
        source: 'https://nazaakatbyr.com/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 3,
      },
      {
        document_id: 'doc-about',
        title: 'About NazaakatbyR',
        url: 'https://nazaakatbyr.com/about-us/',
        content:
          'At NazaakatbyR, our ethos is built on timeless elegance, individuality, graceful ethnic wear, festive outfits, contemporary silhouettes, and statement pieces. Designed to celebrate the grace and confidence of modern women in ethnic fashion.',
        source: 'https://nazaakatbyr.com/about-us/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 2,
      },
      {
        document_id: 'doc-contact',
        title: 'Contact NazaakatbyR',
        url: 'https://nazaakatbyr.com/contact-us/',
        content:
          'Official contact details: Email: nazaakatbyr@gmail.com. Phone and WhatsApp: 8377090909. Business Hours: 10 a.m. – 6 p.m. Instagram: @nazaakatbyR. Website: https://nazaakatbyr.com/',
        source: 'https://nazaakatbyr.com/contact-us/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 2,
      },
      {
        document_id: 'doc-shipping',
        title: 'Shipping & Delivery - NazaakatbyR',
        url: 'https://nazaakatbyr.com/shipping-delivery/',
        content:
          'Orders are generally processed in 2–3 business days. Delivery usually takes 5–7 business days. Pan-India shipping available.',
        source: 'https://nazaakatbyr.com/shipping-delivery/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 2,
      },
      {
        document_id: 'doc-returns',
        title: 'Return & Exchange Policy - NazaakatbyR',
        url: 'https://nazaakatbyr.com/return-exchange/',
        content:
          'Eligible return or exchange requests must be made within 7 days of delivery, subject to published conditions. Items must be unworn, unwashed with tags intact.',
        source_url: 'https://nazaakatbyr.com/return-exchange/',
        source: 'https://nazaakatbyr.com/return-exchange/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 2,
      },
      {
        document_id: 'doc-faqs',
        title: 'Frequently Asked Questions - NazaakatbyR',
        url: 'https://nazaakatbyr.com/faqs/',
        content:
          'Order processing: 2-3 business days. Transit time: 5-7 business days. Return window: 7 days of delivery. What we sell: Ethnic suits, Anarkalis, and co-ord sets. Contact: nazaakatbyr@gmail.com and WhatsApp 8377090909.',
        source: 'https://nazaakatbyr.com/faqs/',
        retrieved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'indexed' as const,
        chunks_count: 3,
      },
    ];

    this.knowledgeDocs = docs;
    this.rebuildChunks();
  }

  rebuildChunks() {
    this.knowledgeChunks = [];
    for (const doc of this.knowledgeDocs) {
      const sentences = doc.content.split('. ').filter(Boolean);
      sentences.forEach((sentence, idx) => {
        this.knowledgeChunks.push({
          id: `${doc.document_id}-chunk-${idx}`,
          document_id: doc.document_id,
          url: doc.url,
          title: doc.title,
          chunk: sentence.trim() + (sentence.endsWith('.') ? '' : '.'),
          updated_at: doc.updated_at,
        });
      });
    }
  }

  // Knowledge search for grounded context
  searchKnowledge(query: string, maxResults = 5): KnowledgeChunk[] {
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/).filter((w) => w.length > 2);

    const scored = this.knowledgeChunks.map((chunk) => {
      let score = 0;
      const text = (chunk.title + ' ' + chunk.chunk).toLowerCase();
      if (text.includes(q)) score += 10;
      for (const kw of keywords) {
        if (text.includes(kw)) score += 2;
      }
      return { chunk, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((item) => item.chunk);
  }

  // Product filtering
  filterProducts(filters: {
    category?: string;
    occasion?: string;
    style?: string;
    max_price?: number;
    colour?: string;
    size?: string;
    search?: string;
    is_new_arrival?: boolean;
  }): Product[] {
    return this.products.filter((p) => {
      if (p.status !== 'active' || p.inventory <= 0) return false;

      if (filters.category && filters.category !== 'All' && filters.category !== 'Surprise Me') {
        if (p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      }

      if (filters.occasion && filters.occasion !== 'Other') {
        const matchesOccasion = p.occasion.some(
          (o) => o.toLowerCase() === filters.occasion?.toLowerCase()
        );
        if (!matchesOccasion) return false;
      }

      if (filters.style) {
        if (p.style.toLowerCase() !== filters.style.toLowerCase()) return false;
      }

      if (filters.max_price && filters.max_price > 0) {
        const effectivePrice = p.sale_price || p.price;
        if (effectivePrice > filters.max_price) return false;
      }

      if (filters.colour && filters.colour !== 'No Preference') {
        if (!p.colour.toLowerCase().includes(filters.colour.toLowerCase())) return false;
      }

      if (filters.size) {
        const targetSize = filters.size.toUpperCase();
        if (!p.sizes.includes(targetSize)) return false;
      }

      if (filters.is_new_arrival !== undefined) {
        if (p.is_new_arrival !== filters.is_new_arrival) return false;
      }

      if (filters.search) {
        const s = filters.search.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.colour.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s));
        if (!matches) return false;
      }

      return true;
    });
  }

  getSession(sessionId: string): ChatSession {
    if (!this.sessions.has(sessionId)) {
      const session: ChatSession = {
        session_id: sessionId,
        preferences: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.sessions.set(sessionId, session);
    }
    return this.sessions.get(sessionId)!;
  }

  updateSessionPreferences(sessionId: string, prefs: Partial<ChatSession['preferences']>) {
    const session = this.getSession(sessionId);
    session.preferences = { ...session.preferences, ...prefs };
    session.updated_at = new Date().toISOString();
  }

  addMessage(msg: Omit<ChatMessage, 'id' | 'created_at'>): ChatMessage {
    const message: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    this.messages.push(message);
    return message;
  }

  getMessages(sessionId: string): ChatMessage[] {
    return this.messages.filter((m) => m.session_id === sessionId);
  }

  addLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'email_dispatched_at' | 'status'>): Lead {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'new',
      email_dispatched_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  trackAnalytics(eventName: AnalyticsEvent['event_name'], sessionId?: string, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      event_name: eventName,
      session_id: sessionId,
      metadata,
      timestamp: new Date().toISOString(),
    };
    this.analytics.push(event);
    return event;
  }
}

export const db = new NazaakatDatabase();
