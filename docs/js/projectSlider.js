const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: false,
    arrows: true,
    pagination: true,
    speed: 500,
    resetProgress: false,
}).mount();

let typed = '';
const secret = 'micah';

document.addEventListener('keydown', e => {
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