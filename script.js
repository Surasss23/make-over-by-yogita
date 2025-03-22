// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-times");
  icon.classList.toggle("fa-bars");
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
  navbar.classList.toggle("scrolled", window.scrollY > 50);
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
  
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let whatsappMessage = `*Booking Request from Yogita Makeovers Website*\n\n`;
  whatsappMessage += `*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${formattedDate}\n*Time:* ${time}\n`;
  if (message) {
    whatsappMessage += `*Additional Notes:* ${message}\n`;
  }

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/917989386499?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
});


// Fetch data from Google Sheets
async function fetchAndDisplayData(sheetURL, containerId) {
  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip header
    const container = document.getElementById(containerId);

    if (!rows.length) {
      container.innerHTML = '<p>No data available</p>';
      return;
    }

    rows.forEach(row => {
      const [title, description, url] = row.split(',');
      const embedHTML = convertToEmbed(url.trim());

      const item = document.createElement('div');
      item.className = containerId === 'gallery-container' ? 'gallery-item' : 'reel-item';

      item.innerHTML = `
        ${embedHTML}
        <div class="reel-title">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `;
      container.appendChild(item);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Gallery and Reels Data
fetchAndDisplayData('https://docs.google.com/spreadsheets/d/e/2PACX-1vSwKmK_a30EZ5qD2Y14wQ9zTTnqYNFwM2--XIZ94Ae7BSgaK6yftdAW92bfOw17xrLpT5eTJgumfzPm/pub?output=csv', 'gallery-container');
fetchAndDisplayData('https://docs.google.com/spreadsheets/d/e/2PACX-1vSaAeNrBUirVq06nS0basFdmTBsFJrzqHVKnjPsffZ2lHlgvu3g0c1g524XEujFIdD0e5Mh6uJP5Kyz/pub?output=csv', 'reels-container');

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Floating Animation
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.btn-primary, .section-header h2');
  elementsToAnimate.forEach(element => {
    element.classList.add('floating');
  });
});
