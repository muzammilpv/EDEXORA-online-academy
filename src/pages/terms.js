const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');

function renderTermsPage() {
  const metaHtml = renderMeta({
    title: 'Terms & Conditions',
    description: 'Terms and Conditions of service for EDEXORA educational tuition and enquiry website.',
    canonicalPath: '/terms'
  });

  const headerHtml = renderHeader('/terms');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaHtml}
</head>
<body>
  ${headerHtml}

  <main id="main-content">
    <section class="page-header">
      <div class="container container-narrow">
        <span class="eyebrow">Service Guidelines</span>
        <h1 class="page-header-title">Terms &amp; Conditions</h1>
        <p class="page-header-subtitle">
          Please review the operational terms governing enquiries, demo classes, and tuition coordination with EDEXORA.
        </p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow" style="line-height:1.8; color:var(--color-text-main);">
        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">1. Educational Platform Scope</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          EDEXORA operates an educational enquiry and tutoring platform providing personalized one-to-one instruction in school subjects (KG to Class 10), Madrasa education, and language studies. This website serves as an informational and enquiry portal. Live sessions are held externally via secured videoconferencing tools (Google Meet or Zoom) upon mutual arrangement.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">2. Enquiries &amp; Free Trial Sessions</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          Submitting an enquiry or demo request via this website or WhatsApp initiates a consultation with our academic coordinator. A demo class is confirmed only once teacher availability, schedule, and study requirements have been mutually agreed upon. Submission of a form does not constitute an automated booking guarantee.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">3. Course Fees &amp; Payments</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          All tuition fees are shared directly and transparently during the consultation process based on selected subjects, class frequency, and customized schedules. This website does not process credit cards, automated subscription billings, or digital payments directly.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">4. Class Conduct &amp; Parental Supervision</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          For students in primary grades, parents or guardians are encouraged to ensure a peaceful learning environment and stable internet connectivity during scheduled live sessions. Tutors and students are expected to maintain respectful, encouraging, and academically focused interactions at all times.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">5. Rescheduling &amp; Cancellations</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          We understand family routines and school schedules vary. If a student needs to reschedule a planned session, parents are requested to notify the EDEXORA coordinator in advance via WhatsApp so alternative timings can be explored.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">6. Intellectual Property</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          The EDEXORA name, logo, website design, and published educational materials are the property of EDEXORA. Reproduction or unauthorized distribution without express written permission is prohibited.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">7. Contact Information</h2>
        <p style="color:var(--color-text-secondary);">
          For questions or clarifications regarding our terms of service, please reach out directly:<br>
          <strong>EDEXORA Online Academy</strong><br>
          WhatsApp: <a href="${CONFIG.contact.whatsappLink}" style="color:var(--color-black); font-weight:bold; text-decoration:underline;">${CONFIG.contact.whatsappNumber}</a><br>
          Instagram: <a href="${CONFIG.contact.instagram}" target="_blank" rel="noopener" style="color:var(--color-black); font-weight:bold; text-decoration:underline;">@edexora</a>
        </p>
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

module.exports = renderTermsPage;
