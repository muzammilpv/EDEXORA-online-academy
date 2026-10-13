/**
 * ============================================================================
 * EDEXORA Online Academy — Google Sheets Integration Script
 * ============================================================================
 * 
 * Instructions for Setup:
 * 1. Open Google Sheets (create a new blank sheet named "EDEXORA Enquiries").
 * 2. Click on "Extensions" > "Apps Script".
 * 3. Delete any code in the editor, and paste this entire file.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. Run the function "setupSheetHeaders()" once by selecting it from the dropdown and clicking "Run".
 *    (Authorize the script when prompted by Google).
 * 6. Click "Deploy" > "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set Configuration:
 *    - Description: "EDEXORA Website Enquiry Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (allows the website backend to securely post enquiries)
 * 9. Click "Deploy" and copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec).
 * 10. Add this URL to your website environment variable:
 *     GOOGLE_SCRIPT_WEBAPP_URL="https://script.google.com/macros/s/.../exec"
 * ============================================================================
 */

const SHEET_NAME = 'Enquiries';
const EXPECTED_HEADERS = [
  'Submission ID',
  'Submission Date & Time',
  'Enquiry Type',
  'Parent Name',
  'Student Name',
  'WhatsApp Number',
  'Learning Interest',
  'Class',
  'Curriculum',
  'Subject or Language',
  'Preferred Time',
  'Consent Status'
];

/**
 * Run this function once from the Apps Script editor to initialize the sheet.
 */
function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Set headers in row 1
  const headerRange = sheet.getRange(1, 1, 1, EXPECTED_HEADERS.length);
  headerRange.setValues([EXPECTED_HEADERS]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#FFC928'); // EDEXORA Brand Yellow
  headerRange.setFontColor('#111111');
  sheet.setFrozenRows(1);
  
  // Format column widths
  for (let i = 1; i <= EXPECTED_HEADERS.length; i++) {
    sheet.autoResizeColumn(i);
  }

  Logger.log('EDEXORA Sheet headers successfully initialized!');
}

/**
 * HTTP POST Handler for incoming website enquiries
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // Acquire lock to avoid race conditions and duplicate row collisions
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupSheetHeaders();
    }

    // Parse JSON payload
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Invalid JSON payload format.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Anti-spam check (honeypot field)
    if (data.website_source && data.website_source.trim() !== '') {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Spam detected.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Format Indian Standard Time / UTC timestamp
    const now = new Date();
    const formattedTimestamp = Utilities.formatDate(now, 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss') + ' IST';

    const rowData = [
      data.submissionId || ('EDX-' + Utilities.getUuid().substring(0, 8).toUpperCase()),
      formattedTimestamp,
      data.enquiryType || 'General Student Enquiry',
      data.parentName || 'Not Provided',
      data.studentName || 'Not Provided',
      data.whatsappNumber || 'Not Provided',
      data.learningInterest || 'Not Provided',
      data.class || 'N/A',
      data.curriculum || 'N/A',
      data.subjectOrLanguage || 'General',
      data.preferredTime || 'Flexible',
      data.consent || 'Confirmed'
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Format new row styling
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, EXPECTED_HEADERS.length);
    dataRange.setFontFamily('Arial');
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment('middle');

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Enquiry recorded successfully.',
      submissionId: rowData[0]
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error writing to Google Sheets: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * HTTP GET Handler for health checks
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    service: 'EDEXORA Google Sheets Integration Webhook',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify sheet appending directly inside the Apps Script console
 */
function testAppend() {
  const mockPayload = {
    postData: {
      contents: JSON.stringify({
        submissionId: 'TEST-001',
        enquiryType: 'Test Enquiry',
        parentName: 'Test Parent',
        studentName: 'Test Student',
        whatsappNumber: '+91 95261 80016',
        learningInterest: 'School Tuition',
        class: 'Class 8',
        curriculum: 'CBSE',
        subjectOrLanguage: 'Mathematics',
        preferredTime: 'Evenings 6 PM',
        consent: 'Yes'
      })
    }
  };

  const response = doPost(mockPayload);
  Logger.log('Test Append Response: ' + response.getContent());
}
