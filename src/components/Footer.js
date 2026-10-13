const CONFIG = require('../config');

function renderFooter() {
  const currentYear = new Date().getFullYear();

  // Social link helpers
  const instagramUrl = CONFIG.contact.instagram;
  const facebookUrl = (CONFIG.contact.facebookPageUrl && CONFIG.contact.facebookPageUrl !== 'FACEBOOK_PAGE_URL') ? CONFIG.contact.facebookPageUrl : null;
  const waChannelUrl = (CONFIG.contact.whatsappChannelUrl && CONFIG.contact.whatsappChannelUrl !== 'WHATSAPP_CHANNEL_URL') ? CONFIG.contact.whatsappChannelUrl : null;

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-brand">
          <a href="/" class="brand-link" style="color: #fff;" aria-label="EDEXORA Home">
            <div class="footer-brand-logo-wrap">
              <img src="${CONFIG.brand.logoPath}" alt="${CONFIG.brand.logoAlt}" class="footer-brand-logo-img" width="44" height="44" loading="lazy">
            </div>
            <div class="brand-text-wrap">
              <span class="brand-name" style="color: #fff;">${CONFIG.brand.name}</span>
              <span class="brand-tagline" style="color: #FFC928;">${CONFIG.brand.tagline}</span>
            </div>
          </a>
          <p class="footer-intro">${CONFIG.brand.shortIntro}</p>
          
          <div class="footer-socials">
            <!-- Instagram -->
            <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="EDEXORA on Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>

            <!-- Direct WhatsApp -->
            <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="EDEXORA WhatsApp Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.907.534 3.69 1.458 5.215L2.053 22l4.908-1.377a9.98 9.98 0 0 0 5.07 1.408h.004c5.532 0 10.027-4.495 10.027-10.031A10.016 10.016 0 0 0 12.031 2zm0 18.286h-.004a8.27 8.27 0 0 1-4.221-1.155l-.303-.18-3.13.877.876-3.05-.198-.316a8.276 8.276 0 0 1-1.278-4.431c0-4.57 3.717-8.286 8.291-8.286 2.215 0 4.298.863 5.864 2.429 1.565 1.566 2.427 3.649 2.427 5.864 0 4.57-3.718 8.288-8.291 8.288zm4.542-6.202c-.249-.125-1.472-.727-1.7-.81-.228-.083-.394-.125-.56.125-.166.249-.644.81-.789.976-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.659-1.238-1.474-1.383-1.723-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.436.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.436-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.436.062-.664.311-.228.249-.871.851-.871 2.076s.892 2.408 1.016 2.574c.125.166 1.755 2.68 4.252 3.758.594.257 1.058.41 1.42.525.597.19 1.14.163 1.569.099.479-.072 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/></svg>
            </a>

            ${facebookUrl ? `
            <!-- Facebook Page -->
            <a href="${facebookUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="EDEXORA Facebook Page">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            ` : ''}

            ${waChannelUrl ? `
            <!-- WhatsApp Channel -->
            <a href="${waChannelUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="EDEXORA WhatsApp Channel" title="WhatsApp Channel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
            </a>
            ` : ''}
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="footer-column-title">Explore</h3>
          <ul class="footer-nav-list">
            <li><a href="/" class="footer-nav-link">Home</a></li>
            <li><a href="/about" class="footer-nav-link">About Us</a></li>
            <li><a href="/courses" class="footer-nav-link">All Courses</a></li>
            <li><a href="/contact" class="footer-nav-link">Contact Us</a></li>
            <li><a href="javascript:void(0);" data-open-demo class="footer-nav-link">Book a Free Demo</a></li>
          </ul>
        </div>

        <!-- Learning Services -->
        <div>
          <h3 class="footer-column-title">Our Services</h3>
          <ul class="footer-nav-list">
            <li><a href="/school-tuition" class="footer-nav-link">School Tuition (KG - 10)</a></li>
            <li><a href="/madrasa-education" class="footer-nav-link">Madrasa Education</a></li>
            <li><a href="/language-learning" class="footer-nav-link">Language Learning</a></li>
            <li><a href="/school-tuition#kerala-state" class="footer-nav-link">Kerala State Syllabus</a></li>
            <li><a href="/school-tuition#cbse" class="footer-nav-link">CBSE & ICSE Tuition</a></li>
          </ul>
        </div>

        <!-- Direct Contact -->
        <div>
          <h3 class="footer-column-title">Contact Us</h3>
          <ul class="footer-nav-list">
            <li>
              <span style="display:block; font-size:0.75rem; color:#888; text-transform:uppercase; letter-spacing:0.05em;">WhatsApp Enquiries</span>
              <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="footer-nav-link" style="color:#FFC928; font-weight:700;">
                ${CONFIG.contact.whatsappNumber}
              </a>
            </li>
            <li>
              <span style="display:block; font-size:0.75rem; color:#888; text-transform:uppercase; letter-spacing:0.05em;">Serving Families In</span>
              <span style="font-size:0.875rem; color:#ccc;">Kerala, India & Gulf Countries (UAE, KSA, Qatar, Oman, Kuwait, Bahrain)</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>
          &copy; ${currentYear} EDEXORA. All rights reserved.
        </div>
        <div class="footer-bottom-links">
          <a href="/privacy-policy" class="footer-bottom-link">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="footer-bottom-link">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
  `;
}

module.exports = renderFooter;
