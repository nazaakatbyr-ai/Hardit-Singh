import React, { useState } from 'react';
import {
  Server,
  Copy,
  Check,
  FileCode,
  Layers,
  Settings,
  ShieldCheck,
  Terminal,
  ExternalLink,
  ChevronRight,
  FolderTree,
  Mail,
  Zap,
} from 'lucide-react';

export const HostingerDeployPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'hpanel' | 'vps' | 'htaccess' | 'php' | 'checklist'>('hpanel');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const htaccessCode = `# Hostinger LiteSpeed / Apache Configuration for Nazaakat Concierge
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing static files directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Single Page Application fallback to index.html
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_headers.c>
  # CORS Header for widget embedding
  <Files "widget.js">
    Header set Access-Control-Allow-Origin "*"
    Header set Content-Type "application/javascript; charset=utf-8"
  </Files>

  Header always set X-Content-Type-Options "nosniff"
</IfModule>`;

  const serverJsCode = `// Hostinger Node.js Application Startup File
// Place this at the root of your Hostinger application folder
import './dist/server.cjs';`;

  const envSampleCode = `NODE_ENV=production
PORT=3000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
LEAD_EMAIL=nazaakatbyr@gmail.com
WHATSAPP_NUMBER=8377090909
BUSINESS_PHONE=8377090909
WEBSITE_URL=https://nazaakatbyr.com/`;

  const pm2ConfigCode = `// ecosystem.config.cjs for Hostinger VPS / Cloud
module.exports = {
  apps: [
    {
      name: 'nazaakat-concierge',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#113824] to-[#1c5537] rounded-2xl p-6 text-[#F9F5EC] shadow-sm border border-[#C5A059]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Hostinger Ready
            </span>
          </div>
          <h2 className="text-xl font-serif-luxury font-bold tracking-wide">
            Hostinger Deployment Configuration
          </h2>
          <p className="text-xs text-[#E1D8CA] max-w-2xl">
            All files, entry points, rewrite rules, and dynamic port configurations have been optimized for Hostinger hPanel Node.js, LiteSpeed/Apache, PM2 VPS, and WordPress environments.
          </p>
        </div>

        <a
          href="https://hpanel.hostinger.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08e4c] text-[#113824] text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          Open Hostinger hPanel <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Sub navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8DFC8] pb-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('hpanel')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'hpanel'
              ? 'bg-[#113824] text-white font-semibold shadow-xs'
              : 'text-[#4F4638] hover:bg-[#FAF6EE]'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-[#C5A059]" />
          Method 1: Hostinger hPanel (Node.js)
        </button>

        <button
          onClick={() => setActiveSubTab('vps')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'vps'
              ? 'bg-[#113824] text-white font-semibold shadow-xs'
              : 'text-[#4F4638] hover:bg-[#FAF6EE]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-[#C5A059]" />
          Method 2: Hostinger VPS (PM2 & Nginx)
        </button>

        <button
          onClick={() => setActiveSubTab('htaccess')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'htaccess'
              ? 'bg-[#113824] text-white font-semibold shadow-xs'
              : 'text-[#4F4638] hover:bg-[#FAF6EE]'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-[#C5A059]" />
          .htaccess (LiteSpeed / Apache)
        </button>

        <button
          onClick={() => setActiveSubTab('php')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'php'
              ? 'bg-[#113824] text-white font-semibold shadow-xs'
              : 'text-[#4F4638] hover:bg-[#FAF6EE]'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
          PHP Lead Mailer (WordPress Plan)
        </button>

        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'checklist'
              ? 'bg-[#113824] text-white font-semibold shadow-xs'
              : 'text-[#4F4638] hover:bg-[#FAF6EE]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
          Deployment Checklist
        </button>
      </div>

      {/* Content Area */}
      {activeSubTab === 'hpanel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form / Steps */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-[#E8DFC8] rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="font-serif-luxury font-bold text-sm text-[#113824] flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#C5A059]" />
                Hostinger hPanel Node.js Setup Parameters
              </h3>
              <p className="text-xs text-[#524738]">
                In Hostinger hPanel, go to <strong>Websites → Advanced → Node.js</strong> and create or edit your application with these exact values:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8DC] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#7E7262] uppercase tracking-wide font-medium">
                      Node.js Version
                    </div>
                    <div className="font-mono font-bold text-[#113824]">20.x or 18.x</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    Recommended
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8DC] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#7E7262] uppercase tracking-wide font-medium">
                      Application Mode
                    </div>
                    <div className="font-mono font-bold text-[#113824]">Production</div>
                  </div>
                  <span className="text-[10px] text-[#7E7262]">NODE_ENV=production</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8DC] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#7E7262] uppercase tracking-wide font-medium">
                      Application Root
                    </div>
                    <div className="font-mono font-bold text-[#113824]">public_html</div>
                  </div>
                  <span className="text-[10px] text-[#7E7262]">or concierge subfolder</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE8DC] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#7E7262] uppercase tracking-wide font-medium">
                      Application Startup File
                    </div>
                    <div className="font-mono font-bold text-[#113824]">server.js</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('server.js', 'startup')}
                    className="text-[11px] text-[#113824] hover:text-[#C5A059] font-medium flex items-center gap-1"
                  >
                    {copiedSection === 'startup' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-[#113824] mb-2 flex items-center justify-between">
                  <span>Environment Variables for hPanel:</span>
                  <button
                    onClick={() => copyToClipboard(envSampleCode, 'env')}
                    className="text-[11px] text-[#113824] hover:text-[#C5A059] font-medium flex items-center gap-1"
                  >
                    {copiedSection === 'env' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Copy All Variables
                  </button>
                </div>
                <pre className="p-3 bg-[#113824] text-[#EFE8DC] rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
                  {envSampleCode}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column: File Structure & Instructions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#E8DFC8] rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="font-serif-luxury font-bold text-sm text-[#113824] flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#C5A059]" />
                Files to Upload to Hostinger public_html
              </h3>
              <div className="text-xs text-[#524738] space-y-2">
                <p>After running <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 rounded text-[#113824]">npm run build</code>, upload these files to Hostinger:</p>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE8DC] font-mono text-[11px] leading-relaxed text-[#2C3E2D]">
                  <div>📁 <strong>dist/</strong> <span className="text-[#887C6C]">(frontend build + server.cjs)</span></div>
                  <div>📁 <strong>public/</strong> <span className="text-[#887C6C]">(widget.js, assets, lead.php)</span></div>
                  <div>📄 <strong>server.js</strong> <span className="text-emerald-700 font-semibold">(Hostinger startup entry)</span></div>
                  <div>📄 <strong>package.json</strong> <span className="text-[#887C6C]">(dependencies & scripts)</span></div>
                  <div>📄 <strong>.htaccess</strong> <span className="text-[#887C6C]">(SPA routing & CORS)</span></div>
                  <div>📄 <strong>.env</strong> <span className="text-[#887C6C]">(your API keys & configuration)</span></div>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2 mt-2">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hostinger Dynamic Port:</strong> Our code now automatically reads <code>process.env.PORT</code> assigned by Hostinger, so you won't encounter port collision errors!
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-2xl p-4 space-y-2 text-xs">
              <div className="font-bold text-[#113824] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                Hostinger Production Build Command
              </div>
              <p className="text-[#655A4B] text-[11px]">
                You can build locally before uploading, or run this in Hostinger SSH Terminal:
              </p>
              <div className="bg-[#113824] text-[#EFE8DC] p-2.5 rounded-lg font-mono text-[11px] flex items-center justify-between">
                <span>npm run build && npm start</span>
                <button
                  onClick={() => copyToClipboard('npm run build && npm start', 'buildCmd')}
                  className="text-[#C5A059] hover:text-white"
                >
                  {copiedSection === 'buildCmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'vps' && (
        <div className="bg-white border border-[#E8DFC8] rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-sm text-[#113824]">
                Hostinger VPS (Ubuntu 22.04 / 24.04 + PM2 + Nginx)
              </h3>
              <p className="text-xs text-[#6A5E4E] mt-0.5">
                Run the concierge 24/7 as an auto-restarting background service.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(pm2ConfigCode, 'pm2')}
              className="px-3 py-1.5 bg-[#113824] text-[#F9F5EC] text-xs font-medium rounded-lg flex items-center gap-1.5"
            >
              {copiedSection === 'pm2' ? <Check className="w-3 h-3 text-[#C5A059]" /> : <Copy className="w-3 h-3" />}
              Copy ecosystem.config.cjs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#113824]">1. Install Dependencies & Build</div>
              <pre className="p-3 bg-[#113824] text-[#EFE8DC] rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
{`cd /var/www/nazaakat-concierge
npm install
npm run build`}
              </pre>

              <div className="text-xs font-semibold text-[#113824]">2. Launch with PM2 Process Manager</div>
              <pre className="p-3 bg-[#113824] text-[#EFE8DC] rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
{`pm2 start ecosystem.config.cjs
pm2 save
pm2 startup`}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#113824]">3. Nginx Reverse Proxy Config</div>
              <pre className="p-3 bg-[#113824] text-[#EFE8DC] rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed">
{`server {
  server_name concierge.nazaakatbyr.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
  }
}`}
              </pre>
              <p className="text-[11px] text-[#6A5E4E]">
                Issue free SSL certificate with Certbot: <code className="font-mono text-[#113824]">sudo certbot --nginx</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'htaccess' && (
        <div className="bg-white border border-[#E8DFC8] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-sm text-[#113824]">
                Hostinger LiteSpeed / Apache .htaccess Configuration
              </h3>
              <p className="text-xs text-[#6A5E4E] mt-0.5">
                Automatically placed in root and <code className="font-mono text-[#113824]">public/.htaccess</code> for React SPA routing, CORS headers for <code className="font-mono text-[#113824]">widget.js</code>, and Gzip compression.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(htaccessCode, 'htaccessCode')}
              className="px-3 py-1.5 bg-[#113824] text-[#F9F5EC] text-xs font-medium rounded-lg flex items-center gap-1.5"
            >
              {copiedSection === 'htaccessCode' ? <Check className="w-3 h-3 text-[#C5A059]" /> : <Copy className="w-3 h-3" />}
              Copy .htaccess
            </button>
          </div>

          <pre className="p-4 bg-[#113824] text-[#EFE8DC] rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
            {htaccessCode}
          </pre>
        </div>
      )}

      {activeSubTab === 'php' && (
        <div className="bg-white border border-[#E8DFC8] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-sm text-[#113824]">
                PHP Lead Mailer for Hostinger WordPress / Shared Hosting
              </h3>
              <p className="text-xs text-[#6A5E4E] mt-0.5">
                Located at <code className="font-mono text-[#113824]">public/api/lead.php</code>. If you host the widget on Hostinger WordPress without Node.js, this script sends customer leads directly to <code className="font-mono text-[#113824]">nazaakatbyr@gmail.com</code> via Hostinger's PHP mail engine!
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs space-y-2">
            <div className="font-semibold text-[#113824]">How to use on Hostinger WordPress:</div>
            <ol className="list-decimal pl-5 space-y-1 text-[#554A3B]">
              <li>Upload <code className="font-mono text-[#113824]">widget.js</code> to your WordPress <code className="font-mono">public_html/</code> folder.</li>
              <li>Upload <code className="font-mono text-[#113824]">lead.php</code> to <code className="font-mono">public_html/api/lead.php</code>.</li>
              <li>Insert the widget script tag into your theme footer or with the WPCode plugin.</li>
              <li>Every lead submitted through the chatbot widget is instantly sent to <strong>nazaakatbyr@gmail.com</strong>.</li>
            </ol>
          </div>
        </div>
      )}

      {activeSubTab === 'checklist' && (
        <div className="bg-white border border-[#E8DFC8] rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-serif-luxury font-bold text-sm text-[#113824]">
            Pre-Flight Hostinger Deployment Checklist
          </h3>
          <div className="space-y-2.5 text-xs text-[#4E4334]">
            {[
              { title: 'server.js created', desc: 'Hostinger startup entry point pointing to dist/server.cjs.' },
              { title: 'Dynamic process.env.PORT', desc: 'server.ts automatically reads Hostinger dynamically assigned port.' },
              { title: '.htaccess generated', desc: 'Configured with SPA rewrites, CORS for widget.js, and Gzip compression.' },
              { title: 'ecosystem.config.cjs created', desc: 'PM2 configuration ready for Hostinger VPS & Cloud servers.' },
              { title: 'PHP Lead Mailer created', desc: 'Zero-dependency fallback in public/api/lead.php for WordPress plans.' },
              { title: 'widget.js enhanced', desc: 'Supports data-api-url for cross-domain and Hostinger subdomain setups.' },
              { title: 'Documentation generated', desc: 'Detailed HOSTINGER_DEPLOYMENT_GUIDE.md included in project root.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-[#113824]">{item.title}:</span>{' '}
                  <span className="text-[#6A5E4E]">{item.desc}</span>
                </div>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" /> Ready
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
