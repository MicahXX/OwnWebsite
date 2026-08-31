const scrollBar = document.getElementById('scroll-bar');
let ticking = false;
let fadeTimer;

window.addEventListener('scroll', () => {
    scrollBar.style.opacity = '1';
    clearTimeout(fadeTimer);

    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            scrollBar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
            ticking = false;
        });
        ticking = true;
    }

    fadeTimer = setTimeout(() => {
        scrollBar.style.opacity = '0';
    }, 1500);

}, {passive: true});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show');
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.15});

document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));