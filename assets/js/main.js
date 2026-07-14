/* ==========================================================================
   VASANTHA DENTAL CLINIC - MAIN ENTRY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Init
  if (window.Navigation) {
    window.Navigation.initStickyHeader();
    window.Navigation.initMobileMenu();
    window.Navigation.initSmoothScroll();
  }

  // Animations Init
  if (window.Animations) {
    window.Animations.initScrollReveal();
  }
  if (window.Utilities) {
    window.Utilities.initCountUp();
  }

  // Carousel, Sliders & Accordion Init
  if (window.Carousel) {
    window.Carousel.initBeforeAfterSlider();
    window.Carousel.initTestimonialCarousel();
    window.Carousel.initHeroSlider();
    window.Carousel.initAccordion();
  }

  // Booking Modal Init
  if (window.BookingModal) {
    window.BookingModal.init();
  }

  // Utilities Init
  if (window.Utilities) {
    window.Utilities.initScrollProgress();
  }

  console.log('Vasantha Dental Clinic app initialized successfully.');
});

// Hide Branded Loading Screen on Page Load
window.addEventListener('load', () => {
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(() => pageLoader.remove(), 600);
    }, 1000); // Quick 1s display for smooth loading UX
  }

  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => loadingScreen.remove(), 600);
    }, 1000); // Quick 1s display for results page loading screen
  }
});
