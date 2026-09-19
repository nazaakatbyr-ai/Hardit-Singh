import React, { useState } from 'react';
import { Code2, Copy, Check, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';

export const EmbedCodeModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://nazaakatbyr-concierge.run.app';

  const embedSnippet = `<!-- NazaakatbyR Concierge AI Widget -->
<script
  src="${currentOrigin}/widget.js"
  data-bot-id="nazaakatbyr"
  async>
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border border-[#E8E1D5] rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#113824]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#113824]">
              Embeddable Widget Code (Section 35)
            </h2>
          </div>
          <p className="text-xs text-[#6A5E4E] mt-1">
            Copy and paste this single tag into the <code className="font-mono text-[#113824]">&lt;head&gt;</code> or{' '}
            <code className="font-mono text-[#113824]">&lt;body&gt;</code> of your website at{' '}
            <a
              href="https://nazaakatbyr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              nazaakatbyr.com
            </a>
            .
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-[#113824] hover:bg-[#184E33] text-[#F9F5EC] text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#C5A059]" /> Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#C5A059]" /> Copy Embed Code
            </>
          )}
        </button>
      </div>

      {/* Code Box */}
      <div className="relative">
        <pre className="bg-[#112419] text-[#E8DFC8] p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-[#C5A059]/30">
          {embedSnippet}
        </pre>
      </div>

      {/* Guarantees & Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
        <div className="p-3 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs space-y-1">
          <div className="font-serif-luxury font-semibold text-[#113824] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Shadow DOM Isolation
          </div>
          <p className="text-[#695F52] text-[11px] leading-relaxed">
            Renders inside an isolated Shadow Root so existing CSS, fonts, and stylesheets on nazaakatbyr.com remain 100% untouched.
          </p>
        </div>

        <div className="p-3 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs space-y-1">
          <div className="font-serif-luxury font-semibold text-[#113824] flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-[#C5A059]" /> Asynchronous & Non-Blocking
          </div>
          <p className="text-[#695F52] text-[11px] leading-relaxed">
            Loads independently via lightweight JS; page load times and Core Web Vitals on your storefront are never impacted.
          </p>
        </div>

        <div className="p-3 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs space-y-1">
          <div className="font-serif-luxury font-semibold text-[#113824] flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4 text-[#C5A059]" /> Mobile Responsive
          </div>
          <p className="text-[#695F52] text-[11px] leading-relaxed">
            Seamlessly scales from ultra-compact smartphones to large screens with touch-friendly 44px+ tap targets.
          </p>
        </div>
      </div>
    </div>
  );
};
