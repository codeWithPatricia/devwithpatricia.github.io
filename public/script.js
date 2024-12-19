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


//cursor


