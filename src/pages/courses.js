const CONFIG = require('../config');
const renderHeader = require('../components/Header');
const renderFooter = require('../components/Footer');
const renderFloatingWhatsApp = require('../components/FloatingWhatsApp');
const renderDemoModal = require('../components/DemoModal');
const renderMeta = require('../components/Meta');

function renderCoursesPage() {
  const metaHtml = renderMeta({
    title: 'Courses & Learning Programs — School, Madrasa & Languages',
    description: 'Explore personalised online courses at EDEXORA: School Tuition (KG to Class 10), Madrasa Education, and Languages (English, Malayalam, Hindi, Arabic, Urdu).',
    canonicalPath: '/courses'
  });

  const headerHtml = renderHeader('/courses');
  const footerHtml = renderFooter();
  const floatingWhatsAppHtml = renderFloatingWhatsApp();
  const demoModalHtml = renderDemoModal();

  // Course catalog items
  const courseItems = [
    {
      id: 'course-school-primary',
      title: 'School Tuition: Primary Foundation (KG – Class 4)',
      category: 'school',
      curriculum: 'Kerala State, CBSE, ICSE',
      class: 'KG, Class 1, Class 2, Class 3, Class 4',
      language: '',
      desc: 'One-to-one mentoring focusing on reading fundamentals, basic mathematics, phonics, and curiosity-driven primary learning.',
      image: '/assets/images/school_tuition.jpg',
      badge: 'KG to Class 4',
      link: '/school-tuition'
    },
    {
      id: 'course-school-middle',
      title: 'School Tuition: Middle School (Class 5 – Class 8)',
      category: 'school',
      curriculum: 'Kerala State, CBSE, ICSE',
      class: 'Class 5, Class 6, Class 7, Class 8',
      language: '',
      desc: 'Deep conceptual understanding across Mathematics, Science, and Social Studies aligned to Kerala State, CBSE, or ICSE syllabi.',
      image: '/assets/images/school_tuition.jpg',
      badge: 'Class 5 to 8',
      link: '/school-tuition'
    },
    {
      id: 'course-school-secondary',
      title: 'School Tuition: Secondary & Board Prep (Class 9 & 10)',
      category: 'school',
      curriculum: 'Kerala State, CBSE, ICSE',
      class: 'Class 9, Class 10',
      language: '',
      desc: 'Focused one-to-one revision, past paper practice, doubt clearing, and time management for Class 10 Board examinations.',
      image: '/assets/images/school_tuition.jpg',
      badge: 'Class 9 & 10',
      link: '/school-tuition'
    },
    {
      id: 'course-madrasa-quran',
      title: 'Online Madrasa: Quran Reading & Qaida',
      category: 'madrasa',
      curriculum: '',
      class: '',
      language: 'Arabic',
      desc: 'Step-by-step Arabic letter recognition, correct pronunciation (Makharij), and foundational Quran reading in a supportive setting.',
      image: '/assets/images/madrasa_education.jpg',
      badge: 'All Ages',
      link: '/madrasa-education'
    },
    {
      id: 'course-madrasa-tajweed',
      title: 'Online Madrasa: Recitation, Tajweed & Islamic Studies',
      category: 'madrasa',
      curriculum: '',
      class: '',
      language: 'Arabic',
      desc: 'Tajweed rules, melodic recitation practice, Surah memorization, daily Duas, and practical Islamic moral values.',
      image: '/assets/images/madrasa_education.jpg',
      badge: 'All Ages',
      link: '/madrasa-education'
    },
    {
      id: 'course-lang-english',
      title: 'Language Learning: English',
      category: 'language',
      curriculum: '',
      class: '',
      language: 'English',
      desc: 'One-to-one coaching in English grammar, conversational fluency, reading comprehension, and creative writing.',
      image: '/assets/images/language_learning.jpg',
      badge: 'English',
      link: '/language-learning'
    },
    {
      id: 'course-lang-malayalam',
      title: 'Language Learning: Malayalam',
      category: 'language',
      curriculum: '',
      class: '',
      language: 'Malayalam',
      desc: 'Designed for Gulf-based Malayali children to learn their mother tongue script, conversational vocabulary, and cultural context.',
      image: '/assets/images/language_learning.jpg',
      badge: 'Malayalam',
      link: '/language-learning'
    },
    {
      id: 'course-lang-arabic',
      title: 'Language Learning: Arabic',
      category: 'language',
      curriculum: '',
      class: '',
      language: 'Arabic',
      desc: 'School curriculum Arabic tuition for students in UAE, KSA, and Qatar, as well as foundational spoken Arabic.',
      image: '/assets/images/language_learning.jpg',
      badge: 'Arabic',
      link: '/language-learning'
    },
    {
      id: 'course-lang-hindi',
      title: 'Language Learning: Hindi',
      category: 'language',
      curriculum: '',
      class: '',
      language: 'Hindi',
      desc: 'CBSE and State syllabus second/third language support, Varnamala literacy, grammar, and spoken Hindi confidence.',
      image: '/assets/images/language_learning.jpg',
      badge: 'Hindi',
      link: '/language-learning'
    },
    {
      id: 'course-lang-urdu',
      title: 'Language Learning: Urdu',
      category: 'language',
      curriculum: '',
      class: '',
      language: 'Urdu',
      desc: 'Urdu alphabet mastery, reading simple texts, conversational expression, and cultural appreciation.',
      image: '/assets/images/language_learning.jpg',
      badge: 'Urdu',
      link: '/language-learning'
    }
  ];

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
        <span class="eyebrow">Academic Catalog</span>
        <h1 class="page-header-title">Our Courses &amp; Programs</h1>
        <p class="page-header-subtitle">
          Discover personalized one-to-one learning programs designed around your child's syllabus, grade level, and schedule.
        </p>
      </div>
    </section>

    <!-- Pricing Policy Banner -->
    <section style="background:var(--color-primary-yellow-light); border-bottom:1px solid rgba(255,201,40,0.3); padding:16px 0;">
      <div class="container">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.25rem;">ℹ️</span>
            <span style="font-size:0.90625rem; font-weight:600; color:var(--color-black);">
              Transparent Pricing: All course fees are provided through enquiry based on the selected subjects, weekly class frequency, and personalized schedule.
            </span>
          </div>
          <button type="button" class="btn btn-dark btn-sm" data-open-demo>
            Get Course Fee via WhatsApp
          </button>
        </div>
      </div>
    </section>

    <!-- Filter Bar & Grid -->
    <section class="section section-alt">
      <div class="container">
        <!-- Interactive Filter Controls -->
        <div class="filter-bar">
          <div class="filter-tabs" role="tablist">
            <button type="button" class="filter-tab-btn active" data-filter="all">All Programs</button>
            <button type="button" class="filter-tab-btn" data-filter="school">School Tuition</button>
            <button type="button" class="filter-tab-btn" data-filter="madrasa">Madrasa Education</button>
            <button type="button" class="filter-tab-btn" data-filter="language">Language Learning</button>
          </div>

          <div class="filter-selects">
            <!-- Curriculum Filter -->
            <select id="courseCurriculumFilter" class="filter-select" aria-label="Filter by curriculum">
              <option value="all">Curriculum: All</option>
              <option value="Kerala State">Kerala State</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
            </select>

            <!-- Language Filter -->
            <select id="courseLanguageFilter" class="filter-select" aria-label="Filter by language">
              <option value="all">Language: All</option>
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="Urdu">Urdu</option>
            </select>
          </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="services-grid" id="courseGrid">
          ${courseItems.map(item => `
            <article class="service-card course-card-item" 
                     data-category="${item.category}" 
                     data-curriculum="${item.curriculum}" 
                     data-class="${item.class}" 
                     data-language="${item.language}">
              <div class="service-card-image-wrap">
                <img src="${item.image}" alt="${item.title}" class="service-card-image" width="600" height="375" loading="lazy">
              </div>
              <span class="service-badge">${item.badge}</span>
              <h2 class="service-title" style="font-size:1.25rem;">${item.title}</h2>
              <p class="service-desc">${item.desc}</p>
              
              <div class="service-card-cta" style="display:flex; flex-direction:column; gap:8px;">
                <button type="button" class="btn btn-primary btn-block" data-open-demo data-demo-interest="${item.category === 'school' ? 'School Tuition' : (item.category === 'madrasa' ? 'Madrasa Education' : 'Language Learning')}">
                  Enquire for This Course
                </button>
                <a href="${item.link}" style="text-align:center; font-size:0.8125rem; font-weight:600; color:var(--color-text-secondary); padding:4px 0;">
                  Learn More &rarr;
                </a>
              </div>
            </article>
          `).join('\n')}
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <h2 class="cta-banner-title">Need Guidance Choosing a Course?</h2>
          <p class="cta-banner-desc">
            Connect with EDEXORA on WhatsApp (+91 95261 80016). We will evaluate your child's requirements and guide you to the ideal learning arrangement.
          </p>
          <div class="cta-banner-actions">
            <button type="button" class="btn btn-primary btn-lg" data-open-demo>
              Book a Free Demo
            </button>
            <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              Chat on WhatsApp
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

module.exports = renderCoursesPage;
