import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageCircle, Phone, Mail, ExternalLink, CheckCircle2, ShieldCheck, RefreshCw, X, ChevronRight } from 'lucide-react';
import { ChatMessage, Product } from '../types.ts';

interface ChatWidgetProps {
  onOpenOutfitFinder?: () => void;
  onOpenLeadModal?: (productName?: string) => void;
  prefilledPrompt?: string;
  isFloating?: boolean;
  onClose?: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  onOpenOutfitFinder,
  onOpenLeadModal,
  prefilledPrompt,
  isFloating = false,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    requirement: '',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'welcome-msg',
    session_id: sessionId,
    role: 'assistant',
    message: `**Welcome to NazaakatbyR ✨**\n\nI’m your personal style concierge. How may I assist you today?`,
    created_at: new Date().toISOString(),
  };

  useEffect(() => {
    setMessages([initialGreeting]);
  }, []);

  useEffect(() => {
    if (prefilledPrompt) {
      sendMessage(prefilledPrompt);
    }
  }, [prefilledPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, leadFormOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      session_id: sessionId,
      role: 'user',
      message: trimmed,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        session_id: sessionId,
        role: 'assistant',
        message: data.reply || 'I’m having trouble accessing that detail right now. Please connect with our team.',
        matched_products: data.matched_products,
        verified_facts: data.verified_facts,
        action_required: data.action_required,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (data.action_required === 'lead_capture') {
        setLeadFormOpen(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          session_id: sessionId,
          role: 'assistant',
          message:
            'I’m having a little trouble accessing that information right now. Please try again or contact our NazaakatbyR team at 8377090909 or nazaakatbyr@gmail.com for assistance.',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone) return;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email,
          product: leadData.product,
          requirement: leadData.requirement || 'Customer assistance request from chat',
          sessionId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadSuccess(data.confirmationMessage);
        setLeadFormOpen(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `lead-conf-${Date.now()}`,
            session_id: sessionId,
            role: 'assistant',
            message: data.confirmationMessage,
            created_at: new Date().toISOString(),
          },
        ]);
        setLeadData({ name: '', phone: '', email: '', product: '', requirement: '' });
      }
    } catch (err) {
      console.error('Lead submission failed', err);
    }
  };

  return (
    <div
      className={`flex flex-col bg-[#FCFBF8] border border-[#E8E1D5] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
        isFloating ? 'w-full h-full max-h-[640px]' : 'w-full h-[660px]'
      }`}
    >
      {/* Concierge Header */}
      <div className="bg-gradient-to-r from-[#113824] via-[#16432c] to-[#0d2a1b] text-[#F9F5EC] px-5 py-4 flex items-center justify-between border-b border-[#C5A059]/30">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#1C5135] border border-[#C5A059]/60 flex items-center justify-center text-[#C5A059] shadow-inner font-serif-luxury font-bold text-lg">
              N
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#C5A059] border-2 border-[#113824] rounded-full shadow-sm"></span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-serif-luxury text-base font-semibold text-[#FDFBF7] tracking-wide">
                Nazaakat Concierge
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#EBD3A0] border border-[#C5A059]/40 font-medium">
                Official
              </span>
            </div>
            <p className="text-xs text-[#E3D9C6]/80 font-light">
              Your Personal Style Assistant • Grounded in nazaakatbyr.com
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://wa.me/918377090909?text=Hello%20NazaakatbyR%2C%20I%20found%20you%20through%20your%20website%20and%20would%20like%20assistance%20with%20an%20outfit."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp (8377090909)"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#C5A059] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href="tel:8377090909"
            title="Call 8377090909"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#C5A059] transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#F9F5EC]/70 hover:text-white transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Verified Status Bar */}
      <div className="bg-[#FAF6EE] px-4 py-1.5 text-[11px] text-[#4A3E2D] flex items-center justify-between border-b border-[#EADFCF]">
        <span className="flex items-center gap-1 font-medium text-[#18462D]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#18462D]" />
          Verified NazaakatbyR Boutique Knowledge
        </span>
        <span className="text-[#7A6B56]">Hours: 10 a.m. – 6 p.m.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-[#FCFBF8]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#113824] text-[#FBF8F2] rounded-br-xs'
                  : 'bg-white text-[#222B25] border border-[#E8E1D5] rounded-bl-xs'
              }`}
            >
              {/* Message Content with basic Markdown formatting */}
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.message.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {paragraph.split('**').map((chunk, index) =>
                      index % 2 === 1 ? (
                        <strong key={index} className="font-semibold text-[#113824]">
                          {chunk}
                        </strong>
                      ) : (
                        chunk
                      )
                    )}
                  </p>
                ))}
              </div>

              {/* Verified Facts badge if available */}
              {msg.verified_facts && msg.verified_facts.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] text-[11px] text-[#55695C]">
                  <span className="font-medium text-[#113824] flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> Verified Website Fact
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-[#425046]">
                    {msg.verified_facts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Matched Verified Products Display */}
              {msg.matched_products && msg.matched_products.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#EFE9DD] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-serif-luxury font-semibold text-[#113824]">
                    <span>Verified Boutique Outfits</span>
                    <span className="text-[10px] font-sans font-normal text-[#8A7961]">
                      {msg.matched_products.length} available
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.matched_products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl p-2.5 flex gap-3 items-center hover:border-[#C5A059] transition-all"
                      >
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-18 object-cover rounded-lg border border-[#E5DAC5] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#113824]/10 text-[#113824]">
                              {product.category}
                            </span>
                            {product.is_demo && (
                              <span className="text-[9px] text-[#9E782F] font-mono font-medium">
                                DEMO DATA
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-xs text-[#1C2621] truncate mt-0.5">
                            {product.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-serif-luxury font-semibold text-xs text-[#113824]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.sale_price && (
                              <span className="text-[11px] text-[#8C8275] line-through">
                                ₹{product.sale_price.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-[10px] text-[#2E6B47] font-medium">
                              In Stock ({product.inventory})
                            </span>
                          </div>
                          <div className="text-[10px] text-[#695F52] mt-0.5">
                            Sizes: <span className="font-medium">{product.sizes.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <a
                              href={product.product_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] inline-flex items-center gap-1 text-[#113824] hover:text-[#C5A059] font-medium underline"
                            >
                              View on Website <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            <button
                              onClick={() => {
                                setLeadData((prev) => ({
                                  ...prev,
                                  product: product.name,
                                  requirement: `I'm interested in sizing and ordering the ${product.name} (₹${product.price})`,
                                }));
                                setLeadFormOpen(true);
                              }}
                              className="text-[11px] text-[#C5A059] hover:underline font-medium ml-auto"
                            >
                              Enquire Sizing
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons on Initial Welcome Message */}
            {msg.id === 'welcome-msg' && (
              <div className="mt-3 flex flex-wrap gap-1.5 max-w-[95%]">
                <button
                  onClick={() => sendMessage('What do you sell?')}
                  className="text-xs bg-[#FAF5EB] hover:bg-[#113824] hover:text-white text-[#113824] border border-[#DFD5C3] px-2.5 py-1 rounded-full transition-all duration-150"
                >
                  Explore Collections
                </button>
                {onOpenOutfitFinder && (
                  <button
                    onClick={onOpenOutfitFinder}
                    className="text-xs bg-[#113824] text-[#F9F5EC] border border-[#C5A059]/40 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-[#1C5135] transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-[#C5A059]" /> Find My Perfect Outfit
                  </button>
                )}
                <button
                  onClick={() => sendMessage('Do you have Anarkalis?')}
                  className="text-xs bg-[#FAF5EB] hover:bg-[#113824] hover:text-white text-[#113824] border border-[#DFD5C3] px-2.5 py-1 rounded-full transition-all duration-150"
                >
                  Anarkalis
                </button>
                <button
                  onClick={() => sendMessage('How long does delivery take?')}
                  className="text-xs bg-[#FAF5EB] hover:bg-[#113824] hover:text-white text-[#113824] border border-[#DFD5C3] px-2.5 py-1 rounded-full transition-all duration-150"
                >
                  Shipping & Delivery
                </button>
                <button
                  onClick={() => sendMessage('What is your return policy?')}
                  className="text-xs bg-[#FAF5EB] hover:bg-[#113824] hover:text-white text-[#113824] border border-[#DFD5C3] px-2.5 py-1 rounded-full transition-all duration-150"
                >
                  Return Policy
                </button>
                <button
                  onClick={() => sendMessage('How can I contact you?')}
                  className="text-xs bg-[#FAF5EB] hover:bg-[#113824] hover:text-white text-[#113824] border border-[#DFD5C3] px-2.5 py-1 rounded-full transition-all duration-150"
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-[#7B6E5B] bg-white border border-[#EFE8DC] px-3.5 py-2.5 rounded-2xl w-fit shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
            <span>Consulting NazaakatbyR knowledge & catalogue...</span>
          </div>
        )}

        {/* Lead Capture Modal / Inline Form */}
        {leadFormOpen && (
          <div className="bg-[#FAF7F2] border border-[#C5A059]/60 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-serif-luxury font-semibold text-[#113824]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>NazaakatbyR Personal Assistance Request</span>
              </div>
              <button
                onClick={() => setLeadFormOpen(false)}
                className="text-[#8C8275] hover:text-black text-xs"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-[#5C5346]">
              Our boutique team will assist you directly via Phone/WhatsApp and email enquiry to{' '}
              <span className="font-mono font-medium text-[#113824]">nazaakatbyr@gmail.com</span>.
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#DACEC0] bg-white focus:outline-none focus:border-[#113824]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp *"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#DACEC0] bg-white focus:outline-none focus:border-[#113824]"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#DACEC0] bg-white focus:outline-none focus:border-[#113824]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Product (optional)"
                  value={leadData.product}
                  onChange={(e) => setLeadData({ ...leadData, product: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#DACEC0] bg-white focus:outline-none focus:border-[#113824]"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  placeholder="Your style or sizing question..."
                  value={leadData.requirement}
                  onChange={(e) => setLeadData({ ...leadData, requirement: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#DACEC0] bg-white focus:outline-none focus:border-[#113824] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#113824] hover:bg-[#1A4C32] text-[#FDFBF7] text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                Send Enquiry to NazaakatbyR Team
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-[#EAE2D5]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about suits, Anarkalis, shipping, sizing..."
            disabled={isLoading}
            className="flex-1 text-xs px-4 py-2.5 rounded-full border border-[#DCD3C3] bg-[#FCFBF9] text-[#1E2722] placeholder:text-[#9A8D7C] focus:outline-none focus:border-[#113824] transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-full bg-[#113824] text-[#C5A059] flex items-center justify-center hover:bg-[#184D32] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#7A6E5D] px-1">
          <span>Grounded in https://nazaakatbyr.com/</span>
          <a
            href="https://wa.me/918377090909"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#113824] font-medium hover:underline flex items-center gap-1"
          >
            <Phone className="w-2.5 h-2.5" /> WhatsApp: 8377090909
          </a>
        </div>
      </div>
    </div>
  );
};
