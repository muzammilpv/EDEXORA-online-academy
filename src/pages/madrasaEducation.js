const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');
const renderEnquiryForm = require('../components/EnquiryForm');

function renderMadrasaEducationPage() {
  const metaHtml = renderMeta({
    title: 'Personalised Online Madrasa Education for Every Learning Stage',
    description: 'Respectful, personalised online Madrasa education for students at all learning stages. Quran reading, Tajweed, and Islamic studies tailored to age and learning pace.',
    canonicalPath: '/madrasa-education',
    schemaType: 'Course',
    structuredDataExtra: {
      "courseName": "EDEXORA Online Madrasa Education",
      "educationalCredentialAwarded": "Personalised Religious & Language Foundation",
      "courseMode": "Online 1-on-1"
    }
  });

  const headerHtml = renderHeader('/madrasa-education');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();
  const enquiryFormHtml = renderEnquiryForm({ formId: 'madrasaEnquiryForm', defaultInterest: 'Madrasa Education' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaHtml}
</head>
<body>
  ${headerHtml}

  <main id="main-content">
    <!-- Page Hero Banner -->
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Online Madrasa Learning</span>
        <h1 class="page-header-title">Personalised Online Madrasa Education for Every Learning Stage</h1>
        <p class="page-header-subtitle">
          Respectful, one-to-one online Madrasa guidance tailored to each student’s age, baseline understanding, and family requirements across Kerala and the Gulf.
        </p>
        <div class="page-header-actions" style="margin-top: 24px; display:flex; gap:16px; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="Madrasa Education">
            Enquire About Madrasa Classes
          </button>
          <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- Overview & Photo -->
    <section class="section section-alt">
      <div class="container">
        <div class="split-layout-grid">
          <div>
            <span class="eyebrow">Personalised &amp; Respectful</span>
            <h2 class="section-title">Individual Attention at the Student’s Natural Pace</h2>
            <p style="font-size:1.0625rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:16px;">
              For many families living in the Gulf or balancing demanding school schedules in Kerala, finding accessible, flexible, and supportive Madrasa learning can be challenging.
            </p>
            <p style="font-size:0.9375rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:24px;">
              EDEXORA offers individualised online Madrasa sessions where instructors guide students patiently through reading, pronunciation, and basic Islamic principles. Because sessions are one-to-one, students receive constant encouragement without anxiety or pressure.
            </p>
            <ul style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Tailored to beginner, intermediate, and progressing learners</span>
              </li>
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Respectful, patient, and age-appropriate teaching methods</span>
              </li>
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Live one-to-one interaction scheduled flexibly around school hours</span>
              </li>
            </ul>
          </div>
          <div>
            <div style="border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--color-border);">
              <img src="/assets/images/madrasa_education.jpg" alt="Student engaged in peaceful Quran reading and Islamic studies" width="700" height="500" loading="lazy" style="width:100%; height:auto;">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Areas -->
    <section class="section">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Core Focus Areas</span>
          <h2 class="section-title">Potential Learning Areas</h2>
          <p class="section-subtitle">
            Specific curricula and learning objectives are discussed and confirmed during your consultation according to student level.
          </p>
        </div>

        <div class="commitments-grid">
          <div class="commitment-card">
            <div class="commitment-icon-wrap">📖</div>
            <h3 class="commitment-title">Quran Reading &amp; Qaida</h3>
            <p class="commitment-desc">
              Beginning with Arabic alphabet recognition, correct letter pronunciation (Makharij), and gradually progressing to reading words and sentences smoothly.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">✨</div>
            <h3 class="commitment-title">Recitation &amp; Tajweed</h3>
            <p class="commitment-desc">
              Understanding foundational rules of Tajweed, rhythmic pauses, melodic recitation practice, and memorization of essential Surahs.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🕌</div>
            <h3 class="commitment-title">Basic Islamic Studies</h3>
            <p class="commitment-desc">
              Essential knowledge of daily prayers (Salah/Namaz), practical Duas, Islamic manners, moral values, and biographical stories suitable for young minds.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🤝</div>
            <h3 class="commitment-title">Individual Learning Support</h3>
            <p class="commitment-desc">
              Additional personalized revision for children who find it difficult to keep up with traditional group madrasa schedules or who have missed early stages.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🌍</div>
            <h3 class="commitment-title">Gulf Expatriate Support</h3>
            <p class="commitment-desc">
              Specially arranged sessions for children residing in Dubai, Abu Dhabi, Doha, Riyadh, Muscat, Kuwait, and Manama matching local evening or weekend times.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">👥</div>
            <h3 class="commitment-title">Parent Progress Updates</h3>
            <p class="commitment-desc">
              Regular feedback shared with parents via WhatsApp regarding reading fluency, Surah memorization, and overall consistency.
            </p>
          </div>
        </div>

        <div style="margin-top:32px; background:var(--color-bg-neutral); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:20px 24px; text-align:center;">
          <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.6;">
            Note: The learning areas listed above represent typical study pathways. EDEXORA personalises the syllabus after understanding your child's background during the initial consultation.
          </p>
        </div>
      </div>
    </section>


    <!-- Final CTA -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-banner-title">Begin Your Child's Madrasa Journey</h2>
          <p class="cta-banner-desc">
            Connect with our team to discuss your family's preferences and schedule a free trial session.
          </p>
          <div class="cta-banner-actions">
            <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="Madrasa Education">
              Book a Free Demo
            </button>
            <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              WhatsApp Us: ${CONFIG.contact.whatsappNumber}
            </a>
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

module.exports = renderMadrasaEducationPage;
