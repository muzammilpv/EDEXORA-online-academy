const CONFIG = require('../config');

function renderDemoModal() {
  return `
  <!-- Free Demo Booking Modal Dialog -->
  <div id="demoModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="demoModalTitle" aria-hidden="true">
    <div class="modal-dialog">
      <button type="button" class="modal-close-btn" data-close-demo aria-label="Close dialog">&times;</button>
      
      <div style="margin-bottom: 24px;">
        <span class="eyebrow">Personalised 1-on-1 Trial</span>
        <h2 id="demoModalTitle" class="section-title" style="font-size: 1.75rem; margin-bottom: 8px;">Book a Free Demo Class</h2>
        <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.5;">
          Experience how our personalized one-to-one tutoring works. Share your details below to schedule a free demo session via WhatsApp.
        </p>
      </div>

      <form id="demoForm" class="student-enquiry-form" novalidate>
        <!-- Anti-Spam Honeypot Field -->
        <div class="honeypot-field" aria-hidden="true">
          <label for="demo_website_source">Leave this blank</label>
          <input type="text" id="demo_website_source" name="website_source" tabindex="-1" autocomplete="off">
        </div>

        <div class="form-grid">
          <!-- Student Name -->
          <div class="form-group col-full">
            <label class="form-label" for="demo_studentName">Student Name <span class="req">*</span></label>
            <input type="text" id="demo_studentName" name="studentName" class="form-input" placeholder="Student's name" required>
            <span class="form-error"></span>
          </div>

          <!-- WhatsApp Number -->
          <div class="form-group col-full">
            <label class="form-label" for="demo_whatsappNumber">WhatsApp Number <span class="req">*</span></label>
            <div class="phone-input-group">
              <select name="countryCode" class="phone-code-select" aria-label="Country Code">
                <option value="+91" selected>🇮🇳 +91 (India)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
                <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                <option value="+974">🇶🇦 +974 (Qatar)</option>
                <option value="+968">🇴🇲 +968 (Oman)</option>
                <option value="+965">🇰🇼 +965 (Kuwait)</option>
                <option value="+973">🇧🇭 +973 (Bahrain)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+1">🇺🇸 +1 (USA/Canada)</option>
              </select>
              <input type="tel" id="demo_whatsappNumber" name="whatsappNumber" class="form-input" placeholder="e.g. 95261 80016" required>
            </div>
            <span class="form-error"></span>
            <span class="form-hint">Used to connect with you and share demo timing.</span>
          </div>

          <!-- Learning Interest -->
          <div class="form-group col-full">
            <label class="form-label" for="demo_learningInterest">Learning Interest <span class="req">*</span></label>
            <select id="demo_learningInterest" name="learningInterest" class="form-select" required>
              <option value="School Tuition" selected>School Tuition (KG - Class 10)</option>
              <option value="Madrasa Education">Madrasa Education</option>
              <option value="Both — School Tuition and Madrasa Education">Both — School Tuition & Madrasa Education</option>
              <option value="Language Learning">Language Learning</option>
            </select>
          </div>

          <!-- Conditional: Class -->
          <div class="form-group conditional-class">
            <label class="form-label" for="demo_studentClass">Class Level</label>
            <select id="demo_studentClass" name="studentClass" class="form-select">
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

          <!-- Conditional: Curriculum -->
          <div class="form-group conditional-curriculum">
            <label class="form-label" for="demo_curriculum">Curriculum</label>
            <select id="demo_curriculum" name="curriculum" class="form-select">
              <option value="Kerala State">Kerala State Syllabus</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
            </select>
          </div>

          <!-- Conditional: School Subject -->
          <div class="form-group conditional-school-subject col-full">
            <label class="form-label" for="demo_schoolSubject">Subjects Needed</label>
            <input type="text" id="demo_schoolSubject" name="schoolSubject" class="form-input" placeholder="e.g. Mathematics, Science, English, etc.">
          </div>

          <!-- Conditional: Madrasa Focus -->
          <div class="form-group conditional-madrasa-requirements col-full" style="display: none;">
            <label class="form-label" for="demo_madrasaRequirements">Madrasa Learning Focus</label>
            <input type="text" id="demo_madrasaRequirements" name="madrasaRequirements" class="form-input" placeholder="e.g. Quran Reading, Tajweed, Islamic Studies">
          </div>

          <!-- Conditional: Language Choice -->
          <div class="form-group conditional-language col-full" style="display: none;">
            <label class="form-label" for="demo_language">Language to Learn</label>
            <select id="demo_language" name="language" class="form-select">
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="Urdu">Urdu</option>
            </select>
          </div>


          <div class="form-group col-full" style="margin-top: 8px;">
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              Confirm &amp; Connect on WhatsApp
            </button>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); text-align: center; margin-top: 8px;">
              Your information is securely handled. Free demo schedule will be confirmed with our team.
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
  `;
}

module.exports = renderDemoModal;
