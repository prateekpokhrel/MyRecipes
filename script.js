// Basic interactions: mobile menu toggle, search filter, animations, and pagination stub.

document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic year if footer exists
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      mainNav.style.display = mainNav.classList.contains('open') ? 'block' : '';
    });
  }

  // Initialize Feather icons (only if available locally)
  if (window.feather) {
    feather.replace();
  }

  // Scroll animations for review cards (only on reviews.html)
  if (window.ScrollReveal && document.querySelector('.review-card')) {
    ScrollReveal().reveal('.review-card', {
      interval: 120,
      distance: '40px',
      origin: 'bottom',
      duration: 800,
      easing: 'ease-out',
    });
  }

  // Review form (reviews.html)
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✨ Thank you for your feedback! Your review means a lot.');
      reviewForm.reset();
    });
  }

  // Recipe filtering (recipes.html)
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const filterCategory = document.getElementById('filter-category');
  const filterTime = document.getElementById('filter-time');
  const clearBtn = document.getElementById('clear-filters');
  const cards = Array.from(document.querySelectorAll('#recipes-grid .card'));
  const pageInfo = document.getElementById('page-info');

  if (searchForm && searchInput && filterCategory && filterTime && clearBtn && cards.length) {
    function applyFilters() {
      const q = (searchInput.value || '').trim().toLowerCase();
      const cat = filterCategory.value;
      const time = filterTime.value ? parseInt(filterTime.value, 10) : null;
      let visible = 0;

      cards.forEach((card) => {
        const title = (card.dataset.title || '').toLowerCase();
        const category = card.dataset.category || '';
        const cardTime = parseInt(card.dataset.time || '0', 10);

        let ok = true;
        if (q && !title.includes(q)) ok = false;
        if (cat && category !== cat) ok = false;
        if (time && !(cardTime <= time)) ok = false;

        card.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });

      if (pageInfo) {
        pageInfo.textContent = `Showing ${visible} recipe${visible === 1 ? '' : 's'}`;
      }
    }

    // Bind events
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
    });

    [searchInput, filterCategory, filterTime].forEach((el) => {
      el.addEventListener('input', applyFilters);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterCategory.value = '';
      filterTime.value = '';
      applyFilters();
    });

    // Initial filter run
    applyFilters();
  }

    // Pagination logic (recipes.html)
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfoEl = document.getElementById('page-info');
  const recipeCards = Array.from(document.querySelectorAll('.recipe-card, #recipes-grid .card'));
  const recipesPerPage = 6;
  let currentPage = 1;

  if (prevBtn && nextBtn && recipeCards.length) {
    const totalPages = Math.ceil(recipeCards.length / recipesPerPage);

    function showPage(page) {
      recipeCards.forEach((card, index) => {
        card.style.display =
          index >= (page - 1) * recipesPerPage && index < page * recipesPerPage
            ? 'block'
            : 'none';
      });

      // Update pagination info
      if (pageInfoEl) pageInfoEl.textContent = `Page ${page} of ${totalPages}`;

      // Enable/disable buttons
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    }

    // Button event handlers
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });

    // Initial render
    showPage(currentPage);
  }
});


