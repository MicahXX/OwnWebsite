const words = ["Developer", "Student", "Coder", "Plugin Developer"];
const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    typingElement.textContent = currentWord.substring(0, charIndex);
    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (!isDeleting) {
        isDeleting = true;
        speed = 1500;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const minTime = 1500;
    const startTime = performance.now();

    function hideLoader() {
        loader.classList.add("hidden");
        typeEffect();
    }

    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minTime - elapsed);
    setTimeout(hideLoader, remaining);
});


