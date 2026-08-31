new Splide('.review-splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 4000,
    speed: 800,
    easing: 'cubic-bezier(.42,0,.15,1)',
    pauseOnHover: true,
    pauseOnFocus: false,
    arrows: false,
    pagination: true,
    height: 'auto',
}).mount();