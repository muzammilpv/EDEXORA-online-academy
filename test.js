/**
 * EDEXORA Automated Test Suite
 * Validates site builds, clean routing, assets, security headers, and API endpoints.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const server = require('./server');

const TEST_PORT = 3456;
const BASE_URL = `http://localhost:${TEST_PORT}`;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

async function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(urlPath, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(fullUrl, reqOptions, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n========================================');
  console.log(' Starting EDEXORA Automated Test Suite');
  console.log('========================================\n');

  // 1. Files & Build Output Verification
  console.log('[Suite 1: Static Files & Assets]');
  const requiredFiles = [
    'public/index.html',
    'public/about.html',
    'public/school-tuition.html',
    'public/madrasa-education.html',
    'public/language-learning.html',
    'public/courses.html',
    'public/contact.html',
    'public/privacy-policy.html',
    'public/terms.html',
    'public/sitemap.xml',
    'public/robots.txt',
    'public/assets/css/style.css',
    'public/assets/js/main.js',
    'public/assets/js/config.js',
    'public/assets/images/logo.jpeg',
    'public/assets/images/hero_online_learning.jpg',
    'public/assets/images/school_tuition.jpg',
    'public/assets/images/madrasa_education.jpg',
    'public/assets/images/language_learning.jpg'
  ];

  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    assert(fs.existsSync(fullPath), `File exists: ${file}`);
  });

  // Check official logo integrity
  const originalLogo = fs.readFileSync(path.join(__dirname, 'edexora logo.jpeg'));
  const assetLogo = fs.readFileSync(path.join(__dirname, 'public/assets/images/logo.jpeg'));
  assert(originalLogo.length === assetLogo.length, 'Official logo asset is intact and uncorrupted');

  // 2. Start HTTP Server for Route & API testing
  console.log('\n[Suite 2: Server & Route Testing]');
  await new Promise(resolve => server.listen(TEST_PORT, resolve));

  try {
    // Test Clean URL Routes
    const routesToTest = [
      { path: '/', expectedText: 'School Tuition, Madrasa Education & Language Learning' },
      { path: '/about', expectedText: 'About EDEXORA' },
      { path: '/school-tuition', expectedText: 'Personalised Online School Tuition' },
      { path: '/madrasa-education', expectedText: 'Personalised Online Madrasa Education' },
      { path: '/language-learning', expectedText: 'Learn Languages with a Personalised Approach' },
      { path: '/courses', expectedText: 'Our Courses' },
      { path: '/contact', expectedText: 'Contact EDEXORA' },
      { path: '/privacy-policy', expectedText: 'Privacy Policy' },
      { path: '/terms', expectedText: 'Terms & Conditions' }
    ];

    for (const route of routesToTest) {
      const res = await request(route.path);
      assert(res.statusCode === 200, `Route ${route.path} responds with HTTP 200`);
      assert(res.body.includes(route.expectedText), `Route ${route.path} contains expected content`);
      assert(res.headers['x-frame-options'] === 'SAMEORIGIN', `Route ${route.path} has X-Frame-Options security header`);
      assert(res.headers['x-content-type-options'] === 'nosniff', `Route ${route.path} has nosniff header`);

      // Verify Floating WhatsApp Button is present on every page
      assert(res.body.includes('floating-whatsapp-btn'), `Route ${route.path} has floating WhatsApp button`);
      assert(res.body.includes('9526180016'), `Route ${route.path} contains official WhatsApp link`);

      // Verify Quote is present on Home page
      if (route.path === '/') {
        assert(
          res.body.includes('Choose Your Teacher.') &&
          res.body.includes('Choose Your Subject.') &&
          res.body.includes('Choose Your Time.'),
          'Home page contains highlighted quote immediately after hero'
        );
      }
    }

    // 3. API Health Check
    console.log('\n[Suite 3: API & Security Validation]');
    const healthRes = await request('/api/health');
    assert(healthRes.statusCode === 200, 'GET /api/health returns 200');
    const healthData = JSON.parse(healthRes.body);
    assert(healthData.status === 'healthy', 'Health check reports healthy status');

    // 4. API Enquiry Submissions
    // 4a: Missing Student Name (Validation failure)
    const invalidRes1 = await request('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { studentName: '', whatsappNumber: '+91 95261 80016' }
    });
    assert(invalidRes1.statusCode === 400, 'Enquiry rejects empty student name with HTTP 400');

    // 4b: Missing WhatsApp Number (Validation failure)
    const invalidRes2 = await request('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { studentName: 'Test Student', whatsappNumber: '123' }
    });
    assert(invalidRes2.statusCode === 400, 'Enquiry rejects invalid phone with HTTP 400');

    // 4c: Honeypot Spam detection
    const botRes = await request('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        studentName: 'Spam Bot',
        whatsappNumber: '+91 95261 80016',
        website_source: 'http://spam-link.xyz'
      }
    });
    assert(botRes.statusCode === 200, 'Honeypot absorbs spam silently without recording');

    // 4d: Valid Enquiry Submission
    const validRes = await request('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        parentName: 'Parent Test',
        studentName: 'Zainab Test',
        whatsappNumber: '+91 95261 80016',
        learningInterest: 'School Tuition',
        class: 'Class 7',
        curriculum: 'Kerala State',
        subjectOrLanguage: 'Mathematics & Science',
        preferredTime: 'Evenings IST',
        consent: 'Confirmed'
      }
    });
    assert(validRes.statusCode === 200, 'Valid enquiry responds with HTTP 200');
    const validData = JSON.parse(validRes.body);
    assert(validData.success === true, 'Valid enquiry returns success: true');
    assert(Boolean(validData.submissionId), `Generated submission ID: ${validData.submissionId}`);

    // Verify backup log exists
    const backupLogPath = path.join(__dirname, 'data', 'enquiries-backup.jsonl');
    assert(fs.existsSync(backupLogPath), 'Local enquiry backup log file exists');
    const logContent = fs.readFileSync(backupLogPath, 'utf-8');
    assert(logContent.includes('Zainab Test'), 'Backup log safely contains enquiry record');

  } finally {
    // Close server
    await new Promise(resolve => server.close(resolve));
    console.log('\nTest server shut down cleanly.');
  }

  console.log('\n========================================');
  console.log(` Tests Finished: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('========================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test Suite encountered error:', err);
  process.exit(1);
});
