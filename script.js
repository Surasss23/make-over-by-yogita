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
      src: 'https://i.ibb.co/NXss8K7/image.png',
      title: 'Bridal Makeup',
      category: 'Wedding'
    },
    {
      src: 'https://i.ibb.co/DfKrvR6Y/image.png',
      title: 'Party Makeup',
      category: 'Wedding'
    },
    {
      src: 'https://i.ibb.co/9mZJVYgg/image.png',
      title: 'HD Makeup',
      category: 'Professional'
    },
    {
      src: 'https://i.ibb.co/f7Sykr8/image.png',
      title: 'Natural Look',
      category: 'Everyday'
    },
    {
      src: 'https://i.ibb.co/VcJbQkmB/image.png',
      title: 'Engagement Makeup',
      category: 'Engagement'
    },
    {
      src: 'https://i.ibb.co/RkXTxyLK/image.png',
      title: 'Bridal Makeup',
      category: 'Wedding'
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
      thumbnail: 'https://i.ibb.co/Kjrwqs4M/image.png',
      title: '',
      link: 'https://www.instagram.com/reel/DJRWDIWSdDn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },

    {
      thumbnail: 'https://i.ibb.co/pByxz5GR/image.png',
      title: 'Client Testimonial',
      link: 'https://www.instagram.com/reel/DI6YbTISXxS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    
    {
      thumbnail: 'https://i.ibb.co/mChHsmvC/image.png',
      title: '',
      link: 'https://www.instagram.com/reel/DI3kdxaSz5c/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },

    {
      thumbnail: 'https://i.ibb.co/DgwqG4G5/image.png',
      title: 'Bridal Makeup Tutorial',
      link: 'https://www.instagram.com/reel/DHDwXRnojX6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      thumbnail: 'https://i.ibb.co/zVx2Jd7X/image.png',
      title: 'Evening Glam Transformation',
      link: 'https://www.instagram.com/reel/DHVz6-TSnr-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      thumbnail: 'https://i.ibb.co/xWtd43W/image.png',
      title: 'Natural Makeup Look',
      link: 'https://www.instagram.com/reel/DGxtPvwSQDX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      thumbnail: 'https://i.ibb.co/K3GWSh3/image.png',
      title: 'Behind The Scenes',
      link: 'https://www.instagram.com/reel/DEFU6OASbm9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      thumbnail: 'https://i.ibb.co/jtQCVkp/image.png',
      title: 'Makeover',
      link: 'https://www.instagram.com/reel/DHLiaUHIHkg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      thumbnail: 'https://i.ibb.co/TM75B7hd/image.png',
      title: 'Client Testimonial',
      link: 'https://www.instagram.com/reel/DBRCg_9hc-M/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
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
