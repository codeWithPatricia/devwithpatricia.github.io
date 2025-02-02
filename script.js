//  #home, #about, or other hash fragments in the URL 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1); // Get the section ID
    const targetElement = document.getElementById(targetId);

    // Scroll to the target section
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });

    // Use replaceState to remove the hash without reloading the page
    history.replaceState(null, null, ' ');
  });
});
// Preloader Script
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    preloader.style.display = 'none';
    content.style.display = 'block';
  }, 3000); // Display for 3 seconds
});

// Hamburger
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".close-icon");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});


//---------portfolio

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const links = [...document.querySelectorAll('.section')];

let isSmallScreen = window.innerWidth <= 768; // Check initial screen size

// Helper function for linear interpolation
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Preload all images
const images = [
  './image/Project1.png',
  './image/Project2.png',
  './image/Project3.png',
  './images/4.jpeg',
  './images/5.jpeg',
  './images/6.jpeg'
];

const imgArr = images.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

// Variables for tracking mouse and image states
let imgIndex = 0;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let percent = 0; // Scaling percentage for image
let target = 0;  // Determines whether to scale in/out

// Update mouse position
window.addEventListener('mousemove', (e) => {
  if (!isSmallScreen) {
    targetX = e.clientX;
    targetY = e.clientY;
  }
});

// Handle screen resize
window.addEventListener('resize', () => {
  isSmallScreen = window.innerWidth <= 768;
  if (isSmallScreen) {
    canvas.style.transform = 'translate3d(0, 0, 0)';
  }
});

// Draw image on the canvas
function drawImage(idx) {
  const img = imgArr[idx];

  // Ensure image dimensions are proportional to scaling percentage
  const scaledWidth = img.width * percent;
  const scaledHeight = img.height * percent;

  canvas.width = scaledWidth * window.devicePixelRatio;
  canvas.height = scaledHeight * window.devicePixelRatio;
  canvas.style.width = `${scaledWidth}px`;
  canvas.style.height = `${scaledHeight}px`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (percent > 0) {
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
  }
}

// Add hover listeners to sections
links.forEach((link, i) => {
  link.addEventListener('mouseenter', () => {
    if (!isSmallScreen) {
      imgIndex = i;
      target = 1; // Start scaling in
    }
  });

  link.addEventListener('mouseleave', () => {
    if (!isSmallScreen) {
      target = 0; // Start scaling out
    }
  });
});

// Animation loop
function animate() {
  if (!isSmallScreen) {
    // Smoothly interpolate canvas position
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);
    canvas.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }

  // Adjust scaling percentage
  if (target === 1 && percent < 1) {
    percent += 0.05;
  } else if (target === 0 && percent > 0) {
    percent -= 0.05;
  }

  drawImage(imgIndex);
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();




document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  // Function to count visible projects for each category
  function updateCounts() {
    const counts = {
      all: projectItems.length,
      design: 0,
      development: 0,
    };

    // Count visible items per category
    projectItems.forEach(item => {
      if (item.classList.contains('design')) counts.design++;
      if (item.classList.contains('development')) counts.development++;
    });

    // Update the count displayed in the buttons
    filterButtons.forEach(button => {
      const category = button.getAttribute('data-category');
      const countElement = button.querySelector('.count');
      if (countElement && counts[category] !== undefined) {
        countElement.textContent = `(${counts[category]})`;
      }
    });
  }

  // Function to update active tab and filter items
  function filterProjects(category) {
    // Update active button styles
    filterButtons.forEach(button => {
      button.classList.remove('bg-black', 'text-white', 'active');
      button.classList.add('bg-white', 'text-black');
    });

    const activeButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
    activeButton.classList.add('bg-black', 'text-white', 'active');
    activeButton.classList.remove('bg-white', 'text-black');

    // Show or hide project items
    projectItems.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Update the counts after filtering
    updateCounts();
  }

  // Initial setup
  updateCounts();
  filterProjects('all');

  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      filterProjects(category);
    });
  });
});


