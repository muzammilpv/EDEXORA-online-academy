const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');
const renderEnquiryForm = require('../components/EnquiryForm');

function renderLanguageLearningPage() {
  const metaHtml = renderMeta({
    title: 'Learn Languages with a Personalised Approach',
    description: 'Personalised one-to-one language tutoring in English, Malayalam, Hindi, Arabic, and Urdu. Build practical communication and literacy skills with EDEXORA.',
    canonicalPath: '/language-learning',
    schemaType: 'Course',
    structuredDataExtra: {
      "courseName": "EDEXORA Personalised Language Classes",
      "educationalCredentialAwarded": "Language Literacy & Communication",
      "courseMode": "Online 1-on-1"
    }
  });

  const headerHtml = renderHeader('/language-learning');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();
  const enquiryFormHtml = renderEnquiryForm({ formId: 'languageEnquiryForm', defaultInterest: 'Language Learning' });

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
        <span class="eyebrow">Personalised Language Tutoring</span>
        <h1 class="page-header-title">Learn Languages with a Personalised Approach</h1>
        <p class="page-header-subtitle">
          Build authentic confidence in speaking, reading, writing, and comprehension through dedicated one-to-one language guidance in English, Malayalam, Hindi, Arabic, and Urdu.
        </p>
        <div style="margin-top: 24px; display:flex; gap:16px; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="Language Learning">
            Enquire About Language Classes
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
        <div style="display:grid; grid-template-columns: 1.1fr 0.9fr; gap:48px; align-items:center;">
          <div>
            <span class="eyebrow">Interactive 1-on-1 Practice</span>
            <h2 class="section-title">Language Confidence Begins with Focused Conversation</h2>
            <p style="font-size:1.0625rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:16px;">
              Whether helping a child connect with their mother tongue, assisting a Gulf student in mastering Arabic for school exams, or building fluent spoken English, individual attention makes all the difference.
            </p>
            <p style="font-size:0.9375rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:24px;">
              In our one-to-one sessions, learners can converse freely without self-consciousness. Instructors tailor exercises to the student's existing level—covering conversational vocabulary, reading scripts, and everyday sentence construction.
            </p>
            <ul style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
              <li style="display:flex; align-items:center; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                One-to-one speaking and pronunciation practice
              </li>
              <li style="display:flex; align-items:center; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                School syllabus and supplementary language support
              </li>
              <li style="display:flex; align-items:center; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                Sessions adapted to student’s current proficiency level
              </li>
            </ul>
          </div>
          <div>
            <div style="border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--color-border);">
              <img src="/assets/images/language_learning.jpg" alt="Student engaged in interactive language tutoring" width="700" height="500" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The 5 Languages -->
    <section class="section">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Our Language Offerings</span>
          <h2 class="section-title">Languages Available</h2>
          <p class="section-subtitle">
            Choose the language your child needs. Current proficiency level and goals are discussed during the initial consultation.
          </p>
        </div>

        <div class="languages-grid">
          <!-- English -->
          <div class="language-card">
            <div class="language-native-script" style="color:#111;">Aa</div>
            <h3 class="language-name">English</h3>
            <p class="language-desc">Grammar, writing, reading comprehension, and spoken confidence.</p>
          </div>

          <!-- Malayalam -->
          <div class="language-card">
            <div class="language-native-script" style="color:#111;">അ</div>
            <h3 class="language-name">Malayalam</h3>
            <p class="language-desc">Connecting Gulf-based children with mother tongue reading &amp; speech.</p>
          </div>

          <!-- Hindi -->
          <div class="language-card">
            <div class="language-native-script" style="color:#111;">क</div>
            <h3 class="language-name">Hindi</h3>
            <p class="language-desc">School syllabus support, Varnamala, grammar rules, and conversational fluency.</p>
          </div>

          <!-- Arabic -->
          <div class="language-card">
            <div class="language-native-script" style="color:#111;">ض</div>
            <h3 class="language-name">Arabic</h3>
            <p class="language-desc">School curriculum Arabic for Gulf students, reading, writing, and vocabulary.</p>
          </div>

          <!-- Urdu -->
          <div class="language-card">
            <div class="language-native-script" style="color:#111;">اردو</div>
            <h3 class="language-name">Urdu</h3>
            <p class="language-desc">Alphabet literacy, conversational Urdu, poetry appreciation, and writing.</p>
          </div>
        </div>

        <div style="margin-top:36px; background:var(--color-bg-neutral); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:20px 24px; text-align:center;">
          <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.6;">
            Note: EDEXORA does not make generic claims about instant fluency or standardized exam certification. All instruction is structured around the student’s actual pace, practice dedication, and initial learning objectives.
          </p>
        </div>
      </div>
    </section>


    <!-- Final CTA -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-banner-title">Start Learning a Language Today</h2>
          <p class="cta-banner-desc">
            Connect with EDEXORA on WhatsApp to discuss your target language and schedule an introductory session.
          </p>
          <div class="cta-banner-actions">
            <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="Language Learning">
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

module.exports = renderLanguageLearningPage;
