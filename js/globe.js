(function initializeGlobe() {
    const art = document.querySelector('.hero-art');
    const moon = art?.querySelector('.orb-moon');
    if (!moon) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let frame = null;
    let previousTime = 0;
    let angle = 2.3;
    let radius = 0;
    const tilt = 6.6 * Math.PI / 180;

    function positionMoon() {
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * .3;
        const horizontal = x * Math.cos(tilt) - y * Math.sin(tilt);
        const vertical = x * Math.sin(tilt) + y * Math.cos(tilt);
        moon.style.transform = `translate(${horizontal}px, ${vertical}px)`;
        moon.style.zIndex = Math.sin(angle) >= 0 ? '2' : '0';
    }

    function animate(time) {
        const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
        previousTime = time;
        angle -= elapsed * Math.PI * 2 / 72000;
        positionMoon();
        frame = requestAnimationFrame(animate);
    }

    function syncMotion() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = 0;
        const paused = !visible || document.hidden || motion.matches;
        art.classList.toggle('is-paused', paused);
        positionMoon();
        if (!paused) frame = requestAnimationFrame(animate);
    }

    function resize() {
        radius = art.getBoundingClientRect().width * .5481;
        positionMoon();
    }

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            syncMotion();
        }).observe(art);
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(art);
    else window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', syncMotion);
    motion.addEventListener('change', syncMotion);
    resize();
    syncMotion();
})();
