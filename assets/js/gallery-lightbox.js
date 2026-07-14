/**
 * Gallery Filter and Lightbox System
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox) return;

  let activeItems = Array.from(galleryItems);
  let currentIndex = 0;

  // 1. Gallery Filtering Logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Update activeItems array for lightbox navigation
      activeItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    });
  });

  // 2. Lightbox Open Logic
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Find current index of clicked item in activeItems list
      currentIndex = activeItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      
      openLightbox();
      updateLightboxContent();
    });
  });

  const openLightbox = () => {
    lightbox.style.display = 'flex';
    // Wait for display change to apply animation class
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    // Wait for transition to complete before setting display none
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 400);
    document.body.style.overflow = ''; // Restore background scrolling
  };

  const updateLightboxContent = () => {
    if (activeItems.length === 0) return;
    const currentItem = activeItems[currentIndex];
    const imgEl = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('h4');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }
    if (titleEl && lightboxCaption) {
      lightboxCaption.textContent = titleEl.textContent;
    }
  };

  const navigateLightbox = (direction) => {
    if (activeItems.length <= 1) return;
    
    // Smooth transition between slides: subtle fade
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + direction + activeItems.length) % activeItems.length;
      updateLightboxContent();
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  // Click events
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Close lightbox on clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    }
  });
});
