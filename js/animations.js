/* =============================================
   ZERØCRAFT — Scroll Animations
   Intersection Observer reveal system
   ============================================= */

(function () {
  'use strict';

  // ===== Scroll Reveal with Intersection Observer =====
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

  function initScrollReveal() {
    const elements = document.querySelectorAll(revealSelectors);

    if (!elements.length) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      elements.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== Parallax Effect for Product Glow =====
  function initParallax() {
    const glowElements = document.querySelectorAll('.showcase-product-glow, .product-hero-glow, .hero-glow');

    if (!glowElements.length) return;

    let rafId = null;

    function updateParallax() {
      const scrollY = window.scrollY;

      glowElements.forEach(function (el) {
        const rect = el.parentElement.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (centerY - viewportCenter) * 0.05;

        el.style.transform = 'translateX(-50%) translateY(' + offset + 'px)';
      });

      rafId = null;
    }

    window.addEventListener('scroll', function () {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }

  // ===== Counter Animation for Specs =====
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== Mouse Glow Effect (subtle) =====
  function initMouseGlow() {
    const hero = document.querySelector('.hero, .product-hero');

    if (!hero) return;

    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const glow = document.createElement('div');
    glow.style.cssText = [
      'position: absolute',
      'width: 400px',
      'height: 400px',
      'border-radius: 50%',
      'background: radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
      'pointer-events: none',
      'z-index: 1',
      'transition: opacity 0.3s ease',
      'opacity: 0'
    ].join(';');

    hero.style.position = 'relative';
    hero.appendChild(glow);

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - 200;
      const y = e.clientY - rect.top - 200;

      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      glow.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });
  }

  // ===== Initialize =====
  function init() {
    initScrollReveal();
    initParallax();
    initCounters();
    initMouseGlow();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
