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
  }
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

// Manually Populate Gallery
function populateGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Clear loading message

  const galleryData = [
    {
      title: "Makeover 1",
      category: "Bridal",
      imageUrl: "https://i.ibb.co/tpNzR0gs/image.png",
      redirectUrl: "https://example.com/makeover1"
    },
    {
      title: "Makeover 2",
      category: "Party",
      imageUrl: "https://i.ibb.co/8nQngPcm/image.png",
      redirectUrl: "https://example.com/makeover2"
    },
    {
      title: "Makeover 3",
      category: "Casual",
      imageUrl: "https://i.ibb.co/vCPhN2kD/image.png",
      redirectUrl: "https://example.com/makeover3"
    },
    // Add more items as needed
  ];

  galleryData.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    galleryItem.innerHTML = `
      <a href="${item.redirectUrl}" target="_blank">
        <div class="image-container">
          <img src="${item.imageUrl}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='fallback.jpg';">
        </div>
        <p class="gallery-text">${item.title}</p>
        <small>${item.category}</small>
      </a>
    `;

    galleryContainer.appendChild(galleryItem);
  });
}

// Manually Populate Reels
function populateReels() {
  const reelsContainer = document.getElementById('reels-container');
  reelsContainer.innerHTML = ''; // Clear loading message

  const reelsData = [
    {
      title: "Reel 1",
      category: "Tutorial",
      imageUrl: "https://i.ibb.co/vvqG50bn/image.png",
      redirectUrl: "https://example.com/reel1"
    },
    {
      title: "Reel 2",
      category: "Transformation",
      imageUrl: "https://i.ibb.co/WWkjXFFn/image.png",
      redirectUrl: "https://example.com/reel2"
    },
    {
      title: "Reel 3",
      category: "Bridal Look",
      imageUrl: "https://i.ibb.co/p67Bb74L/image.png",
      redirectUrl: "https://example.com/reel3"
    },
    // Add more items as needed
  ];

  reelsData.forEach(item => {
    const reelItem = document.createElement('div');
    reelItem.className = 'reel-item';

    reelItem.innerHTML = `
      <a href="${item.redirectUrl}" target="_blank">
        <div class="image-container">
          <img src="${item.imageUrl}" alt="${item.title}" class="reel-img" loading="lazy" onerror="this.src='fallback.jpg';">
        </div>
        <h3>${item.title}</h3>
        <p>${item.category}</p>
      </a>
    `;

    reelsContainer.appendChild(reelItem);
  });
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  populateReels();
});
