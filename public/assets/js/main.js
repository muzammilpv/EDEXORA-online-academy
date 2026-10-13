/**
 * EDEXORA — From Learning to Excellence
 * Core Interactive Client Script
 */

(function () {
  'use strict';

  // 1. DOM READY HELPER
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function () {
    initHeaderScroll();
    initScrollAnimations();
    initMobileNav();
    initFaqAccordion();
    initDemoModal();
    initEnquiryForms();
    initCourseFilters();
  });

  // 2. MOBILE NAVIGATION
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');

    if (!toggle || !drawer) return;

    function toggleNav() {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        document.body.classList.remove('mobile-nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        document.body.classList.add('mobile-nav-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    }

    toggle.addEventListener('click', toggleNav);

    // Close on navigation link click
    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        document.body.classList.remove('mobile-nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. FAQ ACCORDION
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (!trigger || !content) return;

      trigger.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Optional: close other open items
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            const otherContent = other.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        } else {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // 4. FREE DEMO MODAL
  function initDemoModal() {
    const modal = document.getElementById('demoModal');
    const openBtns = document.querySelectorAll('[data-open-demo]');
    const closeBtns = document.querySelectorAll('[data-close-demo]');

    if (!modal) return;

    function openModal(prefillInterest) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (prefillInterest) {
        const select = modal.querySelector('select[name="learningInterest"]');
        if (select) {
          select.value = prefillInterest;
          select.dispatchEvent(new Event('change'));
        }
      }
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const interest = btn.getAttribute('data-demo-interest') || '';
        openModal(interest);
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Handle Demo Form Submission
    const demoForm = modal.querySelector('#demoForm');
    if (demoForm) {
      setupFormHandler(demoForm, true);
    }
  }

  // 5. CONDITIONAL FORM FIELDS & FORM HANDLER
  function initEnquiryForms() {
    const forms = document.querySelectorAll('.student-enquiry-form');
    forms.forEach(form => setupFormHandler(form, false));
  }

  function setupFormHandler(form, isDemoFlow) {
    if (!form) return;

    // Handle Conditional Visibility
    const interestRadios = form.querySelectorAll('input[name="learningInterest"]');
    const interestSelect = form.querySelector('select[name="learningInterest"]');

    const schoolCurriculumGroup = form.querySelector('.conditional-curriculum');
    const classGroup = form.querySelector('.conditional-class');
    const schoolSubjectGroup = form.querySelector('.conditional-school-subject');
    const madrasaSubjectGroup = form.querySelector('.conditional-madrasa-requirements');
    const languageGroup = form.querySelector('.conditional-language');

    function updateConditionalFields(selectedInterest) {
      const isSchool = selectedInterest === 'School Tuition';
      const isMadrasa = selectedInterest === 'Madrasa Education';
      const isBoth = selectedInterest === 'Both — School Tuition and Madrasa Education';
      const isLanguage = selectedInterest === 'Language Learning';

      if (schoolCurriculumGroup) {
        schoolCurriculumGroup.style.display = (isSchool || isBoth) ? 'flex' : 'none';
        const curSelect = schoolCurriculumGroup.querySelector('select');
        if (curSelect) curSelect.required = (isSchool || isBoth);
      }

      if (classGroup) {
        // Show class for School, Both, or general
        classGroup.style.display = (isSchool || isBoth) ? 'flex' : 'none';
      }

      if (schoolSubjectGroup) {
        schoolSubjectGroup.style.display = (isSchool || isBoth) ? 'flex' : 'none';
      }

      if (madrasaSubjectGroup) {
        madrasaSubjectGroup.style.display = (isMadrasa || isBoth) ? 'flex' : 'none';
      }

      if (languageGroup) {
        languageGroup.style.display = isLanguage ? 'flex' : 'none';
        const langSelect = languageGroup.querySelector('select');
        if (langSelect) langSelect.required = isLanguage;
      }
    }

    if (interestRadios.length > 0) {
      interestRadios.forEach(radio => {
        radio.addEventListener('change', function () {
          updateConditionalFields(this.value);
        });
        if (radio.checked) updateConditionalFields(radio.value);
      });
    }

    if (interestSelect) {
      interestSelect.addEventListener('change', function () {
        updateConditionalFields(this.value);
      });
      updateConditionalFields(interestSelect.value);
    }

    // Handle Form Submit
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Check Honeypot spam field
      const honeypot = form.querySelector('input[name="website_source"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot detected via honeypot.');
        return; // Silent discard
      }

      // Collect data
      const formData = new FormData(form);
      const studentName = (formData.get('studentName') || '').trim();
      const countryCode = formData.get('countryCode') || '+91';
      const phoneRaw = (formData.get('whatsappNumber') || '').trim();
      const fullPhone = `${countryCode} ${phoneRaw}`;

      const learningInterest = formData.get('learningInterest') || '';
      const studentClass = formData.get('studentClass') || 'Not Specified';
      const curriculum = formData.get('curriculum') || 'N/A';
      const schoolSubject = (formData.get('schoolSubject') || '').trim();
      const madrasaRequirements = (formData.get('madrasaRequirements') || '').trim();
      const languageSelected = formData.get('language') || '';
      const consent = formData.get('consent') === 'on';

      // Inline validation
      let hasError = false;
      const clearErrors = () => {
        form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      };
      clearErrors();

      const nameInput = form.querySelector('[name="studentName"]');
      if (!studentName || studentName.length < 2) {
        if (nameInput) {
          nameInput.classList.add('is-invalid');
          const err = nameInput.parentElement.querySelector('.form-error');
          if (err) err.textContent = 'Please enter a valid student name.';
        }
        hasError = true;
      }

      const phoneInput = form.querySelector('[name="whatsappNumber"]');
      const cleanDigits = phoneRaw.replace(/\D/g, '');
      if (!phoneRaw || cleanDigits.length < 7 || cleanDigits.length > 15) {
        if (phoneInput) {
          phoneInput.classList.add('is-invalid');
          const err = phoneInput.parentElement.parentElement.querySelector('.form-error');
          if (err) err.textContent = 'Please enter a valid WhatsApp number.';
        }
        hasError = true;
      }

      if (!consent && !isDemoFlow) {
        const consentBox = form.querySelector('[name="consent"]');
        if (consentBox) {
          consentBox.focus();
          alert('Please agree to allow EDEXORA to contact you regarding your enquiry.');
        }
        hasError = true;
      }

      if (hasError) return;

      // Determine subject or specific requirement based on interest
      let detailsField = '';
      if (learningInterest === 'School Tuition') {
        detailsField = schoolSubject || 'All Core Subjects';
      } else if (learningInterest === 'Madrasa Education') {
        detailsField = madrasaRequirements || 'General Madrasa Studies';
      } else if (learningInterest === 'Both — School Tuition and Madrasa Education') {
        detailsField = `School: ${schoolSubject || 'General'} | Madrasa: ${madrasaRequirements || 'General'}`;
      } else if (learningInterest === 'Language Learning') {
        detailsField = languageSelected;
      }

      const submissionPayload = {
        submissionId: 'EDX-' + Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        enquiryType: isDemoFlow ? 'Free Demo Request' : 'General Student Enquiry',
        parentName: 'Not Required',
        studentName: studentName,
        whatsappNumber: fullPhone,
        learningInterest: learningInterest,
        class: (learningInterest.includes('School')) ? studentClass : 'N/A',
        curriculum: (learningInterest.includes('School')) ? curriculum : 'N/A',
        subjectOrLanguage: detailsField,
        preferredTime: 'Flexible',
        consent: consent ? 'Yes' : 'Demo Request'
      };

      // Construct Prefilled WhatsApp Message
      let waMessage = '';
      if (isDemoFlow) {
        waMessage = `Hello EDEXORA, I would like to enquire about a free demo class.

Student Name: ${studentName}
WhatsApp Number: ${fullPhone}
Learning Interest: ${learningInterest}
` +
          (learningInterest.includes('School') ? `Class: ${studentClass}\nCurriculum: ${curriculum}\n` : '') +
          `Subject / Focus: ${detailsField}

Please contact me to discuss demo availability.`;
      } else {
        waMessage = `Hello EDEXORA, I would like to enquire about personalised learning.

Student Name: ${studentName}
WhatsApp Number: ${fullPhone}
Learning Interest: ${learningInterest}
` +
          (learningInterest.includes('School') ? `Class: ${studentClass}\nCurriculum: ${curriculum}\n` : '') +
          `Subject / Focus: ${detailsField}

Please share course details and availability.`;
      }

      const waRawNumber = window.EDEXORA_CONFIG?.whatsappRaw || '919526180016';
      const waUrl = `https://wa.me/${waRawNumber}?text=${encodeURIComponent(waMessage)}`;

      // Show submitting state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting enquiry...</span>';
      }

      const statusBox = form.querySelector('.form-status-alert') || document.createElement('div');
      statusBox.className = 'form-status-alert';
      form.prepend(statusBox);

      let sheetSaved = false;
      let sheetErrorMessage = '';

      try {
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload)
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
          sheetSaved = true;
        } else {
          sheetErrorMessage = resData.message || 'Unable to record to database at this moment.';
        }
      } catch (err) {
        console.warn('Backend API submission note:', err.message);
        sheetErrorMessage = 'Network connection to integration server could not be completed.';
      }

      // Re-enable submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      // Handle UI and WhatsApp Handshake
      if (sheetSaved) {
        statusBox.className = 'form-status-alert alert-success';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <strong>Enquiry received successfully!</strong><br>
          We are now redirecting you to WhatsApp to connect with the EDEXORA team.<br><br>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="margin-top:6px; display:inline-flex;">
            Continue to WhatsApp Chat
          </a>
        `;
        form.reset();

        // Try opening WhatsApp
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 500);

      } else {
        // If Google Sheet submission failed or not yet linked
        statusBox.className = 'form-status-alert alert-error';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <strong>Enquiry details prepared!</strong><br>
          ${sheetErrorMessage ? `<small style="display:block; margin-bottom:8px; opacity:0.85;">Note: ${sheetErrorMessage}</small>` : ''}
          Please click below to send your enquiry directly to EDEXORA via WhatsApp so our team can assist you immediately:<br><br>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="margin-top:6px; display:inline-flex;">
            Send Enquiry via WhatsApp Now
          </a>
        `;

        // Direct fallback link ensures zero lost leads
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 800);
      }
    });
  }

  // 6. COURSES PAGE FILTERS
  function initCourseFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    const courseCards = document.querySelectorAll('.course-card-item');
    const curriculumSelect = document.getElementById('courseCurriculumFilter');
    const classSelect = document.getElementById('courseClassFilter');
    const languageSelect = document.getElementById('courseLanguageFilter');

    if (filterTabs.length === 0 || courseCards.length === 0) return;

    let activeCategory = 'all';

    function applyFilters() {
      const selectedCurriculum = curriculumSelect ? curriculumSelect.value : 'all';
      const selectedClass = classSelect ? classSelect.value : 'all';
      const selectedLanguage = languageSelect ? languageSelect.value : 'all';

      courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardCurriculums = card.getAttribute('data-curriculum') || '';
        const cardClasses = card.getAttribute('data-class') || '';
        const cardLanguages = card.getAttribute('data-language') || '';

        let matchCategory = (activeCategory === 'all' || cardCategory === activeCategory);
        let matchCurriculum = (selectedCurriculum === 'all' || cardCurriculums.includes(selectedCurriculum));
        let matchClass = (selectedClass === 'all' || cardClasses.includes(selectedClass));
        let matchLanguage = (selectedLanguage === 'all' || cardLanguages.includes(selectedLanguage));

        if (matchCategory && matchCurriculum && matchClass && matchLanguage) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    if (curriculumSelect) curriculumSelect.addEventListener('change', applyFilters);
    if (classSelect) classSelect.addEventListener('change', applyFilters);
    if (languageSelect) languageSelect.addEventListener('change', applyFilters);
  }

  // 7. HEADER SCROLL ELEVATION
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 8. SCROLL-DRIVEN REVEAL ANIMATIONS
  function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Selector targeting all key content cards and components
    const selector = '.service-card, .step-card, .commitment-card, .curriculum-card, .language-card, .faq-item, .contact-consultation-card, .testimonial-card, .course-card-item, .mission-vision-card, .stage-card';
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // Fallback: immediately visible
      elements.forEach(el => {
        el.classList.add('reveal-item', 'is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => {
      el.classList.add('reveal-item');
      observer.observe(el);
    });
  }

})();
