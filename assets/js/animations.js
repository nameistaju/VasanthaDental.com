/* ==========================================================================
   VASANTHA DENTAL CLINIC - ANIMATIONS SCRIPTS
   ========================================================================== */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .stagger-parent');
  if (reveals.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

// Export initializers
window.Animations = {
  initScrollReveal
};
