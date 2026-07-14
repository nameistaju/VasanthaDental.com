/* ==========================================================================
   VASANTHA DENTAL CLINIC - UTILITY SCRIPTS
   ========================================================================== */

// 1. Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const scrollPct = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = `${scrollPct}%`;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
}


// 3. Counter Animation (Count Up)
function initCountUp() {
  const counters = document.querySelectorAll('.count-up, .count-up-decimal');
  if (counters.length === 0) return;

  const countUpElement = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.classList.contains('count-up-decimal');
    const duration = 1800; // 1.8 seconds animation
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      let currentValue = easeProgress * target;
      
      if (isDecimal) {
        el.textContent = currentValue.toFixed(1);
      } else {
        el.textContent = Math.floor(currentValue).toLocaleString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUpElement(entry.target);
        observer.unobserve(entry.target); // Run animation only once
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Export initializers
window.Utilities = {
  initScrollProgress,
  initCountUp
};
