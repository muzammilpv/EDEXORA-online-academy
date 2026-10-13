/**
 * EDEXORA — From Learning to Excellence
 * Global Configuration & Brand Tokens
 * 
 * Central configuration file for contact details, social links,
 * service offerings, SEO metadata, and third-party integrations.
 */

const CONFIG = {
  brand: {
    name: 'EDEXORA',
    tagline: 'From Learning to Excellence',
    description: 'Personalised one-to-one online tuition for school subjects, Madrasa education, and language learning. Tailored for families in Kerala and the Gulf.',
    shortIntro: 'EDEXORA is an online education platform offering personalised one-to-one tuition for school subjects, Madrasa education, and language learning. We aim to make quality learning more accessible and convenient for families in Kerala and Gulf countries.',
    logoPath: '/assets/images/logo.jpeg',
    logoAlt: 'EDEXORA — From Learning to Excellence'
  },

  contact: {
    // Official Business WhatsApp Number
    whatsappNumber: '+91 95261 80016',
    whatsappRaw: '919526180016', // Format for wa.me links
    whatsappLink: 'https://wa.me/919526180016',

    // Official Social Media & Community Channels
    instagram: 'https://www.instagram.com/edexora?stkn=cTljaGthMzRwY3My',
    facebookPageUrl: 'https://www.facebook.com/share/19i748Ea6D/',
    whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbEGYQ2Fsn0oOe9l5w00',
    ownerEmail: process.env.EDEXORA_OWNER_EMAIL || '', // Placeholder: EDEXORA_OWNER_EMAIL

    // Live session platforms (conducted post-enquiry)
    platforms: ['Google Meet', 'Zoom']
  },

  services: {
    schoolTuition: {
      title: 'School Tuition',
      tagline: 'KG to Class 10 with Kerala State, CBSE, and ICSE curriculum support.',
      slug: '/school-tuition',
      curriculums: ['Kerala State', 'CBSE', 'ICSE'],
      classes: ['Kindergarten (KG)', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']
    },
    madrasaEducation: {
      title: 'Madrasa Education',
      tagline: 'Personalised online Madrasa learning based on the student’s age, level, and learning requirements.',
      slug: '/madrasa-education',
      areas: ['Quran Reading', 'Tajweed & Recitation', 'Islamic Studies', 'Individual Learning Support']
    },
    languageLearning: {
      title: 'Language Learning',
      tagline: 'Personalised learning in English, Malayalam, Hindi, Arabic, and Urdu.',
      slug: '/language-learning',
      languages: ['English', 'Malayalam', 'Hindi', 'Arabic', 'Urdu']
    }
  },

  integrations: {
    // Google Sheets integration via Google Apps Script Web App
    // The server/client will forward submissions to this URL when configured.
    googleScriptWebAppUrl: process.env.GOOGLE_SCRIPT_WEBAPP_URL || ''
  },

  // Real parent and student testimonials will be supplied later.
  // We strictly NEVER show fake reviews.
  // Leave empty for production. Set showPlaceholderInDev: true only for local template inspection.
  testimonials: {
    showPlaceholderInDev: false,
    items: [
      /* Example configuration for when real reviews are provided:
      {
        id: 'rev-1',
        reviewerName: 'Parent of Class 8 Student',
        reviewerLocation: 'Dubai, UAE',
        courseCategory: 'School Tuition (CBSE)',
        reviewText: 'Review text will be added here once approved for public use.',
        avatar: null
      }
      */
    ]
  },

  faqs: [
    {
      question: 'Which classes does EDEXORA support?',
      answer: 'EDEXORA supports school tuition for students from Kindergarten (KG) up to Class 10, along with age-appropriate Madrasa studies and language learning for learners of all stages.'
    },
    {
      question: 'Which school curricula are available?',
      answer: 'We provide one-to-one tuition tailored to Kerala State Syllabus, CBSE (Central Board of Secondary Education), and ICSE (Indian Certificate of Secondary Education).'
    },
    {
      question: 'What is one-to-one online tuition?',
      answer: 'One-to-one tuition means every live session is dedicated entirely to a single student. This allows the teacher to focus on the student’s individual pace, clarify doubts immediately, and adapt learning methods to their specific needs.'
    },
    {
      question: 'How does Madrasa learning work?',
      answer: 'Our online Madrasa education is individually tailored to the student’s age, baseline understanding, and family requirements. Areas of focus include Quran reading, Tajweed and recitation, and foundational Islamic studies.'
    },
    {
      question: 'Which languages can students learn?',
      answer: 'We offer personalised language learning in English, Malayalam, Hindi, Arabic, and Urdu. The syllabus and focus are customised during the initial consultation.'
    },
    {
      question: 'How can parents book a free demo?',
      answer: 'You can request a free demo class by clicking the "Book a Free Demo" button or connecting with our team directly via WhatsApp (+91 95261 80016). We will discuss your child’s learning needs and schedule a convenient demo session.'
    },
    {
      question: 'How are course fees communicated?',
      answer: 'In keeping with our personalised educational approach, all course fees are shared transparently through enquiry. Fees depend on the chosen subject, class level, number of weekly sessions, and tailored study plan.'
    },
    {
      question: 'Can students from Gulf countries enquire?',
      answer: 'Yes, absolutely. A significant portion of our community consists of Malayali and Indian expatriate families living across the UAE, Saudi Arabia, Qatar, Oman, Kuwait, and Bahrain. Timings are scheduled around Gulf timezones.'
    },
    {
      question: 'How are live classes conducted?',
      answer: 'Live interactive classes are conducted separately through Google Meet or Zoom. Once your enquiry is confirmed, secure session links and schedules are shared with the parent.'
    }
  ],

  seo: {
    siteUrl: 'https://edexora.com', // Replace with final production domain
    defaultTitle: 'EDEXORA — From Learning to Excellence | Online Tuition & Education',
    titleTemplate: '%s | EDEXORA',
    defaultDescription: 'Premium personalised one-to-one online tuition for School (Kerala State, CBSE, ICSE), Madrasa Education, and Languages. Designed for students in Kerala and Gulf families.',
    keywords: [
      'EDEXORA',
      'online tuition Kerala',
      'CBSE online tuition',
      'Kerala State syllabus tuition',
      'ICSE online tuition',
      'one to one online tuition',
      'online Madrasa classes',
      'online Quran learning',
      'online language classes',
      'tuition for Gulf Malayali students',
      'online tuition Dubai UAE Qatar Saudi'
    ]
  }
};

module.exports = CONFIG;
