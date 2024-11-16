// Select elements
const carouselImages = document.querySelector(".carousel-images");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const slide = document.querySelector(".slide");
const toggle = document.querySelector(".toogle");
const close = document.querySelector(".close");
const fix = document.querySelector("#fix");
const body = document.querySelector("body");

let currentIndex = 0; // Keep track of the current slide
const totalImages = document.querySelectorAll(".carousel-images img").length;

// Function to update the carousel position
function updateCarousel() {
  const offset = -currentIndex * 100; // Calculate offset to shift slides
  carouselImages.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
  carouselImages.style.transform = `translateX(${offset}%)`;

  // Temporarily disable buttons during transition
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  setTimeout(() => {
    leftBtn.disabled = false;
    rightBtn.disabled = false;
  }, 500); // Match transition duration
}

// Left button event
leftBtn.addEventListener("click", () => {
  // Decrement currentIndex, wrap to last image if at the beginning
  currentIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
  updateCarousel();
  resetAutoSlide(); // Reset timer when manually sliding
});

// Right button event
rightBtn.addEventListener("click", () => {
  // Increment currentIndex, wrap to first image if at the end
  currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
  updateCarousel();
  resetAutoSlide(); // Reset timer when manually sliding
});

// Auto-slide function
function autoSlide() {
  // Move to the next slide or wrap to the first
  currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
  updateCarousel();
}

// Set interval for automatic sliding (change image every 5 seconds)
let slideInterval = setInterval(autoSlide, 5000);

// Function to reset auto-slide timer
function resetAutoSlide() {
  clearInterval(slideInterval); // Clear existing timer
  slideInterval = setInterval(autoSlide, 5000); // Restart timer with fresh interval
}

// Toggle button to open the slider
toggle.addEventListener("click", () => {
  slide.classList.add("active");
  fix.style.display = "block";
  fix.style.zIndex="999"
  fix.style.opacity = "1";
  close.style.display = "block";
  close.style.opacity = "1";
  body.style.overflowY = "hidden"; // Prevent background scrolling
});

// Function to close the slider
function closeSlider() {
  slide.classList.remove("active");
  fix.style.zIndex = "none";
  fix.style.zIndex="-999"
  fix.style.opacity = "0";
  close.style.display = "none";
  close.style.opacity = "0";
  body.style.overflowY = "scroll"; // Restore background scrolling
}

// Close button event
close.addEventListener("click", closeSlider);

// Close slider by clicking outside the slider area
document.addEventListener("click", (event) => {
  if (
    slide.classList.contains("active") &&
    !slide.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    closeSlider();
  }
});

// Keyboard navigation for accessibility
document.addEventListener("keydown", (e) => {
  if (slide.classList.contains("active")) {
    if (e.key === "ArrowLeft") leftBtn.click(); // Navigate left
    if (e.key === "ArrowRight") rightBtn.click(); // Navigate right
    if (e.key === "Escape") closeSlider(); // Close slider
  }
});
