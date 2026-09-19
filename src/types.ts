export type ProductCategory = 'Ethnic Suit' | 'Anarkali' | 'Co-ord Set' | 'Surprise Me' | 'All';

export type OutfitOccasion =
  | 'Wedding'
  | 'Festive Occasion'
  | 'Party'
  | 'Family Function'
  | 'Formal Occasion'
  | 'Casual'
  | 'Other';

export type OutfitStyle =
  | 'Royal & Traditional'
  | 'Modern & Minimal'
  | 'Elegant & Feminine'
  | 'Statement & Glamorous'
  | 'Classic & Timeless'
  | 'Contemporary Silhouette';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Ethnic Suit' | 'Anarkali' | 'Co-ord Set';
  description: string;
  price: number;
  sale_price?: number;
  currency: 'INR';
  colour: string;
  sizes: string[];
  occasion: OutfitOccasion[];
  style: OutfitStyle;
  tags: string[];
  image_url: string;
  product_url: string;
  inventory: number;
  status: 'active' | 'out_of_stock' | 'draft';
  is_new_arrival: boolean;
  created_at: string;
  updated_at: string;
  is_demo?: boolean;
  fabric?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  source_url: string;
  last_updated: string;
  status: 'active' | 'archived';
  category?: string;
}

export interface Policy {
  id?: string;
  policy_type: 'shipping_delivery' | 'return_exchange' | 'privacy_policy' | 'terms_conditions';
  title: string;
  content: string;
  source_url: string;
  version: string;
  last_updated: string;
  updated_at?: string;
  status: 'active' | 'archived';
  key_points?: string[];
}

export interface KnowledgeDocument {
  document_id: string;
  title: string;
  url: string;
  content: string;
  source: string;
  retrieved_at: string;
  updated_at: string;
  status: 'indexed' | 'failed' | 'syncing';
  chunks_count: number;
}

export interface KnowledgeChunk {
  id: string;
  document_id: string;
  url: string;
  title: string;
  chunk: string;
  updated_at: string;
}

export interface ChatSession {
  session_id: string;
  preferences: {
    occasion?: string;
    category?: string;
    style?: string;
    colour?: string;
    budget?: string;
    size?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  message: string;
  intent?: string;
  verified_facts?: string[];
  style_suggestions?: string[];
  matched_products?: Product[];
  action_required?: 'lead_capture' | 'outfit_finder' | 'whatsapp' | 'call' | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  requirement: string;
  session_id: string;
  source: string;
  status: 'new' | 'contacted' | 'resolved';
  email_dispatched_at: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_name:
    | 'chat_opened'
    | 'message_sent'
    | 'outfit_finder_started'
    | 'outfit_finder_completed'
    | 'product_search'
    | 'product_viewed'
    | 'product_clicked'
    | 'new_arrivals_clicked'
    | 'styling_request'
    | 'whatsapp_clicked'
    | 'call_clicked'
    | 'lead_started'
    | 'lead_completed';
  session_id?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface BusinessContactInfo {
  brandName: string;
  tagline: string;
  boutiqueOverview: string;
  leadEmail: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  businessHours: string;
  websiteUrl: string;
  orderProcessing: string;
  orderDelivery: string;
  returnExchangeWindow: string;
}
