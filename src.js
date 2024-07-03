let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

showSlides(); // Initial call to start slideshow automatically

// Optional: Next/prev controls
const prevButton = document.createElement("span");
prevButton.className = "prev";
prevButton.innerHTML = "&#10094;";
prevButton.onclick = () => {
    slideIndex--;
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    showSlides();
};
document.querySelector(".slideshow-container").appendChild(prevButton);

const nextButton = document.createElement("span");
nextButton.className = "next";
nextButton.innerHTML = "&#10095;";
nextButton.onclick = () => {
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    showSlides();
};
document.querySelector(".slideshow-container").appendChild(nextButton);