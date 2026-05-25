/**
 * Deepak K N — AI/ML Portfolio
 * Pure HTML, CSS, JavaScript
 */

(function () {
  'use strict';

  /* ============================================
     Configuration
     ============================================ */
  const TYPING_PHRASES = [
    'AIML Student | AI & Full Stack Developer',
    'Building AI-Powered Solutions',
    'Computer Vision & Deep Learning',
    'React • Node.js • Python • YOLO',
  ];

  const SKILLS = [
    { name: 'Python', icon: '🐍', level: 90 },
    { name: 'C', icon: '⚙️', level: 60 },
    { name: 'HTML', icon: '🌐', level: 70 },
    { name: 'CSS', icon: '🎨', level: 65 },
    { name: 'JavaScript', icon: '⚡', level: 88 },
    { name: 'React.js', icon: '⚛️', level: 85 },
    { name: 'Node.js', icon: '🟢', level: 82 },
    { name: 'MongoDB', icon: '🍃', level: 80 },
    { name: 'TensorFlow', icon: '🧠', level: 78 },
    { name: 'YOLO', icon: '👁️', level: 76 },
    { name: 'Scikit-learn', icon: '📊', level: 80 },
    { name: 'NumPy', icon: '🔢', level: 85 },
    { name: 'Pandas', icon: '🐼', level: 84 },
    { name: 'Git', icon: '📦', level: 88 },
    { name: 'GitHub', icon: '🐙', level: 90 },
    { name: 'Ollama', icon: '🦙', level: 72 },
    { name: 'Hugging Face', icon: '🤗', level: 75 },
    { name: 'n8n', icon: '🔗', level: 70 },
  ];

  const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certifications', 'activities', 'contact'];

  /* ============================================
     DOM References
     ============================================ */
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const typingEl = document.getElementById('typing-text');
  const skillsGrid = document.getElementById('skills-grid');
  const scrollTopBtn = document.getElementById('scroll-top');
  const yearEl = document.getElementById('year');
  const canvas = document.getElementById('particles-canvas');
  const revealEls = document.querySelectorAll('.reveal');

  /* ============================================
     Page Loader
     ============================================ */
  function initLoader() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        startTypingAnimation();
        revealHero();
      }, 1200);
    });
  }

  function revealHero() {
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 * i);
    });
  }

  /* ============================================
     Typing Animation (Hero)
     ============================================ */
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function startTypingAnimation() {
    if (!typingEl) return;
    type();
  }

  function type() {
    const current = TYPING_PHRASES[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      delay = 400;
    }

    typingTimeout = setTimeout(type, delay);
  }

  /* ============================================
     Skills Grid — Dynamic render
     ============================================ */
  function renderSkills() {
    if (!skillsGrid) return;

    skillsGrid.innerHTML = SKILLS.map(
      (skill) => `
        <div class="skill-card reveal" data-level="${skill.level}">
          <span class="skill-icon" aria-hidden="true">${skill.icon}</span>
          <span class="skill-name">${skill.name}</span>
          <div class="skill-bar" aria-hidden="true">
            <div class="skill-bar-fill" style="--skill-level: ${skill.level}%"></div>
          </div>
        </div>
      `
    ).join('');

    observeReveal(document.querySelectorAll('#skills-grid .reveal'));
  }

  /* ============================================
     Scroll Reveal (Intersection Observer)
     ============================================ */
  function observeReveal(elements) {
    const targets = elements || revealEls;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');

          if (entry.target.classList.contains('skill-card')) {
            entry.target.classList.add('visible');
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ============================================
     Sticky Header & Active Nav
     ============================================ */
  function initHeader() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      header.classList.toggle('scrolled', scrollY > 50);
      scrollTopBtn.classList.toggle('visible', scrollY > 400);

      updateActiveNav();
    });
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + varHeaderHeight() + 100;

    let current = 'hero';

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) {
        current = id;
      }
    });

    navLinkItems.forEach((link) => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === current);
    });
  }

  function varHeaderHeight() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 72;
  }

  /* ============================================
     Mobile Navigation
     ============================================ */
  function initMobileNav() {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinkItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================
     Smooth scroll for anchor links
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ============================================
     Scroll to Top
     ============================================ */
  function initScrollTop() {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     Floating Particles Background
     ============================================ */
  function initParticles() {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let width;
    let height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(Math.floor((width * height) / 12000), 80);
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    });
  }

  /* ============================================
     Project card tilt effect
     ============================================ */
  function initProjectTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================
     Profile image — show initials if file missing
     ============================================ */
  function initAvatar() {
    const img = document.querySelector('.avatar-img');
    const fallback = document.querySelector('.avatar-fallback');
    if (!img || !fallback) return;

    const showFallback = () => {
      img.style.display = 'none';
      fallback.classList.add('show');
      fallback.removeAttribute('aria-hidden');
    };

    if (img.complete && img.naturalHeight === 0) showFallback();
    else img.addEventListener('error', showFallback);
  }

  /* ============================================
     Footer year
     ============================================ */
  function initFooter() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================
     Initialize
     ============================================ */
  function init() {
    initLoader();
    renderSkills();
    observeReveal();
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollTop();
    initParticles();
    initProjectTilt();
    initAvatar();
    initFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
