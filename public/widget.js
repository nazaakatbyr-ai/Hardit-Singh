(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__NAZAAKAT_CONCIERGE_LOADED__) return;
  window.__NAZAAKAT_CONCIERGE_LOADED__ = true;

  // Locate the current script tag to determine base URL and configuration
  const currentScript =
    document.currentScript ||
    document.querySelector('script[data-bot-id="nazaakatbyr"]') ||
    document.querySelector('script[src*="widget.js"]');

  const configuredApiUrl = currentScript && currentScript.getAttribute('data-api-url');
  let baseUrl = configuredApiUrl || '';
  if (!baseUrl) {
    if (currentScript && currentScript.src) {
      const url = new URL(currentScript.src);
      baseUrl = `${url.protocol}//${url.host}`;
    } else {
      baseUrl = window.location.origin;
    }
  }

  const botId = (currentScript && currentScript.getAttribute('data-bot-id')) || 'nazaakatbyr';

  // Generate unique session ID for this browser tab/visitor
  let sessionId = sessionStorage.getItem('nazaakat_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('nazaakat_session_id', sessionId);
  }

  // Create isolated container element
  const hostElement = document.createElement('div');
  hostElement.id = 'nazaakat-concierge-root';
  hostElement.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
  document.body.appendChild(hostElement);

  // Attach Shadow DOM for complete CSS isolation
  const shadow = hostElement.attachShadow({ mode: 'open' });

  // Styles isolated within the shadow root
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .nzk-launcher {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #133926 0%, #0c2518 100%);
      color: #f7eed9;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 12px 18px;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 10px 25px -5px rgba(12, 37, 24, 0.35), 0 0 15px rgba(212, 175, 55, 0.2);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .nzk-launcher:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px -5px rgba(12, 37, 24, 0.45), 0 0 20px rgba(212, 175, 55, 0.3);
      border-color: rgba(212, 175, 55, 0.7);
    }

    .nzk-launcher-icon {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: #d4af37;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .nzk-window {
      position: fixed;
      bottom: 84px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 600px;
      max-height: calc(100vh - 104px);
      background: #faf8f5;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      box-shadow: 0 20px 40px -10px rgba(19, 57, 38, 0.25), 0 0 1px rgba(0,0,0,0.1);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 10000000;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .nzk-window.open {
      display: flex;
    }

    .nzk-header {
      background: linear-gradient(135deg, #133926 0%, #0d271a 100%);
      color: #f7eed9;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }

    .nzk-header-info {
      display: flex;
      flex-direction: column;
    }

    .nzk-title {
      font-family: Georgia, serif;
      font-size: 16px;
      font-weight: 600;
      color: #f7eed9;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nzk-gold-dot {
      width: 8px;
      height: 8px;
      background: #d4af37;
      border-radius: 50%;
      box-shadow: 0 0 6px #d4af37;
    }

    .nzk-subtitle {
      font-size: 11px;
      color: rgba(247, 238, 217, 0.75);
      margin-top: 2px;
    }

    .nzk-close-btn {
      background: transparent;
      border: none;
      color: #f7eed9;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.15s;
    }
    .nzk-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .nzk-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .nzk-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      line-height: 1.5;
    }

    .nzk-msg.assistant {
      align-self: flex-start;
      background: #ffffff;
      color: #232323;
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    }

    .nzk-msg.user {
      align-self: flex-end;
      background: #133926;
      color: #ffffff;
      border-bottom-right-radius: 2px;
    }

    .nzk-quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }

    .nzk-action-chip {
      background: rgba(19, 57, 38, 0.05);
      border: 1px solid rgba(19, 57, 38, 0.15);
      color: #133926;
      padding: 6px 10px;
      border-radius: 9999px;
      font-size: 11.5px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .nzk-action-chip:hover {
      background: #133926;
      color: #ffffff;
      border-color: #133926;
    }

    .nzk-input-area {
      padding: 12px;
      background: #ffffff;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      gap: 8px;
    }

    .nzk-input {
      flex: 1;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      outline: none;
      transition: border 0.15s;
    }

    .nzk-input:focus {
      border-color: #133926;
    }

    .nzk-send-btn {
      background: #133926;
      color: #f7eed9;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }

    .nzk-send-btn:hover {
      background: #0d271a;
    }

    .nzk-footer-brand {
      padding: 4px;
      text-align: center;
      font-size: 10px;
      color: #888;
      background: #faf8f5;
      border-top: 1px solid rgba(0,0,0,0.03);
    }
  `;
  shadow.appendChild(style);

  // Build the DOM inside shadow root
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="nzk-window" id="nzk-window">
      <div class="nzk-header">
        <div class="nzk-header-info">
          <div class="nzk-title">
            <span class="nzk-gold-dot"></span>
            Nazaakat Concierge
          </div>
          <div class="nzk-subtitle">Personal Style Assistant • NazaakatbyR</div>
        </div>
        <button class="nzk-close-btn" id="nzk-close" aria-label="Close Chat">×</button>
      </div>

      <div class="nzk-messages" id="nzk-messages">
        <div class="nzk-msg assistant">
          <strong>Welcome to NazaakatbyR ✨</strong><br>
          I’m your personal style concierge. How may I assist you today?
          <div class="nzk-quick-actions">
            <button class="nzk-action-chip" data-query="What do you sell?">What do you sell?</button>
            <button class="nzk-action-chip" data-query="Find My Perfect Outfit">Find My Perfect Outfit</button>
            <button class="nzk-action-chip" data-query="Do you have Anarkalis?">Anarkali Collection</button>
            <button class="nzk-action-chip" data-query="How long does delivery take?">Shipping & Delivery</button>
            <button class="nzk-action-chip" data-query="What is your return policy?">Return Policy</button>
            <button class="nzk-action-chip" data-query="How can I contact you?">Contact Us</button>
          </div>
        </div>
      </div>

      <div class="nzk-input-area">
        <input type="text" class="nzk-input" id="nzk-input" placeholder="Ask about suits, Anarkalis, shipping..." />
        <button class="nzk-send-btn" id="nzk-send" aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
          </svg>
        </button>
      </div>

      <div class="nzk-footer-brand">
        Grounded in NazaakatbyR Website • WhatsApp: 8377090909
      </div>
    </div>

    <button class="nzk-launcher" id="nzk-launcher" aria-label="Open Nazaakat Concierge">
      <svg class="nzk-launcher-icon" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      <span>Nazaakat Concierge</span>
    </button>
  `;
  shadow.appendChild(container);

  // Wire events
  const launcher = shadow.getElementById('nzk-launcher');
  const windowEl = shadow.getElementById('nzk-window');
  const closeBtn = shadow.getElementById('nzk-close');
  const sendBtn = shadow.getElementById('nzk-send');
  const inputEl = shadow.getElementById('nzk-input');
  const messagesEl = shadow.getElementById('nzk-messages');

  function toggleChat() {
    const isOpen = windowEl.classList.contains('open');
    if (isOpen) {
      windowEl.classList.remove('open');
    } else {
      windowEl.classList.add('open');
      inputEl.focus();
      // Track chat opened
      fetch(`${baseUrl}/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: 'chat_opened', session_id: sessionId }),
      }).catch(() => {});
    }
  }

  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `nzk-msg ${role}`;
    msg.innerHTML = text.replace(/\n/g, '<br>');
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function handleSend(textToSend) {
    const query = (textToSend || inputEl.value).trim();
    if (!query) return;

    appendMessage('user', query);
    inputEl.value = '';

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'nzk-msg assistant';
    typing.id = 'nzk-typing';
    typing.textContent = 'Curating your answer...';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: query }),
      });

      const data = await res.json();
      typing.remove();

      if (data && data.reply) {
        let formatted = data.reply;
        if (data.matched_products && data.matched_products.length > 0) {
          formatted += `<div style="margin-top:10px; padding-top:8px; border-top:1px dashed #ddd;"><strong>Verified Boutique Pieces:</strong><br>`;
          data.matched_products.forEach((p) => {
            formatted += `<div style="margin-top:6px; font-size:12px;">• <strong>${p.name}</strong> — ₹${p.price.toLocaleString('en-IN')}<br><a href="${p.product_url}" target="_blank" rel="noopener noreferrer" style="color:#133926; text-decoration:underline;">View on Website</a></div>`;
          });
          formatted += `</div>`;
        }
        appendMessage('assistant', formatted);
      } else {
        appendMessage(
          'assistant',
          'I’m having a little trouble accessing that information right now. Please contact our NazaakatbyR team at 8377090909 or nazaakatbyr@gmail.com.'
        );
      }
    } catch (err) {
      typing.remove();
      appendMessage(
        'assistant',
        'I’m having a little trouble accessing that information right now. Please try again or contact our NazaakatbyR team at 8377090909.'
      );
    }
  }

  sendBtn.addEventListener('click', () => handleSend());
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Quick Action Buttons delegation
  messagesEl.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('nzk-action-chip')) {
      const query = e.target.getAttribute('data-query');
      if (query) handleSend(query);
    }
  });
})();
