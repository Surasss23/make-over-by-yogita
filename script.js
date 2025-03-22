// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  
  // Change hamburger icon to X when nav is open
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// Close mobile nav when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// WhatsApp Form Submission
document.getElementById("appointment-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value;
  
  // Format the date
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Create WhatsApp message
  let whatsappMessage = `*Booking Request from Yogita Makeovers Website*\n\n`;
  whatsappMessage += `*Name:* ${name}\n`;
  whatsappMessage += `*Phone:* ${phone}\n`;
  whatsappMessage += `*Service:* ${service}\n`;
  whatsappMessage += `*Date:* ${formattedDate}\n`;
  whatsappMessage += `*Time:* ${time}\n`;
  
  if (message) {
    whatsappMessage += `*Additional Notes:* ${message}\n`;
  }
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // Create the WhatsApp URL
  const whatsappURL = `https://wa.me/917989386499?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappURL, '_blank');
});

// Function to fetch data from Google Sheets
async function fetchFromSheet(sheetId, range) {
  try {
    // In a real implementation, you would use Google Sheets API
    // This is a simplified example for demonstration
    // You'll need to replace these with actual API calls
    
    // For gallery (this is a placeholder, will be replaced with actual API call)
    if (range.includes('gallery')) {
      return createPlaceholderGallery();
    }
    // For reels (this is a placeholder, will be replaced with actual API call)
    else if (range.includes('reels')) {
      return createPlaceholderReels();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Create placeholder gallery items until Google Sheets is connected
function createPlaceholderGallery() {
  const galleryItems = [];
  
  // Create 6 placeholder items
  for (let i = 1; i <= 6; i++) {
    galleryItems.push({
      id: i,
      title: `Makeup Look ${i}`,
      category: ['Bridal', 'Party', 'Engagement'][i % 3]
    });
  }
  
  return galleryItems;
}

// Create placeholder reels items until Google Sheets is connected
function createPlaceholderReels() {
  const reelItems = [];
  
  // Create 5 placeholder items
  const titles = ['Bridal Makeup', 'Party Look', 'Natural Glam', 'Evening Elegance', 'Festival Beauty'];
  
  for (let i = 0; i < 5; i++) {
    reelItems.push({
      id: i + 1,
      title: titles[i],
      description: `Beautiful ${titles[i].toLowerCase()} tutorial and inspiration.`
    });
  }
  
  return reelItems;
}

// Populate gallery with items
async function populateGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const data = await fetchFromSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vSwKmK_a30EZ5qD2Y14wQ9zTTnqYNFwM2--XIZ94Ae7BSgaK6yftdAW92bfOw17xrLpT5eTJgumfzPm/pubhtml', 'gallery!A2:D');
  
  if (data.length === 0) {
    galleryContainer.innerHTML = '<p class="no-data">No gallery items found.</p>';
    return;
  }
  
  // Clear loading message
  galleryContainer.innerHTML = '';
  
  // Add gallery items
  data.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    galleryItem.innerHTML = `
      <div class="placeholder-content">
        <i class="fas fa-image placeholder-icon"></i>
        <p class="placeholder-text">${item.title}</p>
        <small>${item.category}</small>
      </div>
    `;
    
    galleryContainer.appendChild(galleryItem);
  });
}

// Populate reels section with items
async function populateReels() {
  const reelsContainer = document.getElementById('reels-container');
  const data = await fetchFromSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vSaAeNrBUirVq06nS0basFdmTBsFJrzqHVKnjPsffZ2lHlgvu3g0c1g524XEujFIdD0e5Mh6uJP5Kyz/pubhtml', 'reels!A2:D');
  
  if (data.length === 0) {
    reelsContainer.innerHTML = '<p class="no-data">No reels found.</p>';
    return;
  }
  
  // Clear loading message
  reelsContainer.innerHTML = '';
  
  // Add reel items
  data.forEach(item => {
    const reelItem = document.createElement('div');
    reelItem.className = 'reel-item';
    
    reelItem.innerHTML = `
      <div class="reel-placeholder">
        <i class="fas fa-video reel-placeholder-icon"></i>
      </div>
      <div class="reel-title">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    
    reelsContainer.appendChild(reelItem);
  });
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  populateReels();
  
  // Add loading spinners
  document.querySelector('.gallery-loading').innerHTML = '<span class="loading-spinner"></span> Loading gallery...';
  document.querySelector('.reels-loading').innerHTML = '<span class="loading-spinner"></span> Loading reels...';
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Add floating animation to some elements
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.btn-primary, .section-header h2');
  
  elementsToAnimate.forEach(element => {
    element.classList.add('floating');
  });
});
