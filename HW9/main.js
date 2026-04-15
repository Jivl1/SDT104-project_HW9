/* =============================================
   VOID — Archive Drop 01
   main.js — Navigation & scroll interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile navigation toggle ── */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      // Update aria-expanded for accessibility
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('active', isOpen);

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── Header scroll effect ── */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.style.borderBottomColor = window.scrollY > 20
        ? 'rgba(255,255,255,0.1)'
        : '';
    }, { passive: true });
  }

  /* ── Scroll reveal animation ── */
  // Add .reveal class to elements we want to animate in
  const revealTargets = document.querySelectorAll(
    '.product-card, .lookbook-item, .stat-block, .about-text p, .about-text h2, .about-text h3, blockquote'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  // Observe elements entering viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => observer.observe(el));

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === `#${id}`) {
            link.setAttribute('aria-current', 'true');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
