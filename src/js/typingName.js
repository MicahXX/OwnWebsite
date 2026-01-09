const words = ["Micah", "Mizkul", "Coder", "Minecraft Plugins"];
const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    typingElement.textContent = currentWord.substring(0, charIndex);
    let speed = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (!isDeleting) {
        isDeleting = true;
        speed = 1000;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
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