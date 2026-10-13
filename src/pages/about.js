const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');

function renderAboutPage() {
  const metaHtml = renderMeta({
    title: 'About Us — From Learning to Excellence',
    description: 'Learn about EDEXORA, our mission, vision, and personalised one-to-one educational approach for families in Kerala and Gulf countries.',
    canonicalPath: '/about'
  });

  const headerHtml = renderHeader('/about');
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
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Our Story &amp; Purpose</span>
        <h1 class="page-header-title">About EDEXORA</h1>
        <p class="page-header-subtitle">
          Dedicated to providing personalised, one-to-one academic and supplementary learning that adapts to each student's unique needs.
        </p>
      </div>
    </section>

    <!-- Section: About EDEXORA -->
    <section class="section section-alt">
      <div class="container">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items:center;">
          <div>
            <span class="eyebrow">Who We Are</span>
            <h2 class="section-title">Personalised Learning for Every Student</h2>
            <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--color-text-secondary); margin-bottom: 20px;">
              ${CONFIG.brand.shortIntro}
            </p>
            <p style="font-size: 0.9375rem; line-height: 1.7; color: var(--color-text-secondary); margin-bottom: 28px;">
              We understand that every child has distinct strengths, learning speeds, and areas that require extra patience. Rather than group classrooms where individual doubts are easily overlooked, EDEXORA centers education around one-to-one mentorship tailored directly to the student.
            </p>
            <div style="display:flex; gap:16px; flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" data-open-demo>Book a Free Demo</button>
              <a href="/courses" class="btn btn-secondary">Explore Courses</a>
            </div>
          </div>
          <div>
            <div style="border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); border: 1px solid var(--color-border);">
              <img src="/assets/images/hero_online_learning.jpg" alt="Dedicated online tuition session with student and tutor" width="700" height="480" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section">
      <div class="container">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <!-- Mission -->
          <div style="background:#fff; border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:40px; position:relative; overflow:hidden;">
            <div style="width:48px; height:48px; border-radius:12px; background:var(--color-primary-yellow-light); display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px;">
              🎯
            </div>
            <span class="eyebrow">Our Mission</span>
            <h3 style="font-size: 1.5rem; font-weight:800; margin-bottom:14px; color:var(--color-black);">Making Quality Learning Accessible</h3>
            <p style="font-size:1.0625rem; line-height:1.65; color:var(--color-text-secondary);">
              “To make personalised learning accessible, supportive, and convenient for every student by connecting individual learning needs with suitable educational guidance.”
            </p>
          </div>

          <!-- Vision -->
          <div style="background:#fff; border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:40px; position:relative; overflow:hidden;">
            <div style="width:48px; height:48px; border-radius:12px; background:var(--color-primary-yellow-light); display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px;">
              🌟
            </div>
            <span class="eyebrow">Our Vision</span>
            <h3 style="font-size: 1.5rem; font-weight:800; margin-bottom:14px; color:var(--color-black);">Building Confidence &amp; Excellence</h3>
            <p style="font-size:1.0625rem; line-height:1.65; color:var(--color-text-secondary);">
              “To become a trusted online learning destination where students can strengthen their academic knowledge, develop language skills, and grow with confidence.”
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Approach -->
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Educational Philosophy</span>
          <h2 class="section-title">Our Learning Approach</h2>
          <p class="section-subtitle">
            How we translate our commitments into meaningful academic growth and personal confidence.
          </p>
        </div>

        <div class="commitments-grid">
          <div class="commitment-card">
            <div class="commitment-icon-wrap">👤</div>
            <h3 class="commitment-title">Personalised Learning</h3>
            <p class="commitment-desc">
              Instruction centered entirely around the student's unique pace, syllabus, and learning goals.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🔍</div>
            <h3 class="commitment-title">Attention to Individual Needs</h3>
            <p class="commitment-desc">
              Immediate doubt clearing, patient step-by-step concept explanations, and targeted revision for challenging topics.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">📅</div>
            <h3 class="commitment-title">Flexible Learning Arrangements</h3>
            <p class="commitment-desc">
              Scheduling designed around school timetables and family routines across IST and Gulf timezones.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">💬</div>
            <h3 class="commitment-title">Communication with Parents</h3>
            <p class="commitment-desc">
              Transparent, ongoing dialogue on student progress, attendance, and areas of improvement via WhatsApp.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">📖</div>
            <h3 class="commitment-title">Holistic Learning Options</h3>
            <p class="commitment-desc">
              Consistent quality whether seeking school syllabus tuition, foundational Madrasa studies, or new language skills.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">💻</div>
            <h3 class="commitment-title">Comfortable Online Environment</h3>
            <p class="commitment-desc">
              High-convenience live sessions via Google Meet or Zoom, eliminating travel stress and saving valuable study time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-banner-title">Let’s Find the Right Learning Path for Your Child.</h2>
          <p class="cta-banner-desc">
            Tell us what your child needs, and connect with EDEXORA to explore suitable learning options.
          </p>
          <div class="cta-banner-actions">
            <button type="button" class="btn btn-primary btn-lg" data-open-demo>
              Book a Free Demo
            </button>
            <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              Contact Us on WhatsApp
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

module.exports = renderAboutPage;
