(function initializeProjectCarousel() {
    const carousel = document.getElementById('project-carousel');
    if (!carousel || typeof Splide === 'undefined') return;

    const titles = [...carousel.querySelectorAll('.splide__slide h3')].map(title => title.textContent);
    const position = carousel.querySelector('.project-position');
    const slider = new Splide(carousel, {
        type: 'loop',
        perPage: 1,
        autoplay: false,
        arrows: true,
        pagination: true,
        keyboard: 'focused',
        speed: 500,
        resetProgress: false,
        reducedMotion: { speed: 0, rewindSpeed: 0, autoplay: 'pause' },
    });
    function updatePosition() {
        const current = String(slider.index + 1).padStart(2, '0');
        const total = String(titles.length).padStart(2, '0');
        position.textContent = `${current} / ${total} · ${titles[slider.index]}`;
    }

    slider.on('mounted moved', updatePosition);
    slider.mount();
})();

let typed = '';
const secret = 'micah';

document.addEventListener('keydown', e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (e.key.length !== 1) return;

    typed += e.key.toLowerCase();
    typed = typed.slice(-secret.length);

    if (typed === secret) {
        const overlay = document.createElement('div');
        overlay.className = 'easter-egg-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('animationend', () => {
            overlay.remove();
        });

        typed = '';
    }
});
