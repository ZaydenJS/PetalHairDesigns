// Enhanced JavaScript functionality for Enlighten Hair Design

// Smooth scrolling and animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initScrollAnimations();
  initParallaxEffects();
  initEnhancedInteractions();
  initScrollToTop();

  // Mobile menu functionality
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });
});

// Global toggleMenu function for onclick handlers
function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
}

  // Enhanced header scroll effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Change header background - consistent with all pages
    if (scrollTop > 100) {
      header.style.background = "rgba(26,26,26,0.98)";
    } else {
      header.style.background = "rgba(26,26,26,0.95)";
    }
  });
});

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .gallery-item, .news-article, .info-card, .value-card, .team-member"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// Parallax effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".hero");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Enhanced interactions
function initEnhancedInteractions() {
  // Smooth hover effects for cards
  const cards = document.querySelectorAll(
    ".service-card, .gallery-item, .news-article, .info-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
      this.style.borderColor = "var(--luxury-gold, #d4af37)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
      this.style.borderColor = "rgba(212, 175, 55, 0.1)";
    });
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll(
    ".cta-button, .filter-btn, .submit-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 15px 40px rgba(212, 175, 55, 0.4)";
      this.style.background = "linear-gradient(135deg, #b8941f, var(--luxury-gold, #d4af37))";
    });

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 8px 32px rgba(212, 175, 55, 0.3)";
      this.style.background = "linear-gradient(135deg, var(--luxury-gold, #d4af37), #b8941f)";
    });

    button.addEventListener("mousedown", function () {
      this.style.opacity = "0.9";
    });

    button.addEventListener("mouseup", function () {
      this.style.opacity = "1";
    });
  });
}

// Gallery filtering with smooth animations
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter items with animation
      galleryItems.forEach((item, index) => {
        const shouldShow =
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue;

        if (shouldShow) {
          setTimeout(() => {
            item.style.display = "block";
            item.style.opacity = "0";

            setTimeout(() => {
              item.style.opacity = "1";
            }, 50);
          }, index * 50);
        } else {
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Enhanced modal functionality
function initModalEnhancements() {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  // Close modal with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Prevent modal content clicks from closing modal
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Add loading animation to modal
  window.openModal = function (title, description, category) {
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalCategory = document.getElementById("modalCategory");
    const modalImage = document.getElementById("modalImage");

    // Add loading state
    modalImage.classList.add("loading");

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalImage.textContent = title;

    const categoryNames = {
      cuts: "Hair Cuts & Styling",
      coloring: "Hair Coloring",
      bridal: "Bridal & Events",
      treatments: "Hair Treatments",
      "before-after": "Before & After",
    };
    modalCategory.textContent = categoryNames[category] || category;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Remove loading state after animation
    setTimeout(() => {
      modalImage.classList.remove("loading");
    }, 1000);
  };

  window.closeModal = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
}

// Form enhancements
function initFormEnhancements() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      // Add floating label effect
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focused");
        }
      });

      // Real-time validation
      input.addEventListener("input", function () {
        validateField(this);
      });
    });

    // Enhanced form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");

      // Simulate form processing
      setTimeout(() => {
        submitBtn.textContent = "Sent!";
        submitBtn.classList.remove("loading");

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          this.reset();
        }, 2000);
      }, 2000);
    });
  });
}

// Field validation
function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  let isValid = true;

  // Remove existing validation classes
  field.classList.remove("valid", "invalid");

  // Basic validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
  } else if (type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (type === "tel" && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    isValid = phoneRegex.test(value);
  }

  // Add validation class
  field.classList.add(isValid ? "valid" : "invalid");

  return isValid;
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize all enhancements when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGalleryFilter();
  initModalEnhancements();
  initFormEnhancements();
  initLazyLoading();
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance optimizations
const optimizedScrollHandler = throttle(function () {
  // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Scroll to Top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');

  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  function toggleScrollToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) { // Show after scrolling down 300px
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  // Smooth scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Listen for scroll events
  window.addEventListener('scroll', throttle(toggleScrollToTopButton, 100));
}
