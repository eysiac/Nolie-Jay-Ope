// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ================= MOBILE MENU =================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ================= SCROLL ANIMATIONS =================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section-header, .cred-card, .service-card, .timeline-item, .contact-card, .about-grid > *').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});

// ================= YEAR =================
document.getElementById('year').textContent = new Date().getFullYear();

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================= SCROLL PROGRESS =================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = percent + '%';
});

// ================= THEME TOGGLE =================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeIcon.classList.toggle('fa-moon', !isLight);
  themeIcon.classList.toggle('fa-sun', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ================= STATS COUNTER =================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
  statNumbers.forEach(el => {
    const target = +el.dataset.target;
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ================= LOGO CAROUSEL ARROWS =================
const logoCarousel = document.getElementById('logoCarousel');
const logoPrev = document.getElementById('logoPrev');
const logoNext = document.getElementById('logoNext');

if (logoCarousel) {
  const SCROLL_AMOUNT = 400;

  logoNext.addEventListener('click', () => {
    logoCarousel.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  });

  logoPrev.addEventListener('click', () => {
    logoCarousel.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  });

  const updateArrows = () => {
    const maxScroll = logoCarousel.scrollWidth - logoCarousel.clientWidth;
    logoPrev.disabled = logoCarousel.scrollLeft <= 5;
    logoNext.disabled = logoCarousel.scrollLeft >= maxScroll - 5;
  };

  logoCarousel.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // Drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  logoCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    logoCarousel.style.cursor = 'grabbing';
    startX = e.pageX - logoCarousel.offsetLeft;
    scrollLeft = logoCarousel.scrollLeft;
  });

  logoCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    logoCarousel.style.cursor = 'grab';
  });

  logoCarousel.addEventListener('mouseup', () => {
    isDown = false;
    logoCarousel.style.cursor = 'grab';
  });

  logoCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - logoCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    logoCarousel.scrollLeft = scrollLeft - walk;
  });
}

// ================= NOTABLE CLIENTS DATA =================
const clientsData = [
  { org: "Tarlac Agricultural University", title: "Destination Development Planning: From Potential Tourist Destinations", date: "September 18, 2026", role: "Guest Speaker" },
  { org: "Saint Jude College", title: "Future-Proofing Your Hospitality Career", date: "September 17, 2026", role: "Guest Speaker" },
  { org: "Saint Jude College", title: "The Psychology of Hospitality: Why Guest Remember How You Made Them Feel", date: "September 15, 2026", role: "Guest Speaker" },
  { org: "Colegio De San Gabriel Arcangel, Inc.", title: "Understanding Culture and Identity in Hospitality and Tourism Industry", date: "September 07, 2026", role: "Guest Speaker" },
  { org: "Galilea Hotel", title: "Personality Development, Professional Etiquette and Customer Service in the Hospitality Industry", date: "August 3-4, 2026", role: "Facilitator" },
  { org: "Polytechnic University of the Philippines", title: "AI-Powered Tourism: Practical Tools for Hotel and Travel Agencies", date: "June 20, 2026", role: "Guest Speaker" },
  { org: "Makati Science Technological Institute", title: "Cultural Tourism in a Globalized World: Bridging Heritage, Innovation, and Sustainability", date: "May 13, 2026", role: "Guest Speaker" },
  { org: "Pamantasan ng Lungsod ng Pasig", title: "Safe Bites: Empowering Community Food Vendors Through Food Safety & Sanitation", date: "May 04, 2026", role: "Guest Speaker" },
  { org: "Arellano University - Plaridel Campus", title: "Safety Practices in the Workplace", date: "April 20, 2026", role: "Guest Speaker" },
  { org: "Quezon City University", title: "Strong Foundation Bright Futures: Holistic Approach in Early Childhood Education", date: "December 11, 2025", role: "Guest Speaker" },
  { org: "Adamson University", title: "Culinary Heritage of Local Food Delicacies in the Province of Rizal", date: "December 5, 2025", role: "Guest Speaker" },
  { org: "Pamantasan ng Lungsod ng Marikina", title: "Performance Management: Strategies for Setting Goals, Providing Feedback and Evaluating Performance", date: "November 14, 2025", role: "Guest Speaker" },
  { org: "Adamson University", title: "Intelligent Marketing: The Power of Hyper-Personalization & Real-Time Orchestration", date: "October 29, 2025", role: "Guest Speaker" },
  { org: "Saint Francis of Assisi College", title: "Strategic Career Preparation: Mastering Professional Documents, Communication Skills and Workplace Ethics", date: "September 27, 2025", role: "Guest Speaker" },
  { org: "GrayVantage Academic & Corporate Services", title: "Business in Action: Understanding the Four Pillars—Operations, Marketing, Finance and HR", date: "August 01, 2025", role: "Resource Speaker" },
  { org: "University of the East - Caloocan", title: "Excellence with a Smile: Navigating the Future of Customer Service in TourEASTm", date: "April 24, 2025", role: "Resource Speaker" },
  { org: "Pamantasan ng Lungsod ng Pasig", title: "Pouring Knowledge and Inspiration: A Community Seminar on Beverage Creations and Opportunities", date: "April 07, 2025", role: "Guest Speaker" },
  { org: "Our Lady of Lourdes College", title: "Operations Analytics and Decision Making", date: "March 15, 2025", role: "Guest Lecturer" },
  { org: "Rizal Technological University", title: "Integrating Technological Advancement: Empowering Sustainability and Efficiency", date: "March 10, 2025", role: "Guest Speaker" },
  { org: "Philippine Institute of Chemical Engineers - Bicol University", title: "The InChern: Your Roadmap to Industry and Beyond", date: "March 08, 2025", role: "Resource Speaker" },
  { org: "Taguig City University", title: "Navigating Hospitality Challenges: Resilience & Agility in Uncertain Times", date: "January 19, 2025", role: "Guest Speaker" },
  { org: "National Teachers College", title: "Thriving Without Ties: Mastering Success Without Connections Or Networks", date: "December 06, 2024", role: "Guest Speaker" },
  { org: "7-Star Educational Academy Corporation", title: "Upskilling and Marketing: Serving Success: Marketing Strategies, Skills and Customer Satisfaction", date: "December 05, 2024", role: "Guest Speaker" },
  { org: "Gardner College The Global School of Innovation", title: "Managing Stress and Emotions", date: "November 26, 2024", role: "Guest Speaker" },
  { org: "Barangay 179, Zone 16, District III, Sangguniang Kabataan, City of Caloocan", title: "Entrepreneurship Symposium: Empowering the Youth to Launch Start-up Business", date: "November 12, 2024", role: "Guest Speaker" },
  { org: "Navotas Polytechnic College", title: "Learning and Navigating the Art of Instructions Following Techniques", date: "November 12, 2024", role: "Guest Speaker" },
  { org: "Philippine Christian University", title: "Balance, Bytes and Being", date: "October 19, 2024", role: "Resource Speaker" },
  { org: "Saint Jude College, PHINMA Education", title: "Building a Culture of Excellence: Employee Engagement and Customer Satisfaction", date: "October 10, 2024", role: "Guest Speaker" },
  { org: "The Philippine Institute of Chemical Engineers", title: "Resume Writing and How to Ace an Interview", date: "September 18, 2024", role: "Resource Speaker" },
  { org: "RareJob", title: "Engaging and Creating with Care in the Digital Age", date: "September 07, 2024", role: "Guest Speaker" },
  { org: "Aquasolv Philippines Inc.", title: "Introduction to Professional Enhancement Training", date: "August 19, 2024", role: "Guest Speaker" },
  { org: "Polytechnic University of the Philippines", title: "Balancing Act: Navigating Effects for Responsible Marketing", date: "June 29, 2024", role: "Guest Speaker" },
  { org: "MVJ Training Consultancy Services", title: "Exploring Authentic Asia Flavors", date: "April 07, 2024", role: "Guest Speaker" },
  { org: "University of Caloocan City", title: "Prosperity Blueprint: Entrepreneurial Strategies for Future Financial Freedom", date: "March 05, 2024", role: "Resource Speaker" },
  { org: "Santa Isabel College of Manila", title: "Optimizing Work Environment Through Ergonomically Designed Facilities in Hospitality Industry", date: "February 23, 2024", role: "Resource Speaker" },
  { org: "STI Baliuag", title: "Embracing Change: How Trends and Risk Management Shape the Tourism and Hospitality Management", date: "December 11, 2023", role: "Guest Speaker" },
  { org: "Polytechnic University of the Philippines", title: "Universal Puzzle: Deciphering the Employee Management & Customer Complaints in Food and Beverage Industry", date: "May 24, 2023", role: "Resource Speaker" },
  { org: "MVJ Training Consultancy Services", title: "Effective Performance Management", date: "May 14, 2023", role: "Guest Speaker" },
  { org: "MVJ Training Consultancy Services", title: "Compensation and Benefits: How to Attract and Retain Top Talent", date: "May 14, 2023", role: "Resource Speaker" },
  { org: "Act of Love Community", title: "CV Writing and Interview Tips", date: "April 22, 2023", role: "Guest Speaker" },
  { org: "Polytechnic University of the Philippines", title: "Seas the Day! Navigating to Success!", date: "April 22, 2023", role: "Guest Speaker" },
  { org: "MVJ Training Consultancy Services", title: "Building a Strong Foundation for Foodservice", date: "April 08, 2023", role: "Resource Speaker" },
  { org: "Santa Isabel College of Manila", title: "Embracing Ergonomic and Kitchen Safety for Workplace Productivity", date: "March 16, 2023", role: "Guest Speaker" },
  { org: "University of Perpetual Help", title: "Unleashing the Skills and Competencies: Future-Ready Professionals", date: "January 11, 2023", role: "Judge" },
  { org: "University of Santo Tomas", title: "Foodservice Design Concept Paper Presentation", date: "December 07, 2022", role: "Panelist" },
  { org: "St. Dominic College of Asia", title: "Rethinking Tourism: From Crisis to Transformation", date: "November 16, 2022", role: "Plenary Speaker" },
  { org: "Arellano University Andres Bonifacio Campus", title: "Buwan ng Wika Costume Competition: Tiktok Edition", date: "September 23, 2022", role: "Judge" },
  { org: "Manuel S. Enverga University Foundation", title: "Financial Literacy Program: Usapang Pera at Kinabukasan, Gen Z Edition", date: "August 27, 2022", role: "Guest Speaker" },
  { org: "Polytechnic University of the Philippines", title: "Breaking the Stigma About Gender Stereotypes in Hospitality Management Related Jobs", date: "July 26, 2022", role: "Guest Speaker" },
  { org: "Visayas State University", title: "The Ultimate Guide: How to Overcome Hindrances in Online Class", date: "June 20, 2022", role: "Guest Speaker" },
  { org: "Centro Escolar University", title: "Hospitality Industry Recovering Amidst Covid-19 Pandemic", date: "June 18, 2022", role: "Guest Speaker" },
  { org: "STI College Bacoor", title: "Back and Better: Tourism & the Growing Opportunities Today", date: "June 18, 2022", role: "Guest Speaker" },
  { org: "Cavite State University", title: "Steer your Career in the Right Direction: Opportunities in Hospitality and Tourism Industry", date: "June 17, 2022", role: "Guest Speaker" },
  { org: "STI College Carmona", title: "The Housekeeping Operations and The Surviving Process of Housekeeping Management", date: "June 02, 2022", role: "Guest Speaker" },
  { org: "PLT College, Inc.", title: "Sustainable Tourism: Career opportunity on new normal & On the Job Training", date: "May 28, 2022", role: "Resource Speaker" },
  { org: "STI College Sta. Mesa", title: "Unveiling the Food Service Industry's Journey to Endemic", date: "May 24, 2022", role: "Guest Speaker" },
  { org: "Santa Isabel College of Manila", title: "Enhancing Foodservice Quality in the Context of Sustainability", date: "May 21, 2022", role: "Guest Speaker" },
  { org: "Davao Oriental State University", title: "Housekeeping: Its Importance in Hospitality Industry", date: "May 12, 2022", role: "Guest Speaker" },
  { org: "Mindanao State University", title: "Developing Student's Skills and Knowledge towards Competence", date: "April 22, 2022", role: "Guest Speaker" },
  { org: "Arellano University Andres Bonifacio Branch", title: "Tourism and Hospitality Experience: Decade of Empowered Commitment", date: "April 04-08, 2022", role: "Judge" },
  { org: "Arellano University Andres Bonifacio Branch", title: "G2BEYOU: Glamour Beyond You", date: "April 05, 2022", role: "Guest Speaker" },
  { org: "Cebu Technological University", title: "The Future of Hospitality Industry Amidst Pandemic", date: "March 09, 2022", role: "Guest Speaker" },
  { org: "Our Lady of Perpetual Succor College", title: "Getting Ready for the Workplace Setting", date: "March 05, 2022", role: "Guest Speaker" },
  { org: "Cebu Technological University", title: "Career Opportunities in Hospitality Industry in New Normal", date: "February 22, 2022", role: "Guest Speaker" },
  { org: "Cebu Technological University", title: "The Future of Hospitality Sector Post Covid-19", date: "February 18, 2022", role: "Guest Speaker" },
  { org: "Malayan College - Laguna", title: "ALOHA: Assessing Lodging Operations and Hospitality Activities", date: "February 16, 2022", role: "Guest Speaker" },
  { org: "Don Honorio Ventura State University", title: "Maintaining an Effective and Efficient Food Safety Management System", date: "January 27, 2022", role: "Resource Speaker" },
  { org: "Alliance of Hospitality and Tourism Movers of the Philippines", title: "Hospitality and Tourism Careers and Job Opportunities in the New Normal", date: "December 20, 2021", role: "Resource Speaker" },
  { org: "Our Lady of Perpetual Succor College", title: "The TOQUE 2018, HRM Event Management Class", date: "October 25, 2018", role: "Resource Speaker" },
  { org: "Arellano University Andres Bonifacio Branch", title: "Table Skirting Competition / SHTM 8th Skill Festival", date: "October 03, 2019", role: "Judge" },
  { org: "Arellano University Andres Bonifacio Branch", title: "Flairtending and Mixology Competition 2018", date: "March 07, 2019", role: "Judge" }
];

// ================= NOTABLE CLIENTS RENDER =================
const clientsGrid = document.getElementById('clientsGrid');
const clientsEmpty = document.getElementById('clientsEmpty');
const clientSearch = document.getElementById('clientSearch');
const clientFilters = document.querySelectorAll('.clients-filters .filter-btn');
const clientsToggle = document.getElementById('clientsToggle');
const clientsPanel = document.getElementById('clientsPanel');
const clientsMore = document.getElementById('clientsMore');
const clientsMoreWrap = document.getElementById('clientsMoreWrap');

let activeRole = 'all';
let searchQuery = '';
let visibleCount = 6;
const INCREMENT = 6;

const roleIconMap = {
  'Guest Speaker': 'fa-microphone-lines',
  'Resource Speaker': 'fa-chalkboard-user',
  'Guest Lecturer': 'fa-book-open-reader',
  'Judge': 'fa-gavel',
  'Panelist': 'fa-users-viewfinder',
  'Plenary Speaker': 'fa-star',
  'Facilitator': 'fa-handshake-angle'
};

const renderClients = (resetCount = false) => {
  if (!clientsGrid) return;

  if (resetCount) visibleCount = 6;

  const filtered = clientsData.filter(c => {
    const matchRole = activeRole === 'all' || c.role === activeRole;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      c.org.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.date.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  clientsGrid.innerHTML = visible.map((c, i) => {
    const icon = roleIconMap[c.role] || 'fa-microphone';
    return `
      <article class="client-card" style="animation-delay:${i * 30}ms">
        <div class="client-card-top">
          <div class="client-role-icon"><i class="fa-solid ${icon}"></i></div>
          <span class="client-role">${c.role}</span>
        </div>
        <h3 class="client-org">${c.org}</h3>
        <p class="client-title">"${c.title}"</p>
        <div class="client-date">
          <i class="fa-regular fa-calendar"></i>
          <span>${c.date}</span>
        </div>
      </article>
    `;
  }).join('');

  clientsEmpty.style.display = filtered.length ? 'none' : 'block';

  if (filtered.length > visibleCount) {
    clientsMoreWrap.classList.add('visible');
  } else {
    clientsMoreWrap.classList.remove('visible');
  }
};

if (clientsToggle) {
  clientsToggle.addEventListener('click', () => {
    const isOpen = clientsPanel.classList.toggle('open');
    clientsToggle.classList.toggle('open', isOpen);
    const label = clientsToggle.querySelector('span');
    label.textContent = isOpen ? 'Hide Engagements' : 'View All Engagements';

    if (isOpen) {
      setTimeout(() => {
        clientsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    }
  });
}

if (clientsMore) {
  clientsMore.addEventListener('click', () => {
    visibleCount += INCREMENT;
    clientsMoreWrap.classList.add('expanded');
    renderClients();
  });
}

clientFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    clientFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeRole = btn.dataset.role;
    renderClients(true);
  });
});

if (clientSearch) {
  clientSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderClients(true);
  });
}

renderClients(true);

// ================= GALLERY FILTER =================
const galleryFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    galleryFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hide', !match);
    });
  });
});

// ================= LIGHTBOX =================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;
const visibleItems = () => [...document.querySelectorAll('.gallery-item:not(.hide)')];

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const items = visibleItems();
    currentGalleryIndex = items.indexOf(item);
    openLightbox(items[currentGalleryIndex].querySelector('img'));
  });
});

const openLightbox = (img) => {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

const navigateLightbox = (dir) => {
  const items = visibleItems();
  currentGalleryIndex = (currentGalleryIndex + dir + items.length) % items.length;
  const img = items[currentGalleryIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
};

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});