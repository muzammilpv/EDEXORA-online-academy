const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');
const renderEnquiryForm = require('../components/EnquiryForm');

function renderHomePage() {
  const metaHtml = renderMeta({
    title: 'School & Madrasa Education in One Place',
    description: 'Personalised online learning designed around your child’s needs, learning goals, and schedule. One-to-one tuition for Kerala & Gulf families.',
    canonicalPath: '/'
  });

  const headerHtml = renderHeader('/');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();
  const enquiryFormHtml = renderEnquiryForm({ formId: 'homeEnquiryForm', defaultInterest: 'School Tuition' });

  // FAQ Accordion items
  const faqItemsHtml = CONFIG.faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'open' : ''}">
      <button class="faq-trigger" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="faq-desc-${index}">
        <span>${faq.question}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="faq-desc-${index}" class="faq-content" ${index === 0 ? 'style="max-height: 200px;"' : ''}>
        <div class="faq-body">
          <p>${faq.answer}</p>
        </div>
      </div>
    </div>
  `).join('\n');

  // Testimonials Handling
  const hasReviews = CONFIG.testimonials.items && CONFIG.testimonials.items.length > 0;
  const testimonialsHtml = hasReviews ? `
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Student &amp; Parent Experiences</span>
          <h2 class="section-title">What Families Say About EDEXORA</h2>
        </div>
        <div class="reviews-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px;">
          ${CONFIG.testimonials.items.map(rev => `
            <div class="review-card" style="background:#fff; border:1px solid #E5E5DF; border-radius:16px; padding:28px;">
              <p style="font-style:italic; margin-bottom:16px; color:#444;">"${rev.reviewText}"</p>
              <div style="font-weight:700; color:#111;">${rev.reviewerName}</div>
              <div style="font-size:0.8125rem; color:#777;">${rev.courseCategory || ''} • ${rev.reviewerLocation || ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : (CONFIG.testimonials.showPlaceholderInDev ? `
    <!-- Development Testimonials Placeholder (Hidden on production) -->
    <section class="section section-alt" style="border:1px dashed #d0d0c8;">
      <div class="container text-center">
        <span class="eyebrow">Testimonials Component Ready</span>
        <p style="color:#777;">Genuine student &amp; parent reviews will appear here once supplied by EDEXORA.</p>
      </div>
    </section>
  ` : '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaHtml}
</head>
<body>
  ${headerHtml}

  <main id="main-content">
    <!-- SECTION 1: HERO -->
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <span class="eyebrow">Personalised Online Tuition</span>
            <h1 class="hero-headline">
              School &amp; Madrasa Education <span class="highlight">in One Place</span>
            </h1>
            <p class="hero-supporting-copy">
              Personalised online learning designed around your child’s needs, learning goals, and schedule. Discover one-to-one educational support for school subjects, Madrasa studies, and language learning with EDEXORA.
            </p>

            <div class="hero-actions">
              <button type="button" class="btn btn-primary btn-lg" data-open-demo>
                Book a Free Demo
              </button>
              <a href="/courses" class="btn btn-secondary btn-lg">
                Explore Our Courses
              </a>
            </div>

            <div class="hero-trust-badges">
              <div class="trust-badge-item">
                <span class="trust-badge-icon">&#10003;</span>
                <span>1-on-1 Personalised Focus</span>
              </div>
              <div class="trust-badge-item">
                <span class="trust-badge-icon">&#10003;</span>
                <span>Kerala &amp; Gulf Timezones</span>
              </div>
              <div class="trust-badge-item">
                <span class="trust-badge-icon">&#10003;</span>
                <span>KG to Class 10</span>
              </div>
            </div>
          </div>

          <div class="hero-image-wrap">
            <div class="hero-image-card">
              <img src="/assets/images/hero_online_learning.jpg" 
                   alt="Student learning one-on-one in a modern online tuition session" 
                   class="hero-image"
                   width="800" 
                   height="550" 
                   loading="eager">
            </div>

            <!-- Floating Overlay Card -->
            <div class="hero-floating-pill">
              <div class="pill-icon">&#9733;</div>
              <div class="pill-text">
                <span class="pill-title">Dedicated One-to-One Attention</span>
                <span class="pill-desc">Live interactive classes via Meet or Zoom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: HIGHLIGHTED QUOTE (Immediately after Hero) -->
    <section class="quote-highlight-section">
      <div class="container quote-highlight-container">
        <span class="quote-badge">Our Learning Commitment</span>
        <blockquote class="quote-text">
          “<span class="accent-phrase">Choose Your Teacher.</span> <span class="accent-phrase">Choose Your Subject.</span> <span class="accent-phrase">Choose Your Time.</span>”
        </blockquote>
        <p class="quote-explanation">
          Every child learns at their own pace. At EDEXORA, our personalised approach connects individual learning requirements with flexible arrangements that fit your family’s routine.
        </p>
      </div>
    </section>

    <!-- SECTION 3: OUR LEARNING SERVICES -->
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Academic &amp; Supplementary Learning</span>
          <h2 class="section-title">Our Learning Services</h2>
          <p class="section-subtitle">
            Tailored educational guidance delivered through interactive one-to-one online classes for students in Kerala and Gulf families.
          </p>
        </div>

        <div class="services-grid">
          <!-- Service 1: School Tuition -->
          <article class="service-card">
            <div class="service-card-image-wrap">
              <img src="/assets/images/school_tuition.jpg" alt="Student receiving personalised school tuition" class="service-card-image" width="600" height="375" loading="lazy">
            </div>
            <span class="service-badge">KG to Class 10</span>
            <h3 class="service-title">School Tuition</h3>
            <p class="service-desc">
              KG to Class 10 with Kerala State, CBSE, and ICSE curriculum support. Individual attention for core subjects to strengthen conceptual clarity and exam performance.
            </p>
            <div class="service-tags">
              <span class="service-tag">Kerala State</span>
              <span class="service-tag">CBSE</span>
              <span class="service-tag">ICSE</span>
              <span class="service-tag">1-on-1 Guidance</span>
            </div>
            <div class="service-card-cta">
              <a href="/school-tuition" class="btn btn-primary btn-block">
                Explore School Tuition &rarr;
              </a>
            </div>
          </article>

          <!-- Service 2: Madrasa Education -->
          <article class="service-card">
            <div class="service-card-image-wrap">
              <img src="/assets/images/madrasa_education.jpg" alt="Student engaged in online Madrasa and Quran learning" class="service-card-image" width="600" height="375" loading="lazy">
            </div>
            <span class="service-badge">All Learning Stages</span>
            <h3 class="service-title">Madrasa Education</h3>
            <p class="service-desc">
              Personalised online Madrasa learning based on the student’s age, level, and learning requirements. Gentle, respectful guidance in Quran reading, Tajweed, and Islamic studies.
            </p>
            <div class="service-tags">
              <span class="service-tag">Quran Reading</span>
              <span class="service-tag">Tajweed &amp; Recitation</span>
              <span class="service-tag">Islamic Studies</span>
              <span class="service-tag">Individual Pace</span>
            </div>
            <div class="service-card-cta">
              <a href="/madrasa-education" class="btn btn-primary btn-block">
                Explore Madrasa Education &rarr;
              </a>
            </div>
          </article>

          <!-- Service 3: Language Learning -->
          <article class="service-card">
            <div class="service-card-image-wrap">
              <img src="/assets/images/language_learning.jpg" alt="Student learning a new language online" class="service-card-image" width="600" height="375" loading="lazy">
            </div>
            <span class="service-badge">5 Languages</span>
            <h3 class="service-title">Language Learning</h3>
            <p class="service-desc">
              Personalised learning in English, Malayalam, Hindi, Arabic, and Urdu. Build confidence in speaking, reading, grammar, and comprehension through one-to-one practice.
            </p>
            <div class="service-tags">
              <span class="service-tag">English</span>
              <span class="service-tag">Malayalam</span>
              <span class="service-tag">Hindi</span>
              <span class="service-tag">Arabic</span>
              <span class="service-tag">Urdu</span>
            </div>
            <div class="service-card-cta">
              <a href="/language-learning" class="btn btn-primary btn-block">
                Explore Languages &rarr;
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 4: WHY CHOOSE EDEXORA? -->
    <section class="section">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Our Commitments</span>
          <h2 class="section-title">Why Choose EDEXORA?</h2>
          <p class="section-subtitle">
            We focus on genuine learning progress through individual care, flexible timings, and dependable academic guidance.
          </p>
        </div>

        <div class="commitments-grid">
          <div class="commitment-card">
            <div class="commitment-icon-wrap">👤</div>
            <h3 class="commitment-title">Personalised One-to-One Learning</h3>
            <p class="commitment-desc">
              Every class is entirely dedicated to one student. No crowded batches, no unattended questions, and complete tutor focus.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🎯</div>
            <h3 class="commitment-title">Tailored Learning Support</h3>
            <p class="commitment-desc">
              Instruction adapted to your child’s current baseline, school syllabus, specific weaknesses, and personal pace.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">⏰</div>
            <h3 class="commitment-title">Flexible Scheduling</h3>
            <p class="commitment-desc">
              Timings arranged around your family’s availability, making learning stress-free alongside regular school hours.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">📚</div>
            <h3 class="commitment-title">All Under One Platform</h3>
            <p class="commitment-desc">
              Convenient access to school tuition, Madrasa education, and language studies from a single trusted educational partner.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">🌍</div>
            <h3 class="commitment-title">Options for Kerala &amp; Gulf Families</h3>
            <p class="commitment-desc">
              Designed specifically with timezones and curriculum needs of Malayali and Indian families in Kerala and Gulf countries in mind.
            </p>
          </div>

          <div class="commitment-card">
            <div class="commitment-icon-wrap">💻</div>
            <h3 class="commitment-title">Convenient Online Experience</h3>
            <p class="commitment-desc">
              Learn securely from home using standard interactive tools like Google Meet and Zoom with direct parent communication.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: HOW IT WORKS -->
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Simple 4-Step Process</span>
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">
            Getting started is simple. Our team handles the consultation to ensure the right teacher and schedule for your child.
          </p>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Choose Your Learning Interest</h3>
            <p class="step-desc">
              Select School Tuition (Kerala State, CBSE, ICSE), Madrasa Education, or Languages based on your child's needs.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Submit Your Enquiry</h3>
            <p class="step-desc">
              Fill in basic details about class level, preferred subjects, and schedule notes through our simple form.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Connect on WhatsApp</h3>
            <p class="step-desc">
              Our academic coordinator connects with you directly on WhatsApp (+91 95261 80016) to discuss requirements and teacher fit.
            </p>
          </div>

          <div class="step-card">
            <div class="step-number">4</div>
            <h3 class="step-title">Discuss Free Demo &amp; Confirm</h3>
            <p class="step-desc">
              Attend a free one-to-one trial session to experience the teaching style before confirming regular classes.
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- TESTIMONIALS SECTION -->
    ${testimonialsHtml}

    <!-- SECTION 7: FREQUENTLY ASKED QUESTIONS -->
    <section class="section section-alt">
      <div class="container">
        <div class="text-center">
          <span class="eyebrow">Clear Answers</span>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle">
            Everything you need to know about one-to-one classes, curricula, and how to get started.
          </p>
        </div>

        <div class="faq-list">
          ${faqItemsHtml}
        </div>
      </div>
    </section>

    <!-- SECTION 8: FINAL CTA -->
    <section class="section" style="padding-top: 0;">
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

module.exports = renderHomePage;
