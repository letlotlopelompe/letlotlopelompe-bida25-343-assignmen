const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");
const subtext = document.getElementById("hero-subtext");
const heroVideo = document.querySelector(".hero-video");

const slideTexts = [
    "Precision. Heritage. German craftsmanship.",
    "Exotic. Flamboyant. Uncompromising.",
    "Aura"
];

let currentSlide = 0;
let slideshowInterval;

function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });

    heroVideo.style.opacity = "0";
    heroVideo.pause();
    heroVideo.currentTime = 0;

    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    subtext.style.opacity = "0";

    setTimeout(() => {
        subtext.textContent = slideTexts[index];
        subtext.style.opacity = "1";
    }, 250);
}

function showVideo() {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });

    indicators[slides.length].classList.add("active");

    subtext.style.opacity = "0";

    heroVideo.currentTime = 0;
    heroVideo.style.opacity = "1";

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.log("Video playback interrupted:", error);
        });
    }
}

function nextStep() {
    if (currentSlide < slides.length - 1) {
        currentSlide = currentSlide + 1;
        showSlide(currentSlide);
    } else {
        clearInterval(slideshowInterval);
        showVideo();
    }
}

function startInterval() {
    slideshowInterval = setInterval(nextStep, 5000);
}

function startSlideshow() {
    clearInterval(slideshowInterval);
    currentSlide = 0;
    showSlide(currentSlide);
    startInterval();
}

heroVideo.addEventListener("ended", () => {
    startSlideshow();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        clearInterval(slideshowInterval);

        if (index < slides.length) {
            currentSlide = index;
            showSlide(currentSlide);
            startInterval();
        } else {
            showVideo();
        }
    });
});

/* NAVBAR REGIONS DROPDOWN */
const regionsTrigger = document.getElementById("regions-trigger");
const regionsDropdown = document.getElementById("regions-dropdown");

const europeOption = document.getElementById("europe-option");
const asiaOption = document.getElementById("asia-option");
const americaOption = document.getElementById("america-option");

const europeCountries = document.getElementById("europe-countries");
const asiaCountries = document.getElementById("asia-countries");
const americaCountries = document.getElementById("america-countries");

function hideAllCountryLists() {
    europeCountries.classList.remove("active");
    asiaCountries.classList.remove("active");
    americaCountries.classList.remove("active");
}

if (regionsTrigger && regionsDropdown) {
    regionsTrigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpening = !regionsDropdown.classList.contains("active");
        regionsDropdown.classList.toggle("active");

        if (!isOpening) {
            hideAllCountryLists();
        }
    });
}

if (europeOption && europeCountries) {
    europeOption.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        hideAllCountryLists();
        europeCountries.classList.add("active");
    });
}

if (asiaOption && asiaCountries) {
    asiaOption.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        hideAllCountryLists();
        asiaCountries.classList.add("active");
    });
}

if (americaOption && americaCountries) {
    americaOption.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        hideAllCountryLists();
        americaCountries.classList.add("active");
    });
}

document.addEventListener("click", (event) => {
    const navDropdown = document.querySelector(".nav-dropdown");

    if (navDropdown && !navDropdown.contains(event.target)) {
        regionsDropdown.classList.remove("active");
        hideAllCountryLists();
    }
});

startSlideshow();


