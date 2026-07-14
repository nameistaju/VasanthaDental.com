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
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 4500); // Display for 4.5 seconds to allow animations to finish
  }
});
