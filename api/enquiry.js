const fs = require('fs');
const path = require('path');
const os = require('os');
const CONFIG = require('../src/config');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    return;
  }

  try {
    let payload = req.body;
    if (!payload || typeof payload === 'string') {
      if (typeof payload === 'string' && payload.length > 0) {
        payload = JSON.parse(payload);
      } else {
        const rawBody = await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', chunk => {
            data += chunk;
            if (data.length > 50 * 1024) {
              reject(new Error('Payload too large'));
            }
          });
          req.on('end', () => resolve(data));
          req.on('error', reject);
        });
        payload = JSON.parse(rawBody || '{}');
      }
    }

    // Honeypot Spam Protection
    if (payload.website_source && payload.website_source.trim() !== '') {
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, message: 'Received' }));
      return;
    }

    // Server-Side Input Validation
    const studentName = (payload.studentName || '').trim();
    const whatsappNumber = (payload.whatsappNumber || '').trim();
    const learningInterest = (payload.learningInterest || '').trim();

    if (!studentName || studentName.length < 2) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, message: 'Student Name is required (minimum 2 characters).' }));
      return;
    }

    if (!whatsappNumber || whatsappNumber.replace(/\D/g, '').length < 7) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, message: 'Valid WhatsApp number is required.' }));
      return;
    }

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

    // Safe backup log write (uses os.tmpdir() on serverless environments)
    try {
      const backupFile = path.join(os.tmpdir(), 'enquiries-backup.jsonl');
      fs.appendFileSync(backupFile, JSON.stringify(sanitizedSubmission) + '\n', 'utf-8');
    } catch (e) {
      // Ignore write error on read-only environments
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_WEBAPP_URL || CONFIG.integrations.googleScriptWebAppUrl;

    if (googleScriptUrl && googleScriptUrl.startsWith('https://script.google.com')) {
      try {
        const googleRes = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedSubmission)
        });
        const googleData = await googleRes.json().catch(() => ({}));

        res.statusCode = 200;
        res.end(JSON.stringify({
          success: true,
          message: 'Enquiry recorded successfully to Google Sheets.',
          submissionId: sanitizedSubmission.submissionId,
          googleResponse: googleData
        }));
        return;
      } catch (googleError) {
        res.statusCode = 200;
        res.end(JSON.stringify({
          success: true,
          mode: 'whatsapp_direct',
          message: 'Enquiry prepared for WhatsApp.',
          submissionId: sanitizedSubmission.submissionId
        }));
        return;
      }
    }

    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      mode: 'whatsapp_direct',
      message: 'Enquiry details prepared for WhatsApp.',
      submissionId: sanitizedSubmission.submissionId
    }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, message: 'Server error processing enquiry.' }));
  }
};
