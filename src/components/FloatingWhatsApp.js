const CONFIG = require('../config');

function renderFloatingWhatsApp() {
  const callNumber = '9526180016';
  const callHref = `tel:+91${callNumber}`;

  return `
  <!-- Fixed Floating Contact Actions (Direct Call & WhatsApp) on Every Page -->
  <aside class="floating-action-group" aria-label="Direct Contact Actions">
    <!-- Blue Call Button (Positioned Above WhatsApp) -->
    <a href="${callHref}" 
       class="floating-call-btn" 
       aria-label="Direct Phone Call to EDEXORA at +91 95261 80016" 
       title="Call EDEXORA: +91 95261 80016">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
      </svg>
    </a>

    <!-- Green WhatsApp Button -->
    <a href="${CONFIG.contact.whatsappLink}" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="floating-whatsapp-btn" 
       aria-label="Contact EDEXORA on WhatsApp"
       title="Contact EDEXORA on WhatsApp">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
        <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.907.534 3.69 1.458 5.215L2.053 22l4.908-1.377a9.98 9.98 0 0 0 5.07 1.408h.004c5.532 0 10.027-4.495 10.027-10.031A10.016 10.016 0 0 0 12.031 2zm0 18.286h-.004a8.27 8.27 0 0 1-4.221-1.155l-.303-.18-3.13.877.876-3.05-.198-.316a8.276 8.276 0 0 1-1.278-4.431c0-4.57 3.717-8.286 8.291-8.286 2.215 0 4.298.863 5.864 2.429 1.565 1.566 2.427 3.649 2.427 5.864 0 4.57-3.718 8.288-8.291 8.288zm4.542-6.202c-.249-.125-1.472-.727-1.7-.81-.228-.083-.394-.125-.56.125-.166.249-.644.81-.789.976-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.659-1.238-1.474-1.383-1.723-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.436.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.436-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.076s.892 2.408 1.016 2.574c.125.166 1.755 2.68 4.252 3.758.594.257 1.058.41 1.42.525.597.19 1.14.163 1.569.099.479-.072 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
      </svg>
    </a>
  </aside>
  `;
}

module.exports = renderFloatingWhatsApp;
