const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');
const renderEnquiryForm = require('../components/EnquiryForm');

function renderContactPage() {
  const metaHtml = renderMeta({
    title: 'Contact Us — WhatsApp & Enquiries',
    description: 'Get in touch with EDEXORA. Connect on WhatsApp (+91 95261 80016), request a free demo class, or submit your personalized learning enquiry.',
    canonicalPath: '/contact'
  });

  const headerHtml = renderHeader('/contact');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();
  const enquiryFormHtml = renderEnquiryForm({ formId: 'contactEnquiryForm', defaultInterest: 'School Tuition' });

  // Social link helpers
  const facebookConfigured = (CONFIG.contact.facebookPageUrl && CONFIG.contact.facebookPageUrl !== 'FACEBOOK_PAGE_URL');
  const waChannelConfigured = (CONFIG.contact.whatsappChannelUrl && CONFIG.contact.whatsappChannelUrl !== 'WHATSAPP_CHANNEL_URL');
  const emailConfigured = (CONFIG.contact.ownerEmail && CONFIG.contact.ownerEmail !== 'EDEXORA_OWNER_EMAIL');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaHtml}
</head>
<body>
  ${headerHtml}

  <main id="main-content">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Direct Educational Support</span>
        <h1 class="page-header-title">Contact EDEXORA</h1>
        <p class="page-header-subtitle">
          Have questions about tuition options, syllabus support, or schedules? Connect with our team directly.
        </p>
      </div>
    </section>

    <!-- Contact Card Section -->
    <section class="section section-alt">
      <div class="container container-narrow">
        <div class="contact-consultation-card" style="max-width: 640px; margin: 0 auto; background:#fff; border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:44px 36px; box-shadow:var(--shadow-md);">
          <span class="eyebrow">Quick Consultation</span>
          <h2 style="font-size:1.85rem; font-weight:800; color:var(--color-black); margin-bottom:12px;">
            Book a Free Trial Session
          </h2>
          <p style="font-size:1rem; color:var(--color-text-secondary); line-height:1.6; margin-bottom:28px;">
            Connect directly with our academic coordinator on WhatsApp to discuss your child's syllabus, grade level, and schedule preferences.
          </p>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <button type="button" class="btn btn-primary btn-block btn-lg" data-open-demo>
              Book a Free Demo Class
            </button>
            <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block btn-lg">
              Chat on WhatsApp: ${CONFIG.contact.whatsappNumber}
            </a>
          </div>

          <div style="margin-top:28px; padding-top:24px; border-top:1px solid var(--color-border-light); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px; font-size:0.8125rem; color:var(--color-text-muted);">
              <span>⏱️</span>
              <span>Response time: Usually within 15 to 30 minutes on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${footerHtml}
  ${floatingWhatsAppHtml}
  ${demoModalHtml}

  <script src="/assets/js/config.js"></script>
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

module.exports = renderContactPage;
