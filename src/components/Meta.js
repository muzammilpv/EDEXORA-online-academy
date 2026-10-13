const CONFIG = require('../config');

function renderMeta({ title, description, canonicalPath, schemaType = 'EducationalOrganization', structuredDataExtra = {} }) {
  const fullTitle = title ? `${title} | ${CONFIG.brand.name} — ${CONFIG.brand.tagline}` : CONFIG.seo.defaultTitle;
  const metaDesc = description || CONFIG.seo.defaultDescription;
  const canonicalUrl = `${CONFIG.seo.siteUrl}${canonicalPath || ''}`;
  const ogImage = `${CONFIG.seo.siteUrl}/assets/images/logo.jpeg`;

  // Base Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": CONFIG.brand.name,
    "slogan": CONFIG.brand.tagline,
    "description": CONFIG.brand.shortIntro,
    "url": CONFIG.seo.siteUrl,
    "logo": ogImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONFIG.contact.whatsappNumber,
      "contactType": "Customer Support",
      "availableLanguage": ["English", "Malayalam", "Hindi", "Arabic"]
    },
    ...structuredDataExtra
  };

  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="${CONFIG.seo.keywords.join(', ')}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:image" content="${ogImage}">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${metaDesc}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Favicon -->
  <link rel="icon" type="image/jpeg" href="/assets/images/logo.jpeg">
  <link rel="apple-touch-icon" href="/assets/images/logo.jpeg">

  <!-- Core CSS -->
  <link rel="stylesheet" href="/assets/css/style.css?v=2.2">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  `;
}

module.exports = renderMeta;
