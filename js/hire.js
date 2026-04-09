// ── Scroll bar ──────────────────────────────────────────
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

function launchShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    star.style.left = (-100 + Math.random() * window.innerWidth * 0.8) + 'px';
    star.style.top = (-30 - Math.random() * 180) + 'px';
    star.style.setProperty('--shoot-angle', (35 + Math.random() * 20) + 'deg');

    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
}

function scheduleShootingStar() {
    setTimeout(() => {
        launchShootingStar();
        scheduleShootingStar();
    }, 1500 + Math.random() * 3000);
}

scheduleShootingStar();