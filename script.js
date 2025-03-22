document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu functionality
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      document.body.classList.toggle('mobile-menu-open');
    });
  }
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      document.body.classList.remove('mobile-menu-open');
    });
  });
  
  // Navbar background on scroll
  const navbar = document.getElementById('navbar');
  
  function toggleNavbarBackground() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', toggleNavbarBackground);
  toggleNavbarBackground(); // Initial check
  
  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  function toggleScrollToTopBtn() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleScrollToTopBtn);
  toggleScrollToTopBtn(); // Initial check
  
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState({}, '', href);
        }
      }
    });
  });
  
  // Helper function to scroll to a section
  window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Set minimum date for date picker to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
  
  // Setup gallery
  setupGallery();
  
  // Setup reels
  setupReels();
  
  // Booking form submission
  const bookingForm = document.getElementById('booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const notes = document.getElementById('notes').value;
      
      if (!name || !service || !date || !time) {
        alert("Please fill in all required fields (name, service, date, and time)");
        return;
      }
      
      // Format date for better readability
      const formatDate = function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      
      // Format the WhatsApp message
      const message = `Hello Yogita! 👋
I'd like to book a makeup appointment:

Name: ${name}
Service: ${service}
Date: ${formatDate(date)}
Time: ${time}
${notes ? `Notes: ${notes}` : ""}

Thank you!`;
      
      // Create WhatsApp URL with phone number and encoded message
      // Directly open WhatsApp with the message
      // Note: Using encodeURIComponent for proper URL encoding
      const whatsappUrl = `https://wa.me/917032985242?text=${encodeURIComponent(message)}`;
      
      // Open in new tab (this is more reliable than window.location)
      window.open(whatsappUrl, "_blank");
    });
  }
});

// Gallery setup
function setupGallery() {
  const galleryContainer = document.querySelector('.gallery-grid');
  
  if (!galleryContainer) return;
  
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1503305189797-32c5cb3b6693',
      title: 'Bridal Makeup',
      category: 'Wedding'
    },
    {
      src: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8',
      title: 'Party Makeup',
      category: 'Event'
    },
    {
      src: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88',
      title: 'HD Makeup',
      category: 'Professional'
    },
    {
      src: 'https://images.unsplash.com/photo-1526045478516-99145907023c',
      title: 'Natural Look',
      category: 'Everyday'
    },
    {
      src: 'https://images.unsplash.com/photo-1588367166326-dd08e9134be0',
      title: 'Engagement Makeup',
      category: 'Engagement'
    },
    {
      src: 'https://images.unsplash.com/photo-1465463181267-1fb25be32990',
      title: 'Fashion Makeup',
      category: 'Fashion'
    }
  ];
  
  galleryImages.forEach((image, index) => {
    const delay = index * 0.1;
    const item = document.createElement('div');
    item.className = 'gallery-item animate-scale-in';
    item.style.animationDelay = `${delay}s`;
    
    item.innerHTML = `
      <img src="${image.src}" alt="${image.title}" loading="lazy">
      <div class="gallery-overlay">
        <h3 class="gallery-title">${image.title}</h3>
        <p class="gallery-category">${image.category}</p>
      </div>
    `;
    
    galleryContainer.appendChild(item);
  });
}

// Reels setup
function setupReels() {
  const reelsContainer = document.querySelector('.reels-grid');
  
  if (!reelsContainer) return;
  
  const reelsData = [
    {
      thumbnail: 'https://i.ibb.co/p67Bb74L/image.png',
      title: 'Bridal Makeup Tutorial',
      link: 'https://www.instagram.com/'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1560932503-5a9e5f0858b9',
      title: 'Evening Glam Transformation',
      link: 'https://www.instagram.com/'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796',
      title: 'Natural Makeup Look',
      link: 'https://www.instagram.com/'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1604872441539-ef1db9b25f92',
      title: 'Behind The Scenes',
      link: 'https://www.instagram.com/'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1607083681678-52733140f93a',
      title: 'Product Review',
      link: 'https://www.instagram.com/'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f',
      title: 'Client Testimonial',
      link: 'https://www.instagram.com/'
    }
  ];
  
  reelsData.forEach((reel, index) => {
    const delay = index * 0.1;
    const item = document.createElement('div');
    item.className = 'reel-item animate-scale-in';
    item.style.animationDelay = `${delay}s`;
    
    item.innerHTML = `
      <img src="${reel.thumbnail}" alt="${reel.title}" class="reel-thumbnail" loading="lazy">
      <div class="reel-play-button">
        <i data-lucide="play"></i>
      </div>
      <div class="reel-title">${reel.title}</div>
    `;
    
    item.addEventListener('click', function() {
      window.open(reel.link, '_blank');
    });
    
    reelsContainer.appendChild(item);
  });
  
  // Initialize any new icons that were added dynamically
  lucide.createIcons();
}
