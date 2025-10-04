// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

const tabButtons = document.querySelectorAll(".tab-btn")
const galleryTabs = document.querySelectorAll(".gallery-tab")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all buttons and tabs
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    galleryTabs.forEach((tab) => {
      tab.classList.remove("active")
      tab.style.opacity = "0"
    })

    // Add active class to clicked button
    button.classList.add("active")

    // Add active class to corresponding tab with fade-in effect
    setTimeout(() => {
      const targetTabElement = document.getElementById(targetTab)
      targetTabElement.classList.add("active")
      targetTabElement.style.opacity = "1"
    }, 150)
  })
})

document.addEventListener("DOMContentLoaded", () => {
  galleryTabs.forEach((tab, index) => {
    if (index === 0) {
      tab.style.opacity = "1"
    } else {
      tab.style.opacity = "0"
    }
  })
})

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    const overlay = item.querySelector(".gallery-overlay")
    const title = overlay.querySelector("h4").textContent
    const description = overlay.querySelector("p").textContent

    // Create a simple modal/lightbox effect
    const modal = document.createElement("div")
    modal.className = "gallery-modal"
    modal.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
          <div class="modal-info">
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    // Close modal functionality
    const closeModal = () => {
      document.body.removeChild(modal)
      document.body.style.overflow = "auto"
    }

    modal.querySelector(".modal-close").addEventListener("click", closeModal)
    modal.querySelector(".modal-backdrop").addEventListener("click", (e) => {
      if (e.target === modal.querySelector(".modal-backdrop")) {
        closeModal()
      }
    })

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal()
        document.removeEventListener("keydown", handleEscape)
      }
    }
    document.addEventListener("keydown", handleEscape)
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Hero Scroll Button
const heroScroll = document.querySelector(".hero-scroll")
if (heroScroll) {
  heroScroll.addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({
      behavior: "smooth",
    })
  })
}

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".about-card, .gallery-item, .event-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = newsletterForm.querySelector('input[type="email"]').value

    // Simple validation
    if (email && email.includes("@")) {
      // Here you would typically send the email to your server
      alert("Thank you for subscribing! We'll keep you updated with our latest news and events.")
      newsletterForm.reset()
    } else {
      alert("Please enter a valid email address.")
    }
  })
}

// Join Us Modal Functionality
const joinModal = document.getElementById("joinModal")
const joinForm = document.getElementById("joinForm")
const closeJoinModal = document.getElementById("closeJoinModal")
const cancelJoin = document.getElementById("cancelJoin")

// Show modal function
function showJoinModal() {
  joinModal.classList.add("show")
  document.body.style.overflow = "hidden"
  // Focus on first input
  setTimeout(() => {
    const firstInput = joinForm.querySelector("input")
    if (firstInput) firstInput.focus()
  }, 100)
}

// Hide modal function
function hideJoinModal() {
  joinModal.classList.remove("show")
  document.body.style.overflow = "auto"
  // Reset form
  joinForm.reset()
  // Hide success message if visible
  const successMessage = joinForm.querySelector(".success-message")
  if (successMessage) {
    successMessage.classList.remove("show")
  }
}

// Event listeners for modal
closeJoinModal.addEventListener("click", hideJoinModal)
cancelJoin.addEventListener("click", hideJoinModal)

// Close modal when clicking backdrop
joinModal.addEventListener("click", (e) => {
  if (e.target === joinModal) {
    hideJoinModal()
  }
})

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && joinModal.classList.contains("show")) {
    hideJoinModal()
  }
})

// Form submission handler
joinForm.addEventListener("submit", (e) => {
  e.preventDefault()
  
  // Get form data
  const formData = new FormData(joinForm)
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    age: formData.get("age"),
    interests: formData.getAll("interest"),
    message: formData.get("message"),
    newsletter: formData.get("newsletter") === "yes"
  }
  
  // Basic validation
  if (!data.fullName || !data.email) {
    alert("Please fill in all required fields (Name and Email)")
    return
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address")
    return
  }
  
  // Show success message
  showSuccessMessage()
  
  // Here you would typically send the data to your server
  console.log("Form submitted:", data)
  
  // For demo purposes, we'll just show a success message
  // In a real implementation, you would send this data to your backend
})

// Show success message function
function showSuccessMessage() {
  // Remove existing success message if any
  const existingMessage = joinForm.querySelector(".success-message")
  if (existingMessage) {
    existingMessage.remove()
  }
  
  // Create success message
  const successMessage = document.createElement("div")
  successMessage.className = "success-message show"
  successMessage.innerHTML = `
    <h3>Thank You!</h3>
    <p>We've received your information and will be in touch with you soon. Welcome to our community!</p>
  `
  
  // Insert at the top of the form
  joinForm.insertBefore(successMessage, joinForm.firstChild)
  
  // Scroll to top of form
  successMessage.scrollIntoView({ behavior: "smooth", block: "start" })
  
  // Hide form and show only success message
  const formContent = joinForm.querySelectorAll(".form-group, .form-actions")
  formContent.forEach(element => {
    element.style.display = "none"
  })
  
  // Show close button in success message
  setTimeout(() => {
    const closeButton = document.createElement("button")
    closeButton.className = "btn btn-primary"
    closeButton.textContent = "Close"
    closeButton.style.marginTop = "1rem"
    closeButton.addEventListener("click", hideJoinModal)
    successMessage.appendChild(closeButton)
  }, 1000)
}

// CTA Button Actions
document.querySelectorAll(".cta-buttons .btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonText = button.textContent.trim()

    switch (buttonText) {
      case "Join Us":
        showJoinModal()
        break
      case "Donate":
        // Redirect to donation page
        alert(
          "Thank you for your heart to give! Our donation page will be available soon. Please contact us for donation information.",
        )
        break
      case "Contact Us":
        // Scroll to footer or show contact modal
        document.querySelector(".footer").scrollIntoView({
          behavior: "smooth",
        })
        break
    }
  })
})

// Add loading animation for images - IMPROVED VERSION
document.querySelectorAll("img").forEach((img) => {
  // Skip hero background image from loading animation
  if (img.classList.contains('hero-bg-image')) {
    img.style.opacity = "1"
    return
  }
  
  // Skip gallery images from loading animation to prevent loading issues
  if (img.closest('.gallery-item')) {
    img.style.opacity = "1"
    return
  }
  
  // Only apply loading animation to other images
  if (img.complete && img.naturalHeight !== 0) {
    img.style.opacity = "1"
  } else {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })
    
    // Add error handling
    img.addEventListener("error", () => {
      console.warn(`Failed to load image: ${img.src}`)
      img.style.opacity = "1" // Show broken image icon
    })
  }

  img.style.opacity = "0"
  img.style.transition = "opacity 0.3s ease"
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    const focusableContent = document.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent[0]
    const lastFocusableElement = focusableContent[focusableContent.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        e.preventDefault()
      }
    }
  }
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Testimony Section Functionality
let currentTestimonyIndex = 0;
let filteredTestimonies = [];
let allTestimonies = [];

// Initialize testimony functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeTestimonySection();
});

function initializeTestimonySection() {
  // Get all testimony photo items
  allTestimonies = Array.from(document.querySelectorAll('.testimony-photo-item'));
  filteredTestimonies = [...allTestimonies];
  
  // Set up testimony photo click handlers
  setupTestimonyPhotoHandlers();
  
  // Set up category filter handlers
  setupCategoryFilters();
  
  // Set up share testimony modal handlers
  setupShareTestimonyHandlers();
  
  // Set up keyboard navigation for testimony modal
  setupTestimonyKeyboardNavigation();
}

// Testimony Photo Gallery Modal System
function setupTestimonyPhotoHandlers() {
  document.querySelectorAll('.testimony-photo-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      currentTestimonyIndex = index;
      showTestimonyModal(item);
    });
  });
}

function showTestimonyModal(testimonyItem) {
  const img = testimonyItem.querySelector('.testimony-photo');
  const overlay = testimonyItem.querySelector('.testimony-overlay');
  const title = overlay.querySelector('h4').textContent;
  const description = overlay.querySelector('p').textContent;
  const category = testimonyItem.getAttribute('data-testimony');

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'testimony-modal show';
  modal.innerHTML = `
    <div class="testimony-modal-backdrop">
      <div class="testimony-modal-content">
        <button class="testimony-modal-close">&times;</button>
        <img src="${img.src}" alt="${img.alt}" class="testimony-modal-image">
        <div class="testimony-modal-info">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="testimony-modal-navigation">
            <button class="testimony-nav-btn" id="prevTestimony" ${currentTestimonyIndex === 0 ? 'disabled' : ''}>
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <div class="testimony-counter">${currentTestimonyIndex + 1} of ${filteredTestimonies.length}</div>
            <button class="testimony-nav-btn" id="nextTestimony" ${currentTestimonyIndex === filteredTestimonies.length - 1 ? 'disabled' : ''}>
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Set up modal event handlers
  setupTestimonyModalHandlers(modal);
}

function setupTestimonyModalHandlers(modal) {
  // Close modal
  const closeModal = () => {
    document.body.removeChild(modal);
    document.body.style.overflow = 'auto';
  };

  modal.querySelector('.testimony-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.testimony-modal-backdrop').addEventListener('click', (e) => {
    if (e.target === modal.querySelector('.testimony-modal-backdrop')) {
      closeModal();
    }
  });

  // Navigation handlers
  const prevBtn = modal.querySelector('#prevTestimony');
  const nextBtn = modal.querySelector('#nextTestimony');
  const counter = modal.querySelector('.testimony-counter');
  const modalImage = modal.querySelector('.testimony-modal-image');
  const modalTitle = modal.querySelector('h3');
  const modalDescription = modal.querySelector('p');

  prevBtn.addEventListener('click', () => {
    if (currentTestimonyIndex > 0) {
      currentTestimonyIndex--;
      updateTestimonyModal(modalImage, modalTitle, modalDescription, counter, prevBtn, nextBtn);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentTestimonyIndex < filteredTestimonies.length - 1) {
      currentTestimonyIndex++;
      updateTestimonyModal(modalImage, modalTitle, modalDescription, counter, prevBtn, nextBtn);
    }
  });

  // Keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft' && currentTestimonyIndex > 0) {
      currentTestimonyIndex--;
      updateTestimonyModal(modalImage, modalTitle, modalDescription, counter, prevBtn, nextBtn);
    } else if (e.key === 'ArrowRight' && currentTestimonyIndex < filteredTestimonies.length - 1) {
      currentTestimonyIndex++;
      updateTestimonyModal(modalImage, modalTitle, modalDescription, counter, prevBtn, nextBtn);
    } else if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeydown);
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // Clean up event listener when modal closes
  const originalCloseModal = closeModal;
  modal.closeModal = () => {
    document.removeEventListener('keydown', handleKeydown);
    originalCloseModal();
  };
}

function updateTestimonyModal(image, title, description, counter, prevBtn, nextBtn) {
  const currentTestimony = filteredTestimonies[currentTestimonyIndex];
  const img = currentTestimony.querySelector('.testimony-photo');
  const overlay = currentTestimony.querySelector('.testimony-overlay');
  const overlayTitle = overlay.querySelector('h4').textContent;
  const overlayDescription = overlay.querySelector('p').textContent;

  // Update modal content
  image.src = img.src;
  image.alt = img.alt;
  title.textContent = overlayTitle;
  description.textContent = overlayDescription;
  counter.textContent = `${currentTestimonyIndex + 1} of ${filteredTestimonies.length}`;

  // Update button states
  prevBtn.disabled = currentTestimonyIndex === 0;
  nextBtn.disabled = currentTestimonyIndex === filteredTestimonies.length - 1;
}

// Category Filter Functionality
function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter testimonies
      filterTestimonies(category);
    });
  });
}

function filterTestimonies(category) {
  const testimonyGrid = document.querySelector('.testimony-photos-grid');
  
  if (category === 'all') {
    filteredTestimonies = [...allTestimonies];
  } else {
    filteredTestimonies = allTestimonies.filter(item => 
      item.getAttribute('data-testimony') === category
    );
  }
  
  // Update display
  allTestimonies.forEach(item => {
    if (filteredTestimonies.includes(item)) {
      item.style.display = 'block';
      item.style.animation = 'fadeInUp 0.5s ease forwards';
    } else {
      item.style.display = 'none';
    }
  });
  
  // Reset current index
  currentTestimonyIndex = 0;
  
  // Show message if no testimonies found
  showFilterMessage(filteredTestimonies.length === 0);
}

function showFilterMessage(noResults) {
  // Remove existing message
  const existingMessage = document.querySelector('.filter-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  if (noResults) {
    const message = document.createElement('div');
    message.className = 'filter-message';
    message.style.cssText = `
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--gray-500);
      font-size: 1.125rem;
    `;
    message.innerHTML = `
      <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
      <p>No testimonies found in this category.</p>
    `;
    
    const grid = document.querySelector('.testimony-photos-grid');
    grid.appendChild(message);
  }
}

// Share Testimony Modal Functionality
function setupShareTestimonyHandlers() {
  const shareTestimonyBtn = document.getElementById('shareTestimonyBtn');
  const submitPhotoBtn = document.getElementById('submitPhotoBtn');
  const shareTestimonyModal = document.getElementById('shareTestimonyModal');
  const shareTestimonyForm = document.getElementById('shareTestimonyForm');
  const closeShareTestimonyModal = document.getElementById('closeShareTestimonyModal');
  const cancelTestimony = document.getElementById('cancelTestimony');

  if (shareTestimonyBtn) {
    shareTestimonyBtn.addEventListener('click', showShareTestimonyModal);
  }

  if (submitPhotoBtn) {
    submitPhotoBtn.addEventListener('click', showShareTestimonyModal);
  }

  if (closeShareTestimonyModal) {
    closeShareTestimonyModal.addEventListener('click', hideShareTestimonyModal);
  }

  if (cancelTestimony) {
    cancelTestimony.addEventListener('click', hideShareTestimonyModal);
  }

  // Close modal when clicking backdrop
  if (shareTestimonyModal) {
    shareTestimonyModal.addEventListener('click', (e) => {
      if (e.target === shareTestimonyModal) {
        hideShareTestimonyModal();
      }
    });
  }

  // Form submission
  if (shareTestimonyForm) {
    shareTestimonyForm.addEventListener('submit', handleShareTestimonySubmission);
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareTestimonyModal && shareTestimonyModal.classList.contains('show')) {
      hideShareTestimonyModal();
    }
  });
}

function showShareTestimonyModal() {
  const modal = document.getElementById('shareTestimonyModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function hideShareTestimonyModal() {
  const modal = document.getElementById('shareTestimonyModal');
  const form = document.getElementById('shareTestimonyForm');
  
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
  
  // Reset form
  if (form) {
    form.reset();
    // Hide success message if visible
    const successMessage = form.querySelector('.success-message');
    if (successMessage) {
      successMessage.classList.remove('show');
    }
  }
}

function handleShareTestimonySubmission(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Get form data
  const data = {
    name: formData.get('testimonyName'),
    email: formData.get('testimonyEmail'),
    category: formData.get('testimonyCategory'),
    title: formData.get('testimonyTitle'),
    story: formData.get('testimonyStory'),
    photo: formData.get('testimonyPhoto'),
    consent: formData.get('testimonyConsent') === 'yes'
  };
  
  // Basic validation
  if (!data.name || !data.email || !data.category || !data.title || !data.story) {
    alert('Please fill in all required fields.');
    return;
  }
  
  if (!data.consent) {
    alert('Please consent to sharing your testimony.');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Show success message
  showShareTestimonySuccessMessage();
  
  // Here you would typically send the data to your server
  console.log('Testimony submitted:', data);
}

function showShareTestimonySuccessMessage() {
  const form = document.getElementById('shareTestimonyForm');
  if (!form) return;
  
  // Remove existing success message
  const existingMessage = form.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message show';
  successMessage.innerHTML = `
    <h3>Thank You for Sharing!</h3>
    <p>We've received your testimony and will review it for potential inclusion on our website. Your story can inspire others in their faith journey!</p>
  `;
  
  // Insert at the top of the form
  form.insertBefore(successMessage, form.firstChild);
  
  // Scroll to top of form
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Hide form and show only success message
  const formContent = form.querySelectorAll('.form-group, .form-actions');
  formContent.forEach(element => {
    element.style.display = 'none';
  });
  
  // Show close button in success message
  setTimeout(() => {
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-primary';
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '1rem';
    closeButton.addEventListener('click', hideShareTestimonyModal);
    successMessage.appendChild(closeButton);
  }, 1000);
}

// Keyboard Navigation for Testimony Modal
function setupTestimonyKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const modal = document.querySelector('.testimony-modal.show');
    if (!modal) return;
    
    if (e.key === 'Escape') {
      const closeBtn = modal.querySelector('.testimony-modal-close');
      if (closeBtn) closeBtn.click();
    }
  });
}

// Update testimony photo sources to use actual images from the testimony folder
function updateTestimonyImageSources() {
  const testimonyImages = document.querySelectorAll('.testimony-photo');
  const testimonyImagesMap = {
    'testimony1.jpg': 'assets/testimony/5983343271503580280.jpg',
    'testimony2.jpg': 'assets/testimony/5983343271503580282.jpg',
    'testimony3.jpg': 'assets/testimony/5983343271503580286.jpg',
    'testimony4.jpg': 'assets/testimony/5983343271503580287.jpg',
    'testimony5.jpg': 'assets/testimony/5983343271503580297.jpg',
    'testimony6.jpg': 'assets/testimony/5983343271503580300.jpg',
    'testimony7.jpg': 'assets/testimony/5983343271503580310.jpg',
    'testimony8.jpg': 'assets/testimony/5983343271503580313.jpg'
  };
  
  testimonyImages.forEach(img => {
    const src = img.getAttribute('src');
    const filename = src.split('/').pop();
    if (testimonyImagesMap[filename]) {
      img.src = testimonyImagesMap[filename];
    }
  });
}

// Initialize testimony image sources when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateTestimonyImageSources();
});

// Console message for developers
console.log("%c🙏 Rise Generation International Church Website", "color: #2563eb; font-size: 20px; font-weight: bold;")
console.log("%cBuilt with love for the rising generation", "color: #dc2626; font-size: 14px;")
console.log(
  "%cIf you're seeing this, you might be interested in joining our tech team!",
  "color: #8b5cf6; font-size: 12px;",
)
