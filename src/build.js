/**
 * EDEXORA Static Site Generator & Build Script
 * Builds production-ready HTML pages, sitemap.xml, and robots.txt
 */

const fs = require('fs');
const path = require('path');
const CONFIG = require('./config');

const renderHomePage = require('./pages/home');
const renderAboutPage = require('./pages/about');
const renderSchoolTuitionPage = require('./pages/schoolTuition');
const renderMadrasaEducationPage = require('./pages/madrasaEducation');
const renderLanguageLearningPage = require('./pages/languageLearning');
const renderCoursesPage = require('./pages/courses');
const renderContactPage = require('./pages/contact');
const renderPrivacyPolicyPage = require('./pages/privacyPolicy');
const renderTermsPage = require('./pages/terms');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const pages = [
  { slug: '', file: 'index.html', renderer: renderHomePage, changefreq: 'weekly', priority: '1.0' },
  { slug: 'about', file: 'about.html', renderer: renderAboutPage, changefreq: 'monthly', priority: '0.8' },
  { slug: 'school-tuition', file: 'school-tuition.html', renderer: renderSchoolTuitionPage, changefreq: 'weekly', priority: '0.9' },
  { slug: 'madrasa-education', file: 'madrasa-education.html', renderer: renderMadrasaEducationPage, changefreq: 'weekly', priority: '0.9' },
  { slug: 'language-learning', file: 'language-learning.html', renderer: renderLanguageLearningPage, changefreq: 'weekly', priority: '0.9' },
  { slug: 'courses', file: 'courses.html', renderer: renderCoursesPage, changefreq: 'weekly', priority: '0.9' },
  { slug: 'contact', file: 'contact.html', renderer: renderContactPage, changefreq: 'monthly', priority: '0.8' },
  { slug: 'privacy-policy', file: 'privacy-policy.html', renderer: renderPrivacyPolicyPage, changefreq: 'yearly', priority: '0.3' },
  { slug: 'terms', file: 'terms.html', renderer: renderTermsPage, changefreq: 'yearly', priority: '0.3' }
];

function build() {
  console.log('--- Starting EDEXORA Build ---');

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Render and write HTML pages
  pages.forEach(p => {
    const htmlContent = p.renderer();

    // Write primary file (e.g. public/about.html)
    const filePath = path.join(PUBLIC_DIR, p.file);
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log(`[Built] ${p.file}`);

    // If subpage, also write directory index (e.g. public/about/index.html) for zero-config clean URL servers
    if (p.slug) {
      const dirPath = path.join(PUBLIC_DIR, p.slug);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(path.join(dirPath, 'index.html'), htmlContent, 'utf-8');
      console.log(`[Clean URL Route] /${p.slug}/index.html`);
    }
  });

  // 2. Generate XML Sitemap
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${CONFIG.seo.siteUrl}/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('[Built] sitemap.xml');

  // 3. Generate robots.txt
  const robotsTxt = `# EDEXORA Robots Configuration
User-agent: *
Allow: /

# Sitemap
Sitemap: ${CONFIG.seo.siteUrl}/sitemap.xml
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('[Built] robots.txt');

  console.log('--- Build Finished Successfully ---');
}

if (require.main === module) {
  build();
}

module.exports = build;
