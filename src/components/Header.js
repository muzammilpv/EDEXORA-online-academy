const CONFIG = require('../config');

function renderHeader(activePage = '') {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'School Tuition', path: '/school-tuition' },
    { label: 'Madrasa Education', path: '/madrasa-education' },
    { label: 'Language Learning', path: '/language-learning' },
    { label: 'Courses', path: '/courses' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const desktopNavHtml = navItems.map(item => {
    const isActive = (item.path === activePage || (item.path === '/' && activePage === 'home'));
    return `<a href="${item.path}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
  }).join('\n        ');

  const mobileNavHtml = navItems.map(item => {
    const isActive = (item.path === activePage || (item.path === '/' && activePage === 'home'));
    return `<a href="${item.path}" class="mobile-nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
  }).join('\n        ');

  return `
  <!-- Accessibility Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="header">
    <div class="container header-container">
      <!-- Official Brand Logo -->
      <a href="/" class="brand-link" aria-label="EDEXORA Homepage">
        <div class="brand-logo-wrap">
          <img src="${CONFIG.brand.logoPath}" alt="${CONFIG.brand.logoAlt}" class="brand-logo-img" width="48" height="48" loading="eager">
        </div>
        <div class="brand-text-wrap">
          <span class="brand-name">${CONFIG.brand.name}</span>
          <span class="brand-tagline">${CONFIG.brand.tagline}</span>
        </div>
      </a>

      <!-- Desktop Navigation Bar -->
      <nav class="nav-desktop" aria-label="Main Navigation">
        ${desktopNavHtml}
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <button type="button" class="btn btn-primary btn-sm" data-open-demo aria-haspopup="dialog">
          Book a Free Demo
        </button>

        <!-- Mobile Navigation Hamburger -->
        <button type="button" class="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div id="mobile-menu" class="mobile-nav-drawer" aria-label="Mobile Navigation">
    <nav class="mobile-nav-list">
      ${mobileNavHtml}
    </nav>
    <div class="mobile-nav-actions">
      <button type="button" class="btn btn-primary btn-block" data-open-demo>
        Book a Free Demo
      </button>
      <a href="${CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
        Connect on WhatsApp
      </a>
    </div>
  </div>
  `;
}

module.exports = renderHeader;
