# EDEXORA — From Learning to Excellence
## Production Website Handover & Operations Manual

Welcome to the official production website codebase for **EDEXORA** (`From Learning to Excellence`).

This document provides complete instructions for running, configuring, deploying, maintaining, and handing over the website.

---

## 1. Project Overview & Architecture

- **Brand:** EDEXORA
- **Tagline:** From Learning to Excellence
- **Core Offering:** Personalised one-to-one online tuition for School Education (KG to Class 10: Kerala State, CBSE, ICSE), Madrasa Education, and Languages (English, Malayalam, Hindi, Arabic, Urdu).
- **Primary Audience:** Students & parents in Kerala and Malayali families living in Gulf countries (UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain).
- **Tech Stack:**
  - Semantic HTML5, Modular CSS3 (Custom Properties & Design Tokens), Vanilla JavaScript (Zero client framework bloat, instant First Contentful Paint).
  - Lightweight, robust Node.js server (`server.js`) with built-in routing, security headers, IP rate limiting, honeypot anti-spam protection, and Google Sheets webhook proxying.
  - Multi-page Static Site Generator (`src/build.js`) that produces clean HTML files and clean URL folders (`/about`, `/school-tuition`, `/madrasa-education`, etc.) for zero-config deployment on Vercel, Netlify, Cloudflare Pages, cPanel, or Apache/Nginx.
  - **Zero external runtime dependencies**: Starts immediately on any Node 18+ runtime without fragile package downloads.

---

## 2. Directory Structure

```text
EDEXORA online academy/
├── edexora logo.jpeg            # Official brand logo master asset
├── google-apps-script.js        # Google Sheets integration script (ready to deploy)
├── server.js                    # Node.js production server & enquiry proxy
├── package.json                 # Project configuration & npm scripts
├── vercel.json                  # Zero-configuration Vercel deployment spec
├── netlify.toml                 # Netlify deployment configuration
├── .env.example                 # Environment variables template
├── test.js                      # Automated test suite (85+ test assertions)
├── HANDOVER.md                  # This handover & operations guide
│
├── src/                         # Source templates & components
│   ├── config.js                # Central brand, contact & integration configuration
│   ├── build.js                 # Static generator for all 9 pages, sitemap & robots
│   ├── components/
│   │   ├── Header.js            # Responsive navigation & Book Free Demo button
│   │   ├── Footer.js            # Global footer with official links & legal items
│   │   ├── FloatingWhatsApp.js  # Fixed green floating WhatsApp button on every page
│   │   ├── DemoModal.js         # Interactive Free Demo request modal & drawer
│   │   ├── EnquiryForm.js       # Student enquiry form with conditional logic
│   │   └── Meta.js              # SEO tags, OpenGraph & JSON-LD structured data
│   └── pages/
│       ├── home.js              # Home page (8 distinct sections)
│       ├── about.js             # About Us (Mission, Vision, Approach)
│       ├── schoolTuition.js     # School Tuition (Kerala State, CBSE, ICSE)
│       ├── madrasaEducation.js  # Madrasa Education (Quran, Tajweed, Islamic Studies)
│       ├── languageLearning.js  # Language Learning (5 languages)
│       ├── courses.js           # Interactive Course Discovery & Filters
│       ├── contact.js           # Contact Us (WhatsApp, Instagram, Socials)
│       ├── privacyPolicy.js     # Privacy Policy (Parental consent, Data safety)
│       └── terms.js             # Terms & Conditions (Tuition guidelines, Class delivery)
│
├── public/                      # Production-ready public files
│   ├── index.html               # Home page
│   ├── about.html & /about/     # Clean URL route
│   ├── school-tuition.html      # School Tuition route
│   ├── madrasa-education.html   # Madrasa Education route
│   ├── language-learning.html   # Language Learning route
│   ├── courses.html             # Courses route
│   ├── contact.html             # Contact route
│   ├── privacy-policy.html      # Privacy Policy route
│   ├── terms.html               # Terms route
│   ├── sitemap.xml              # Search engine XML sitemap
│   ├── robots.txt               # Crawler directives
│   ├── _redirects               # Netlify/Static clean URL redirects
│   └── assets/
│       ├── css/style.css        # Premium Yellow/Black design stylesheet
│       ├── js/main.js           # Interactive forms, modals & accordions
│       ├── js/config.js         # Browser-safe configuration
│       └── images/              # Optimized photography & official logo
│
└── data/
    └── enquiries-backup.jsonl   # Secure server-side enquiry backup log
```

---

## 3. How to Run Locally

### Prerequisites
Node.js 18 or higher.

### Steps
1. Open PowerShell or Terminal in the project root:
   ```powershell
   # Run the automated test suite:
   node test.js

   # Start the production server:
   node server.js
   ```
2. Open your browser to `http://localhost:3000`.

---

## 4. How to Build the Website

Whenever you edit page copy in `src/pages/` or configuration in `src/config.js`, run:
```powershell
node src/build.js
```
This automatically updates all HTML pages in `public/`, regenerates clean URL routes, updates `public/sitemap.xml`, and updates `public/robots.txt`.

---

## 5. Google Sheets Integration Setup (Step-by-Step)

The website is designed to store student enquiries directly into a secure Google Sheet without requiring an expensive database or complex admin dashboard.

### Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://sheets.new) while logged into EDEXORA's official Google account.
2. Name the spreadsheet: **`EDEXORA Enquiries`**.

### Step 2: Add the Apps Script Code
1. In the Google Sheet top menu, click **Extensions** > **Apps Script**.
2. Erase any code inside `Code.gs`.
3. Open [`google-apps-script.js`](file:///c:/Users/ASUS/Downloads/EDEXORA%20online%20academy/google-apps-script.js) from this repository, copy its entire contents, and paste it into the Apps Script editor.
4. Click the **Save** icon (Floppy disk).

### Step 3: Initialize Headers
1. In the toolbar dropdown next to "Debug", select the function **`setupSheetHeaders`**.
2. Click **Run**.
3. Google will ask for permission ("Authorization Required"). Click **Review Permissions**, select your account, click **Advanced**, and click **Go to Untitled project (unsafe)** (standard for your own scripts), then click **Allow**.
4. Check your Google Sheet: A sheet named `Enquiries` will appear with yellow headers:
   - `Submission ID`
   - `Submission Date & Time`
   - `Enquiry Type`
   - `Parent Name`
   - `Student Name`
   - `WhatsApp Number`
   - `Learning Interest`
   - `Class`
   - `Curriculum`
   - `Subject or Language`
   - `Preferred Time`
   - `Consent Status`

### Step 4: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description:** `EDEXORA Website Enquiry Webhook`
   - **Execute as:** `Me (your Google email)`
   - **Who has access:** `Anyone` (this allows the website server to post enquiries to your sheet)
4. Click **Deploy**.
5. Copy the **Web app URL** (format: `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5: Connect URL to Website
- For local server: Set in `.env`:
  ```env
  GOOGLE_SCRIPT_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
  ```
- Or set in `src/config.js` under `integrations.googleScriptWebAppUrl`.
- Rebuild (`node src/build.js`) and start (`node server.js`).

> **Zero Lost Enquiries Guarantee:** Even if the Google Sheets Webhook is not yet configured or Google experiences downtime, all submissions are automatically and safely backed up to `data/enquiries-backup.jsonl` on the server, AND the user is immediately provided with a prefilled WhatsApp link to message EDEXORA directly.

---

## 6. How to Deploy to Hosting

You can deploy EDEXORA using any of the following standard hosting methods:

### Option A: Vercel (Recommended — Free & Instant)
1. Push this project to GitHub (or import the folder directly).
2. Connect your repository on [vercel.com](https://vercel.com).
3. The included `vercel.json` automatically configures clean URLs and security headers.
4. Add the Environment Variable in Vercel project settings:
   - `GOOGLE_SCRIPT_WEBAPP_URL`: Your Apps Script Web App URL.
5. Click **Deploy**.

### Option B: Netlify
1. Connect the repository to [netlify.com](https://netlify.com).
2. Build command: `node src/build.js`
3. Publish directory: `public`
4. The included `netlify.toml` and `public/_redirects` automatically configure clean routing.
5. Click **Deploy**.

### Option C: Traditional Shared Hosting (cPanel / Hostinger / Apache / Nginx)
1. Run `node src/build.js`.
2. Upload everything inside the `public/` directory directly into your web root (`public_html`).
3. Because `src/build.js` generates both `about.html` and `/about/index.html`, clean URLs work out-of-the-box on Apache and Nginx without server configuration!

---

## 7. Customizing Social Links & Placeholders

All contact values and social media handles are stored centrally in `src/config.js`:

```javascript
contact: {
  whatsappNumber: '+91 95261 80016',
  whatsappRaw: '919526180016',
  instagram: 'https://www.instagram.com/edexora',

  // Replace placeholders once URLs are active:
  facebookPageUrl: 'https://facebook.com/your-page',
  whatsappChannelUrl: 'https://whatsapp.com/channel/your-channel',
  ownerEmail: 'contact@edexora.com'
}
```

- When `facebookPageUrl` or `whatsappChannelUrl` is empty, the website gracefully hides them from the public UI so visitors never see broken or placeholder links.
- After updating values, run `node src/build.js` to compile the changes across all pages.

---

## 8. Adding Real Parent & Student Testimonials

In accordance with our strict brand integrity guidelines, **no fake reviews or fabricated testimonials are published**.

Once real parent or student reviews have been collected and approved for public use:
1. Open `src/config.js`.
2. Add the reviews to `CONFIG.testimonials.items`:
   ```javascript
   testimonials: {
     showPlaceholderInDev: false,
     items: [
       {
         id: 'rev-01',
         reviewerName: 'Amina S. (Parent)',
         reviewerLocation: 'Sharjah, UAE',
         courseCategory: 'Class 8 CBSE Tuition',
         reviewText: 'EDEXORA’s one-to-one tuition helped my daughter regain her confidence in mathematics. The tutor was exceptionally patient.'
       }
     ]
   }
   ```
3. Run `node src/build.js`. The testimonials section will automatically render on the Home page.

---

## 9. SEO & Domain Configuration

### Setting Up a Custom Domain (e.g. `edexora.com`)
1. Purchase the domain from any registrar (e.g. Namecheap, GoDaddy, Google Domains / Squarespace).
2. Update `CONFIG.seo.siteUrl` in `src/config.js`:
   ```javascript
   seo: {
     siteUrl: 'https://www.edexora.com',
     ...
   }
   ```
3. Run `node src/build.js` to refresh the `sitemap.xml`, `robots.txt`, and canonical tags.
4. In your registrar DNS, point your domain:
   - For Vercel: Add `CNAME` pointing to `cname.vercel-dns.com` or `A` record to `76.76.21.21`.
   - Enable free SSL/HTTPS in your host's dashboard.

---

## 10. Service Access & Handover Checklist

For the handover to the founder (`EDEXORA_OWNER_EMAIL`), grant least-privilege shared access using this checklist:

- [ ] **Google Sheets Access:**
  - Share the `EDEXORA Enquiries` spreadsheet with the founder's Google account with "Editor" access.
- [ ] **Hosting Account Access:**
  - Invite the founder's email as an administrator or team member on Vercel / Netlify / cPanel.
- [ ] **Domain Management:**
  - Ensure the domain account is registered under or transferred to the founder's email.
- [ ] **Instagram Account:**
  - Retain login access for `https://www.instagram.com/edexora`.
- [ ] **WhatsApp Business Account:**
  - Administered via the registered SIM for `+91 95261 80016`.
- [ ] **Source Code Repository:**
  - Transfer or grant collaborator access on GitHub / GitLab.

---

## 11. Security & Compliance Summary

1. **No Sensitive Child Data:** Forms only collect contact and curriculum preferences necessary for scheduling a trial.
2. **Zero Client Secret Exposure:** No Google API keys, database credentials, or private tokens exist in client JavaScript.
3. **Spam & Abuse Protection:**
   - Honeypot bot trap field on all forms.
   - Server-side IP rate limiting (15 requests / 5 minutes).
   - Strict 50KB payload cap.
4. **Security Headers:** Configured for `nosniff`, `SAMEORIGIN`, and strict referrer policy.
5. **Accessibility:** WCAG AA/AAA compliant color contrast, visible focus rings, ARIA dialog roles, screen reader skip links, and reduced-motion preferences.
