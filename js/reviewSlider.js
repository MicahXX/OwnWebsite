if (typeof Splide !== 'undefined') new Splide('.review-splide', {
    type: 'loop',
    perPage: 1,
    autoplay: false,
    interval: 4000,
    speed: 800,
    easing: 'cubic-bezier(.42,0,.15,1)',
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    pagination: true,
    height: 'auto',
    reducedMotion: { speed: 0, rewindSpeed: 0, autoplay: 'pause' },
}).mount();
