const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 10000,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
    speed: 500,
    resetProgress: false,
}).mount();

splide.on('move', () => {
    splide.Components.Autoplay.pause();
    setTimeout(() => splide.Components.Autoplay.play(), 1000);
});

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