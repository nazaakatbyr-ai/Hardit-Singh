// Hostinger VPS / Cloud PM2 Ecosystem File
// Usage on Hostinger VPS:
// 1. npm install
// 2. npm run build
// 3. pm2 start ecosystem.config.cjs
// 4. pm2 save && pm2 startup

module.exports = {
  apps: [
    {
      name: 'nazaakat-concierge',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
