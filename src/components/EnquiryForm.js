const CONFIG = require('../config');

function renderEnquiryForm({ formId = 'mainEnquiryForm', defaultInterest = 'School Tuition' } = {}) {
  return `
  <div class="enquiry-card">
    <div style="margin-bottom: 24px;">
      <span class="eyebrow">Personalised Learning Enquiry</span>
      <h3 class="section-title" style="font-size: 1.85rem; margin-bottom: 8px;">Start Your Learning Journey</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.9375rem; line-height: 1.5;">
        Tell us about your learning goals. Our team will contact you directly on WhatsApp to discuss personalised options, teacher suitability, and schedules.
      </p>
    </div>

    <form id="${formId}" class="student-enquiry-form" novalidate>
      <!-- Anti-Spam Honeypot Field -->
      <div class="honeypot-field" aria-hidden="true">
        <label for="${formId}_website_source">Leave this blank</label>
        <input type="text" id="${formId}_website_source" name="website_source" tabindex="-1" autocomplete="off">
      </div>

      <div class="form-grid">
        <!-- 1. Learning Interest (Mandatory Selector) -->
        <div class="form-group col-full">
          <label class="form-label">
            Learning Interest <span class="req">*</span>
          </label>
          <div class="interest-options">
            <label class="interest-radio-label">
              <input type="radio" name="learningInterest" value="School Tuition" class="interest-radio-input" ${defaultInterest === 'School Tuition' ? 'checked' : ''}>
              <span>School Tuition (KG - 10)</span>
            </label>

            <label class="interest-radio-label">
              <input type="radio" name="learningInterest" value="Madrasa Education" class="interest-radio-input" ${defaultInterest === 'Madrasa Education' ? 'checked' : ''}>
              <span>Madrasa Education</span>
            </label>

            <label class="interest-radio-label">
              <input type="radio" name="learningInterest" value="Both — School Tuition and Madrasa Education" class="interest-radio-input" ${defaultInterest === 'Both' ? 'checked' : ''}>
              <span>Both — School &amp; Madrasa</span>
            </label>

            <label class="interest-radio-label">
              <input type="radio" name="learningInterest" value="Language Learning" class="interest-radio-input" ${defaultInterest === 'Language Learning' ? 'checked' : ''}>
              <span>Language Learning</span>
            </label>
          </div>
        </div>

        <!-- 2. Student Name -->
        <div class="form-group col-full">
          <label class="form-label" for="${formId}_studentName">
            Student Name <span class="req">*</span>
          </label>
          <input type="text" id="${formId}_studentName" name="studentName" class="form-input" placeholder="e.g. Aadhil, Fatima, Kevin" required>
          <span class="form-error"></span>
        </div>

        <!-- 3. WhatsApp Number with Country Code -->
        <div class="form-group col-full">
          <label class="form-label" for="${formId}_whatsappNumber">
            WhatsApp Number <span class="req">*</span>
          </label>
          <div class="phone-input-group">
            <select name="countryCode" class="phone-code-select" aria-label="Country Code">
              <option value="+91" selected>🇮🇳 +91 (India)</option>
              <option value="+971">🇦🇪 +971 (UAE)</option>
              <option value="+966">🇸🇦 +966 (KSA)</option>
              <option value="+974">🇶🇦 +974 (Qatar)</option>
              <option value="+968">🇴🇲 +968 (Oman)</option>
              <option value="+965">🇰🇼 +965 (Kuwait)</option>
              <option value="+973">🇧🇭 +973 (Bahrain)</option>
              <option value="+44">🇬🇧 +44 (UK)</option>
              <option value="+1">🇺🇸 +1 (US)</option>
            </select>
            <input type="tel" id="${formId}_whatsappNumber" name="whatsappNumber" class="form-input" placeholder="e.g. 95261 80016" required>
          </div>
          <span class="form-error"></span>
          <span class="form-hint">We will connect with you on this WhatsApp number to confirm availability and demo.</span>
        </div>

        <!-- 4. Conditional: School Curriculum (Kerala State, CBSE, ICSE) -->
        <div class="form-group conditional-curriculum">
          <label class="form-label" for="${formId}_curriculum">
            Curriculum <span class="req">*</span>
          </label>
          <select id="${formId}_curriculum" name="curriculum" class="form-select">
            <option value="Kerala State" selected>Kerala State Syllabus</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
          </select>
        </div>

        <!-- 5. Conditional: Class Level -->
        <div class="form-group conditional-class">
          <label class="form-label" for="${formId}_studentClass">
            Class Level <span class="req">*</span>
          </label>
          <select id="${formId}_studentClass" name="studentClass" class="form-select">
            <option value="Kindergarten (KG)">Kindergarten (KG)</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
        </div>

        <!-- 6. Conditional: School Subject -->
        <div class="form-group conditional-school-subject col-full">
          <label class="form-label" for="${formId}_schoolSubject">
            Subjects Needed
          </label>
          <input type="text" id="${formId}_schoolSubject" name="schoolSubject" class="form-input" placeholder="e.g. Mathematics, Science, Social Science, English, etc.">
          <span class="form-hint">Subject availability is confirmed by EDEXORA based on teacher match.</span>
        </div>

        <!-- 7. Conditional: Madrasa Learning Requirements -->
        <div class="form-group conditional-madrasa-requirements col-full" style="display: none;">
          <label class="form-label" for="${formId}_madrasaRequirements">
            Madrasa Learning Focus
          </label>
          <input type="text" id="${formId}_madrasaRequirements" name="madrasaRequirements" class="form-input" placeholder="e.g. Quran Reading, Tajweed &amp; Recitation, Islamic Studies">
          <span class="form-hint">Madrasa learning is tailored to student's age, baseline understanding, and goals.</span>
        </div>

        <!-- 8. Conditional: Language Learning Selection -->
        <div class="form-group conditional-language col-full" style="display: none;">
          <label class="form-label" for="${formId}_language">
            Language to Learn <span class="req">*</span>
          </label>
          <select id="${formId}_language" name="language" class="form-select">
            <option value="English" selected>English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="Arabic">Arabic</option>
            <option value="Urdu">Urdu</option>
          </select>
          <span class="form-hint">Current fluency level and syllabus will be discussed during initial consultation.</span>
        </div>


        <!-- 10. Consent Notice -->
        <div class="form-group col-full">
          <label class="consent-group">
            <input type="checkbox" name="consent" class="consent-checkbox" required checked>
            <span>
              I agree to allow EDEXORA to contact me on WhatsApp regarding this tuition enquiry in accordance with the 
              <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.
            </span>
          </label>
        </div>

        <!-- Submit Button -->
        <div class="form-group col-full" style="margin-top: 8px;">
          <button type="submit" class="btn btn-primary btn-block btn-lg">
            Submit Enquiry &amp; Connect on WhatsApp
          </button>
        </div>
      </div>
    </form>
  </div>
  `;
}

module.exports = renderEnquiryForm;
