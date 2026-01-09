const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 4000,
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