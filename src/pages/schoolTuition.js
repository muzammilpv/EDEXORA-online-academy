const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');
const renderEnquiryForm = require('../components/EnquiryForm');

function renderSchoolTuitionPage() {
  const metaHtml = renderMeta({
    title: 'Personalised Online School Tuition from KG to Class 10',
    description: 'One-to-one online tuition for Kerala State Syllabus, CBSE, and ICSE curriculums from KG to Class 10. Tailored academic guidance for students in Kerala and Gulf countries.',
    canonicalPath: '/school-tuition',
    schemaType: 'Course',
    structuredDataExtra: {
      "courseName": "EDEXORA School Tuition (KG to Class 10)",
      "educationalCredentialAwarded": "Academic Support",
      "courseMode": "Online 1-on-1"
    }
  });

  const headerHtml = renderHeader('/school-tuition');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();
  const enquiryFormHtml = renderEnquiryForm({ formId: 'schoolEnquiryForm', defaultInterest: 'School Tuition' });

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
        <span class="eyebrow">KG to Class 10 Tuition</span>
        <h1 class="page-header-title">Personalised Online School Tuition from KG to Class 10</h1>
        <p class="page-header-subtitle">
          Dedicated one-to-one tuition tailored to your child’s school syllabus, pace, and examination goals across Kerala State, CBSE, and ICSE boards.
        </p>
        <div class="page-header-actions" style="margin-top: 24px; display:flex; gap:16px; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="School Tuition">
            Enquire About School Tuition
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
            <span class="eyebrow">Academic Focus</span>
            <h2 class="section-title">One-to-One Attention for Real Conceptual Clarity</h2>
            <p style="font-size:1.0625rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:16px;">
              School education forms the foundation of every student’s future. In traditional classrooms or large coaching batches, students often hesitate to ask doubts, falling behind on core principles.
            </p>
            <p style="font-size:0.9375rem; line-height:1.7; color:var(--color-text-secondary); margin-bottom:24px;">
              At EDEXORA, our one-to-one online format ensures that the entire session is structured solely around your child. Whether they need assistance with everyday homework, thorough revision for term examinations, or focused problem-solving in challenging subjects, our tutors adapt to their learning style.
            </p>
            <ul style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Targeted doubt clarification without classroom hesitation</span>
              </li>
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Regular chapter-wise assessments and revision support</span>
              </li>
              <li style="display:flex; align-items:flex-start; gap:10px; font-weight:600;">
                <span style="color:var(--color-primary-yellow); background:#111; width:22px; height:22px; flex-shrink:0; margin-top:2px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</span>
                <span>Convenient schedules suited to students in Kerala and Gulf timezones</span>
              </li>
            </ul>
          </div>
          <div>
            <div style="border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--color-border);">
              <img src="/assets/images/school_tuition.jpg" alt="Dedicated school tuition with digital tablet and notebook" width="700" height="500" loading="lazy" style="width:100%; height:auto;">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Curriculums Supported -->
    <section class="section">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Syllabus Options</span>
          <h2 class="section-title">Curriculums We Support</h2>
          <p class="section-subtitle">
            We adapt lesson plans to match the textbooks and grading frameworks of the student's registered educational board.
          </p>
        </div>

        <div class="curriculum-grid">
          <!-- Kerala State -->
          <div class="curriculum-card" id="kerala-state">
            <span class="curriculum-badge">State Syllabus</span>
            <h3 class="curriculum-title">Kerala State Syllabus</h3>
            <p class="curriculum-desc">
              Comprehensive support for SCERT Kerala curriculum from Primary up to SSLC (Class 10). Tutors clarify Malayalam and English medium concepts with clear board-exam oriented techniques.
            </p>
            <div style="margin-top:auto;">
              <button type="button" class="btn btn-secondary btn-block" data-open-demo data-demo-interest="School Tuition">Enquire for Kerala State</button>
            </div>
          </div>

          <!-- CBSE -->
          <div class="curriculum-card" id="cbse">
            <span class="curriculum-badge">National Curriculum</span>
            <h3 class="curriculum-title">CBSE Board</h3>
            <p class="curriculum-desc">
              NCERT-aligned coaching focusing on deep conceptual reasoning, competency-based questions, and thorough preparation for internal assessments and Board exams.
            </p>
            <div style="margin-top:auto;">
              <button type="button" class="btn btn-secondary btn-block" data-open-demo data-demo-interest="School Tuition">Enquire for CBSE</button>
            </div>
          </div>

          <!-- ICSE -->
          <div class="curriculum-card" id="icse">
            <span class="curriculum-badge">Council Curriculum</span>
            <h3 class="curriculum-title">ICSE Board</h3>
            <p class="curriculum-desc">
              In-depth instruction catering to the expansive CISCE syllabus. Focus on analytical writing, problem-solving, and structured topic-by-topic mastery.
            </p>
            <div style="margin-top:auto;">
              <button type="button" class="btn btn-secondary btn-block" data-open-demo data-demo-interest="School Tuition">Enquire for ICSE</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Class Stages -->
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Academic Journey</span>
          <h2 class="section-title">Learning by Class Stages</h2>
          <p class="section-subtitle">
            Instructional methods evolve with the developmental stage of the child.
          </p>
        </div>

        <div class="three-col-cards-grid">
          <div class="stage-card">
            <div style="font-size:2rem; font-weight:800; color:var(--color-primary-yellow); margin-bottom:8px;">KG – Class 4</div>
            <h4 style="font-size:1.1875rem; font-weight:700; margin-bottom:8px;">Early &amp; Primary Foundation</h4>
            <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.6;">
              Gentle, encouraging mentorship emphasizing phonics, basic arithmetic, reading habits, and building genuine enthusiasm for learning.
            </p>
          </div>

          <div class="stage-card">
            <div style="font-size:2rem; font-weight:800; color:var(--color-primary-yellow); margin-bottom:8px;">Class 5 – Class 8</div>
            <h4 style="font-size:1.1875rem; font-weight:700; margin-bottom:8px;">Middle School Growth</h4>
            <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.6;">
              Building strong problem-solving skills in Mathematics, General Science, Social Studies, and language fundamentals to prepare for advanced studies.
            </p>
          </div>

          <div class="stage-card">
            <div style="font-size:2rem; font-weight:800; color:var(--color-primary-yellow); margin-bottom:8px;">Class 9 &amp; 10</div>
            <h4 style="font-size:1.1875rem; font-weight:700; margin-bottom:8px;">Secondary &amp; Board Focus</h4>
            <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.6;">
              Intensive preparation for Class 10 Board examinations, past question paper practice, time-management tips, and concept reinforcement.
            </p>
          </div>
        </div>

        <div style="margin-top:32px; background:var(--color-primary-yellow-light); border:1px solid rgba(255,201,40,0.4); border-radius:var(--radius-md); padding:20px 24px; text-align:center;">
          <p style="font-size:0.9375rem; color:var(--color-black); font-weight:600;">
            ℹ️ Subject Availability Notice: Students can enquire about any school subject. Specific subject availability and teacher matching are confirmed directly during your consultation with the EDEXORA team.
          </p>
        </div>
      </div>
    </section>


    <!-- Final CTA Banner -->
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-banner-title">Experience One-to-One School Tuition</h2>
          <p class="cta-banner-desc">
            Connect with our academic coordinator on WhatsApp to explore availability and arrange a free trial lesson.
          </p>
          <div class="cta-banner-actions">
            <button type="button" class="btn btn-primary btn-lg" data-open-demo data-demo-interest="School Tuition">
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

module.exports = renderSchoolTuitionPage;
