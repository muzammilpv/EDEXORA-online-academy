/**
 * EDEXORA — From Learning to Excellence
 * Production Node.js Server & Secure API Proxy
 */

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const CONFIG = require('./src/config');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Rate Limiter: IP -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(ip) {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8'
};

// Security Headers
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

// Clean URL Route Map
const ROUTE_MAP = {
  '/': 'index.html',
  '/about': 'about.html',
  '/school-tuition': 'school-tuition.html',
  '/madrasa-education': 'madrasa-education.html',
  '/language-learning': 'language-learning.html',
  '/courses': 'courses.html',
  '/contact': 'contact.html',
  '/privacy-policy': 'privacy-policy.html',
  '/terms': 'terms.html'
};

const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';
  const method = req.method.toUpperCase();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // 1. API: Health Check
  if (pathname === '/api/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      brand: CONFIG.brand.name,
      uptime: process.uptime(),
      googleScriptConfigured: Boolean(CONFIG.integrations.googleScriptWebAppUrl),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. API: Student Enquiry & Demo Submission
  if (pathname === '/api/enquiry' && method === 'POST') {
    // Check Rate Limit
    if (!checkRateLimit(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        message: 'Too many submissions from this connection. Please try again after a few minutes.'
      }));
      return;
    }

    // Limit Payload Size to 50KB
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Payload too large.' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');

        // Honeypot Spam Protection
        if (payload.website_source && payload.website_source.trim() !== '') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Received' }));
          return;
        }

        // Server-Side Input Validation
        const studentName = (payload.studentName || '').trim();
        const whatsappNumber = (payload.whatsappNumber || '').trim();
        const learningInterest = (payload.learningInterest || '').trim();

        if (!studentName || studentName.length < 2) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Student Name is required (minimum 2 characters).' }));
          return;
        }

        if (!whatsappNumber || whatsappNumber.replace(/\D/g, '').length < 7) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Valid WhatsApp number is required.' }));
          return;
        }

        // Sanitized Submission Object
        const sanitizedSubmission = {
          submissionId: payload.submissionId || ('EDX-' + Date.now().toString(36).toUpperCase()),
          timestamp: new Date().toISOString(),
          enquiryType: payload.enquiryType || 'General Student Enquiry',
          parentName: (payload.parentName || 'Not Provided').substring(0, 100),
          studentName: studentName.substring(0, 100),
          whatsappNumber: whatsappNumber.substring(0, 30),
          learningInterest: learningInterest || 'School Tuition',
          class: (payload.class || 'N/A').substring(0, 50),
          curriculum: (payload.curriculum || 'N/A').substring(0, 50),
          subjectOrLanguage: (payload.subjectOrLanguage || 'General').substring(0, 200),
          preferredTime: (payload.preferredTime || 'Flexible').substring(0, 100),
          consent: payload.consent || 'Confirmed'
        };

        // Always save to secure local backup log
        const backupFile = path.join(DATA_DIR, 'enquiries-backup.jsonl');
        fs.appendFileSync(backupFile, JSON.stringify(sanitizedSubmission) + '\n', 'utf-8');

        // Check if Google Apps Script Webhook is configured
        const googleScriptUrl = CONFIG.integrations.googleScriptWebAppUrl;

        if (googleScriptUrl && googleScriptUrl.startsWith('https://script.google.com')) {
          try {
            const googleRes = await fetch(googleScriptUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sanitizedSubmission)
            });

            const googleData = await googleRes.json().catch(() => ({}));
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              message: 'Enquiry recorded successfully to Google Sheets.',
              submissionId: sanitizedSubmission.submissionId,
              googleResponse: googleData
            }));
            return;
          } catch (googleError) {
            console.error('Failed to forward to Google Sheets:', googleError.message);
            // Even if Google fails, our local backup succeeded
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              mode: 'local_backup_only',
              message: 'Enquiry recorded to local system. Google Sheets webhook was unreachable.',
              submissionId: sanitizedSubmission.submissionId
            }));
            return;
          }
        } else {
          // No Google URL configured yet (development / pre-configuration)
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            mode: 'local_backup',
            message: 'Enquiry saved to local system. Configure GOOGLE_SCRIPT_WEBAPP_URL to sync with Google Sheets.',
            submissionId: sanitizedSubmission.submissionId
          }));
          return;
        }

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Server error processing enquiry.' }));
      }
    });
    return;
  }

  // 3. Clean Route Resolution
  let targetFilePath = null;

  if (ROUTE_MAP[pathname]) {
    targetFilePath = path.join(PUBLIC_DIR, ROUTE_MAP[pathname]);
  } else {
    // Check static files in PUBLIC_DIR
    const safePath = path.normalize(decodeURIComponent(parsedUrl.pathname)).replace(/^(\.\.[\/\\])+/, '');
    const candidate = path.join(PUBLIC_DIR, safePath);

    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      targetFilePath = candidate;
    } else if (fs.existsSync(candidate + '.html')) {
      targetFilePath = candidate + '.html';
    } else if (fs.existsSync(path.join(candidate, 'index.html'))) {
      targetFilePath = path.join(candidate, 'index.html');
    }
  }

  // 4. Serve File if found
  if (targetFilePath && fs.existsSync(targetFilePath) && fs.statSync(targetFilePath).isFile()) {
    const ext = path.extname(targetFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Caching for static assets
    if (ext === '.css' || ext === '.js' || ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.svg') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(targetFilePath).pipe(res);
    return;
  }

  // 5. 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404 Page Not Found | EDEXORA</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body style="min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px;">
  <div style="max-width:500px;">
    <h1 style="font-size:3rem; font-weight:800; margin-bottom:12px;">404</h1>
    <h2 style="font-size:1.5rem; margin-bottom:16px;">Page Not Found</h2>
    <p style="color:#666; margin-bottom:24px;">The page you are looking for might have been moved or does not exist.</p>
    <a href="/" class="btn btn-primary">Return to EDEXORA Home</a>
  </div>
</body>
</html>`);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` EDEXORA — From Learning to Excellence`);
    console.log(` Production Server running at: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

module.exports = server;
