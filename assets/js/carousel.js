/* ==========================================================================
   VASANTHA DENTAL CLINIC - SLIDERS, CAROUSELS, AND ACCORDION SCRIPTS
   ========================================================================== */

// 1. Before / After Sliders
function initBeforeAfterSlider() {
  const premiumCards = document.querySelectorAll('.ba-premium-card');

  premiumCards.forEach(card => {
    const container = card.querySelector('.ba-slider-container');
    const beforeImg = card.querySelector('.ba-img-before');
    const handle = card.querySelector('.ba-handle');
    const range = card.querySelector('.ba-range-input');

    if (!container || !beforeImg || !handle || !range) return;

    let currentPosition = 50;
    let ticking = false;

    const updateSlider = () => {
      beforeImg.style.clipPath = `inset(0 ${100 - currentPosition}% 0 0)`;
      handle.style.left = `${currentPosition}%`;
      range.value = currentPosition;
      ticking = false;
    };

    const requestUpdate = (pos) => {
      currentPosition = Math.max(0, Math.min(100, pos));
      if (!ticking) {
        requestAnimationFrame(updateSlider);
        ticking = true;
      }
    };

    range.addEventListener('input', () => requestUpdate(range.value));
    requestUpdate(Number(range.value) || 50);
    window.addEventListener('resize', () => requestUpdate(currentPosition));
  });
}


// 2. Fullscreen Hero Slider
function initHeroSlider() {
  const heroSection = document.getElementById('home');
  const slides = document.querySelectorAll('.hero-bg-slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let interval;
  let isMobile = window.innerWidth < 768;
  let slideDelay = isMobile ? 5000 : 6000;

  const updateDots = () => {
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateDots();
  };

  const startAuto = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, slideDelay);
  };

  const resetAuto = () => {
    startAuto();
  };

  // Wire up pagination dot click actions
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAuto();
    });
  });

  // Touch Swipe Support
  if (heroSection) {
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left -> next slide
          goToSlide(currentIndex + 1);
        } else {
          // Swiped right -> prev slide
          goToSlide(currentIndex - 1);
        }
        resetAuto();
      }
    };
  }

  // Handle responsive resize updates for slide delays
  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;
    if (wasMobile !== isMobile) {
      slideDelay = isMobile ? 5000 : 6000;
      resetAuto();
    }
  });

  startAuto();
}

// 3. Testimonials Carousel
function initTestimonialCarousel() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoTimer;
  let cardsPerView = 1;

  const getCardsPerView = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const getMaxIndex = () => Math.max(0, cards.length - getCardsPerView());

  const buildDots = () => {
    if (!dotsContainer) return;
    const max = getMaxIndex();
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= max; i++) {
      const btn = document.createElement('button');
      btn.className = 'testimonial-dot-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => { goToSlide(i); resetAuto(); });
      dotsContainer.appendChild(btn);
    }
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.testimonial-dot-btn').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '24');
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  };

  const startAuto = () => { autoTimer = setInterval(() => goToSlide(currentIndex + 1 > getMaxIndex() ? 0 : currentIndex + 1), 5000); };
  const stopAuto = () => clearInterval(autoTimer);
  const resetAuto = () => { stopAuto(); startAuto(); };

  prevBtn?.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAuto(); });

  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);

  // Touch
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    resetAuto();
  }, { passive: true });

  window.addEventListener('resize', () => {
    buildDots();
    goToSlide(Math.min(currentIndex, getMaxIndex()));
  });

  buildDots();
  startAuto();
}

// 4. FAQ Accordion
function initAccordion() {
  const accordionItems = document.querySelectorAll('.faq-acc-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.faq-acc-header');
    const content = item.querySelector('.faq-acc-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const c = other.querySelector('.faq-acc-content');
          if (c) c.style.maxHeight = null;
          other.querySelector('.faq-acc-header')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Export
window.Carousel = {
  initBeforeAfterSlider,
  initHeroSlider,
  initTestimonialCarousel,
  initAccordion
};
