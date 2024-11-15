// Select elements
const carouselImages = document.querySelector(".carousel-images");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

let currentIndex = 0; // Keep track of the current slide
const totalImages = document.querySelectorAll(".carousel-images img").length;

// Function to update the carousel position
function updateCarousel() {
  const offset = -currentIndex * 100; // Calculate offset to shift slides
  carouselImages.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
  carouselImages.style.transform = `translateX(${offset}%)`;
}

// Left button event
leftBtn.addEventListener("click", () => {
  // Decrement currentIndex, but wrap around if it's 0 (i.e., go to the last image)
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
  updateCarousel();
  resetAutoSlide(); // Reset the timer when manually sliding
});

// Right button event
rightBtn.addEventListener("click", () => {
  // Increment currentIndex, but wrap around if it's the last image (i.e., go to the first image)
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
  resetAutoSlide(); // Reset the timer when manually sliding
});

// Auto-slide function
function autoSlide() {
  // Move to the next slide or wrap to the first
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}

// Set the interval for automatic sliding (change image every 5 seconds)
let slideInterval = setInterval(autoSlide, 5000); 

// Function to reset auto-slide timer when manually controlled
function resetAutoSlide() {
  clearInterval(slideInterval); // Clear the existing timer
  slideInterval = setInterval(autoSlide, 5000); // Restart the timer with a fresh interval
}
