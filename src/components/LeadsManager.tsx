import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, User, ShoppingBag, CheckCircle, RefreshCw, Send, ShieldAlert } from 'lucide-react';
import { Lead } from '../types.ts';

export const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [emailOutbox, setEmailOutbox] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'outbox'>('leads');

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.leads || []);
      setEmailOutbox(data.emailOutbox || []);
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-white border border-[#E8E1D5] rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#113824]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#113824]">
              Lead Capture & Email Dispatch (Section 8 & 10)
            </h2>
          </div>
          <p className="text-xs text-[#6A5E4E] mt-1">
            Every customer enquiry captured via chatbot is logged and dispatched to{' '}
            <span className="font-mono text-[#113824] font-semibold">nazaakatbyr@gmail.com</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-lg border border-[#DACEC0] text-xs font-medium text-[#4A3F31] hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#C5A059] ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Leads
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EFE8DC] text-xs font-medium">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'leads'
              ? 'border-[#113824] text-[#113824] font-semibold'
              : 'border-transparent text-[#706454] hover:text-black'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Customer Enquiries ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('outbox')}
          className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'outbox'
              ? 'border-[#113824] text-[#113824] font-semibold'
              : 'border-transparent text-[#706454] hover:text-black'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Email Outbox to nazaakatbyr@gmail.com ({emailOutbox.length})
        </button>
      </div>

      {activeTab === 'leads' && (
        <div className="space-y-3">
          {leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] text-[#5A4F40] border-y border-[#E8DFC8]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Customer</th>
                    <th className="py-2.5 px-3 font-semibold">Contact Details</th>
                    <th className="py-2.5 px-3 font-semibold">Product Interest</th>
                    <th className="py-2.5 px-3 font-semibold">Enquiry Requirement</th>
                    <th className="py-2.5 px-3 font-semibold">Date</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE1]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF8F5]/60">
                      <td className="py-3 px-3 font-medium text-[#1C2621]">
                        {lead.name}
                      </td>
                      <td className="py-3 px-3 text-[#3E3529]">
                        <div className="font-mono text-[11px]">{lead.phone}</div>
                        {lead.email && <div className="text-[10px] text-[#7A6E5D]">{lead.email}</div>}
                      </td>
                      <td className="py-3 px-3 text-[#113824] font-medium">
                        {lead.product || 'General Assistance'}
                      </td>
                      <td className="py-3 px-3 text-[#4A3F31] max-w-xs truncate">
                        {lead.requirement}
                      </td>
                      <td className="py-3 px-3 text-[#8C806F] text-[11px]">
                        {new Date(lead.created_at).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-2.5 h-2.5" /> Dispatched
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#8C806F]">
              No customer enquiries recorded yet. Trigger an enquiry from the concierge chat.
            </div>
          )}
        </div>
      )}

      {activeTab === 'outbox' && (
        <div className="space-y-4">
          <p className="text-xs text-[#6A5E4E]">
            Format compliant with <strong>Section 10 (ENQUIRY EMAIL FORMAT)</strong>:
          </p>
          {emailOutbox.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emailOutbox.map((mail) => (
                <div
                  key={mail.id}
                  className="bg-[#FCFBF9] border border-[#E8DFC8] rounded-xl p-4 text-xs space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2">
                    <span className="font-semibold text-[#113824]">To: {mail.to}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                      Delivered
                    </span>
                  </div>
                  <div className="font-medium text-[#2B352E]">Subject: {mail.subject}</div>
                  <pre className="bg-white p-3 rounded-lg border border-[#E5DAC6] text-[11px] font-mono text-[#38433C] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {mail.body}
                  </pre>
                  <div className="text-[10px] text-[#8C806F] pt-1">
                    Dispatched: {new Date(mail.sent_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#8C806F]">
              No outgoing notifications recorded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
