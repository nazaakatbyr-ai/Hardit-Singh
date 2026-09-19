# Hostinger Deployment Guide for NazaakatbyR Concierge

This guide explains step-by-step how to host the **NazaakatbyR AI Concierge & Chatbot** on **Hostinger**.

All necessary configuration files have been created and optimized specifically for Hostinger:
- `server.js` (Hostinger Node.js Application startup file)
- `.htaccess` (LiteSpeed / Apache SPA URL rewriting, CORS, and Gzip compression)
- `ecosystem.config.cjs` (PM2 process manager config for Hostinger VPS / Cloud)
- `public/api/lead.php` (PHP lead handler fallback for Hostinger WordPress/Shared plans)
- `public/widget.js` (Embeddable widget script for `https://nazaakatbyr.com/`)

---

## Method 1: Hostinger Node.js Web Hosting (hPanel) — Recommended

If you have Hostinger Business Web Hosting, Cloud Startup, or any plan with the **Node.js** feature in hPanel:

### Step 1: Prepare the Files
Run the production build:
```bash
npm run build
```
This produces:
- `dist/` folder (compiled React frontend and `dist/server.cjs`)
- `server.js` (startup entry point)
- `public/widget.js` (embed script)
- `.htaccess` (Apache / LiteSpeed server rules)

### Step 2: Upload to Hostinger
1. Log in to **Hostinger hPanel**.
2. Go to **Websites** → select your domain or subdomain (e.g. `concierge.nazaakatbyr.com` or `nazaakatbyr.com`).
3. Open **File Manager** (or connect via FTP / SSH).
4. Upload all project files into your application folder (typically `public_html` or a custom subfolder).
   - Ensure the following files & folders are present:
     ```
     ├── dist/
     ├── node_modules/   (or run npm install in hPanel)
     ├── public/
     ├── server.js
     ├── package.json
     ├── .htaccess
     └── .env
     ```

### Step 3: Configure Node.js Application in hPanel
1. In hPanel, navigate to **Advanced** → **Node.js** (or search "Node.js" in the top bar).
2. Click **Create Application** (or Edit existing):
   - **Node.js version**: Choose `20.x` or `18.x`.
   - **Application mode**: `Production`.
   - **Application root**: `public_html` (or your chosen directory).
   - **Application startup file**: `server.js`.
   - **Application URL**: Select your domain/subdomain.
3. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: `your_gemini_api_key_here`
   - `LEAD_EMAIL`: `nazaakatbyr@gmail.com`
   - `WHATSAPP_NUMBER`: `8377090909`
   - `WEBSITE_URL`: `https://nazaakatbyr.com/`
4. Click **Create** or **Save**.

### Step 4: Install Dependencies & Start
1. In the Node.js application screen, click **Run NPM Install** (or access terminal/SSH and run `npm install --omit=dev`).
2. Click **Start Application** (or **Restart**).
3. Visit your domain in the browser to verify the concierge dashboard and API are live.

---

## Method 2: Hostinger VPS / Cloud Server (Ubuntu + PM2 + Nginx)

If you are using a **Hostinger VPS** (Virtual Private Server):

### Step 1: Connect to your VPS via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js 20 & PM2 (if not already installed)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### Step 3: Deploy the Code
```bash
# Clone or upload your files to /var/www/nazaakat-concierge
cd /var/www/nazaakat-concierge
npm install
npm run build
```

### Step 4: Start with PM2
Use the pre-configured `ecosystem.config.cjs`:
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy
Edit your site configuration (`/etc/nginx/sites-available/nazaakat`):
```nginx
server {
    server_name concierge.nazaakatbyr.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site and obtain an SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/nazaakat /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d concierge.nazaakatbyr.com
```

---

## Method 3: Embedding the Chatbot on nazaakatbyr.com (WordPress / WooCommerce / Shopify)

To add the AI Concierge floating bubble to your existing website on Hostinger:

### Option A: If Node.js backend is running on a subdomain (e.g. `concierge.nazaakatbyr.com`):
Add this single script tag right before the closing `</body>` tag of your website:
```html
<script 
  src="https://concierge.nazaakatbyr.com/widget.js" 
  data-api-url="https://concierge.nazaakatbyr.com"
  defer>
</script>
```

### Option B: If widget is uploaded directly to `nazaakatbyr.com/public_html/`:
1. Upload `widget.js` into your Hostinger `public_html/` folder.
2. In WordPress: Go to **Appearance** → **Theme File Editor** (or use a plugin like **WPCode / Header and Footer Scripts**).
3. Insert into the Footer:
```html
<script src="/widget.js" data-api-url="https://YOUR_BACKEND_URL" defer></script>
```

### Option C: Standalone PHP Lead Mailer on Hostinger Shared Hosting
If you do not have Node.js and only want the customer enquiry form to dispatch leads to `nazaakatbyr@gmail.com`:
- Upload `public/api/lead.php` into your Hostinger website at `public_html/api/lead.php`.
- Test submission via HTTP POST with `name`, `phone`, and `requirement`.

---

## Verifying Deployment on Hostinger

Test your endpoints using `curl` or browser:
```bash
# 1. Health check
curl -s https://YOUR_HOSTINGER_DOMAIN/api/health

# 2. Chat endpoint
curl -s -X POST https://YOUR_HOSTINGER_DOMAIN/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What do you sell?"}'

# 3. Lead submission
curl -s -X POST https://YOUR_HOSTINGER_DOMAIN/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Aarohi Sharma","phone":"9876543210","requirement":"Interested in Anarkali"}'
```
All leads will be automatically sent to **`nazaakatbyr@gmail.com`**.
