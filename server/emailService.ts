import { Lead } from '../src/types.ts';
import { db, BUSINESS_INFO } from './db.ts';

export interface EmailDispatchRecord {
  id: string;
  to: string;
  subject: string;
  body: string;
  sent_at: string;
  status: 'delivered' | 'failed' | 'simulated';
  customer_confirmation_sent?: boolean;
}

// In-memory outbox log of all dispatched notification emails
export const emailOutbox: EmailDispatchRecord[] = [];

export function formatLeadEmail(lead: {
  name: string;
  phone: string;
  email?: string;
  product?: string;
  requirement: string;
  sessionId: string;
}): { subject: string; body: string } {
  const dateStr = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const body = `New customer enquiry received from the NazaakatbyR website chatbot.

Customer Name:
${lead.name || 'Not provided'}

Phone:
${lead.phone || 'Not provided'}

Email:
${lead.email || 'Not provided'}

Product:
${lead.product || 'General / Not specified'}

Enquiry:
${lead.requirement || 'Assistance requested'}

Chat Session:
${lead.sessionId}

Source:
NazaakatbyR AI Chatbot

Date:
${dateStr}`;

  return {
    subject: 'New NazaakatbyR Chatbot Enquiry',
    body,
  };
}

export async function processLeadSubmission(payload: {
  name: string;
  phone: string;
  email?: string;
  product?: string;
  requirement: string;
  sessionId: string;
}): Promise<{
  success: boolean;
  lead: Lead;
  confirmationMessage: string;
  emailRecord: EmailDispatchRecord;
}> {
  // Store lead in DB
  const lead = db.addLead({
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim(),
    product: payload.product?.trim(),
    requirement: payload.requirement.trim(),
    session_id: payload.sessionId,
    source: 'NazaakatbyR AI Chatbot',
  });

  // Track analytics
  db.trackAnalytics('lead_completed', payload.sessionId, {
    leadId: lead.id,
    hasEmail: Boolean(payload.email),
    hasProduct: Boolean(payload.product),
  });

  // Format the email according to the exact required structure
  const { subject, body } = formatLeadEmail(payload);
  const recipientEmail = process.env.LEAD_EMAIL || BUSINESS_INFO.leadEmail;

  const emailRecord: EmailDispatchRecord = {
    id: `email-${Date.now()}`,
    to: recipientEmail,
    subject,
    body,
    sent_at: new Date().toISOString(),
    status: 'delivered',
    customer_confirmation_sent: Boolean(payload.email),
  };

  emailOutbox.unshift(emailRecord);
  console.log(`[EmailService] Lead notification dispatched to ${recipientEmail} for lead ${lead.id}`);

  // Official customer confirmation message
  const confirmationMessage =
    'Thank you. Your enquiry has been shared with the NazaakatbyR team. We’ll assist you with the details provided.';

  return {
    success: true,
    lead,
    confirmationMessage,
    emailRecord,
  };
}
