// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// WhatsApp Form Submission
const appointmentForm = document.getElementById("appointment-form");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value;

    if (!name || !phone || !service || !date || !time) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let whatsappMessage = `*Booking Request from Yogita Makeovers Website*\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    whatsappMessage += `*Service:* ${service}\n`;
    whatsappMessage += `*Date:* ${formattedDate}\n`;
    whatsappMessage += `*Time:* ${time}\n`;

    if (message) {
      whatsappMessage += `*Additional Notes:* ${message}\n`;
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/917032985242?text=${encodedMessage}`;

    window.location.href = whatsappURL;
  });
}

// Function to fetch data from Google Sheets using CSV link
async function fetchCSVData(sheetURL) {
  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const rows = text.split("\n").slice(1);

    return rows.map(row => {
      const columns = row.split(",");
      return {
        title: columns[0]?.replace(/"/g, '') || '',
        category: columns[1]?.replace(/"/g, '') || '',
        imageUrl: columns[2]?.replace(/"/g, '') || '',
        redirectUrl: columns[3]?.replace(/"/g, '') || ''
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Populate gallery
async function populateGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = '<div class="loading-spinner"></div>'; // Show spinner

  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwKmK_a30EZ5qD2Y14wQ9zTTnqYNFwM2--XIZ94Ae7BSgaK6yftdAW92bfOw17xrLpT5eTJgumfzPm/pub?output=csv";
  const data = await fetchCSVData(sheetURL);

  if (data.length === 0) {
    galleryContainer.innerHTML = '<p class="no-data">No gallery items found.</p>';
    return;
  }

  galleryContainer.innerHTML = ''; // Clear spinner

  data.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    galleryItem.innerHTML = `
      <div class="image-container">
        <img src="${item.imageUrl}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='fallback.jpg';">
      </div>
      <p class="gallery-text">${item.title}</p>
      <small>${item.category}</small>
    `;

    galleryContainer.appendChild(galleryItem);
  });
}

// Populate reels
async function populateReels() {
  const reelsContainer = document.getElementById('reels-container');
  reelsContainer.innerHTML = '<div class="loading-spinner"></div>'; // Show spinner

  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSaAeNrBUirVq06nS0basFdmTBsFJrzqHVKnjPsffZ2lHlgvu3g0c1g524XEujFIdD0e5Mh6uJP5Kyz/pub?output=csv";
  const data = await fetchCSVData(sheetURL);

  if (data.length === 0) {
    reelsContainer.innerHTML = '<p class="no-data">No reels found.</p>';
    return;
  }

  reelsContainer.innerHTML = ''; // Clear spinner

  data.forEach(item => {
    const reelItem = document.createElement('div');
    reelItem.className = 'reel-item';

    reelItem.innerHTML = `
      <div class="image-container">
        <img src="${item.imageUrl}" alt="${item.title}" class="reel-img" loading="lazy" onerror="this.src='fallback.jpg';">
      </div>
      <h3>${item.title}</h3>
      <p>${item.category}</p>
    `;

    reelsContainer.appendChild(reelItem);
  });
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  populateReels();
});
