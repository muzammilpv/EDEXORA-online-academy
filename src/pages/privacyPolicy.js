const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');

function renderPrivacyPolicyPage() {
  const metaHtml = renderMeta({
    title: 'Privacy Policy',
    description: 'Privacy Policy for EDEXORA. Learn how we handle student enquiry information, protect parental data, and respect privacy.',
    canonicalPath: '/privacy-policy'
  });

  const headerHtml = renderHeader('/privacy-policy');
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
        <span class="eyebrow">Data Protection &amp; Trust</span>
        <h1 class="page-header-title">Privacy Policy</h1>
        <p class="page-header-subtitle">
          Last updated: October 2026. This policy explains how EDEXORA collects, uses, and safeguards information submitted through our website and enquiry channels.
        </p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container container-narrow" style="line-height:1.8; color:var(--color-text-main);">
        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">1. Purpose of Information Collection</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          EDEXORA is an educational tuition service offering personalised one-to-one learning. We collect basic enquiry details solely to understand your child’s educational needs, evaluate teacher availability, communicate trial lesson schedules, and respond to parent queries.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">2. What Information We Collect</h2>
        <p style="margin-bottom:12px; color:var(--color-text-secondary);">
          When you fill out an enquiry or free demo request form on our website, we collect:
        </p>
        <ul style="list-style:disc; padding-left:24px; margin-bottom:24px; color:var(--color-text-secondary);">
          <li>Student’s name and Grade/Class level</li>
          <li>Parent or guardian’s name and contact information</li>
          <li>WhatsApp phone number for direct coordination</li>
          <li>Learning interests (School Tuition, Madrasa Education, or Language Learning)</li>
          <li>Relevant curriculum or subject requirements</li>
          <li>Preferred session timings or notes provided by the parent</li>
        </ul>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          We <strong>do not</strong> request sensitive financial information, government IDs, credit card numbers, or unnecessary personal data on this website.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">3. How Your Information Is Used &amp; Stored</h2>
        <p style="margin-bottom:12px; color:var(--color-text-secondary);">
          Your enquiry data is submitted securely and transmitted to our private administrative records (Google Sheets integration) accessible strictly by authorized EDEXORA educational coordinators. We use this information to:
        </p>
        <ul style="list-style:disc; padding-left:24px; margin-bottom:24px; color:var(--color-text-secondary);">
          <li>Contact parents directly via WhatsApp or phone call to discuss class schedules</li>
          <li>Match the student with an appropriate subject teacher</li>
          <li>Coordinate free demo session links via Google Meet or Zoom</li>
          <li>Provide academic progress updates after tuition has commenced</li>
        </ul>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">4. No Third-Party Selling or Public Exposure</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          We respect student and family privacy. We <strong>never sell, rent, lease, or publicly expose</strong> student names, phone numbers, or academic notes to third-party marketing companies, advertisers, or unaffiliated organizations.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">5. Parental Consent for Minors</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          Because our courses serve students from Kindergarten to Class 10, all enquiries, demo bookings, and communications must be initiated or approved by a parent or legal guardian.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">6. Data Retention &amp; Removal Requests</h2>
        <p style="margin-bottom:24px; color:var(--color-text-secondary);">
          Parents have the right to request the inspection or deletion of their enquiry records at any time. If you wish to have your details removed from our records, please message our support team on WhatsApp at <strong>${CONFIG.contact.whatsappNumber}</strong> or email our administrative contact.
        </p>

        <h2 style="font-size:1.5rem; font-weight:700; margin-bottom:12px;">7. Contacting Us Regarding Privacy</h2>
        <p style="color:var(--color-text-secondary);">
          If you have any questions or feedback regarding this Privacy Policy, please reach out to us at:<br>
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

module.exports = renderPrivacyPolicyPage;
