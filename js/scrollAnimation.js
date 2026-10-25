(function initializePageNavigation() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('scroll-show');
                observer.unobserve(entry.target);
            });
        }, { threshold: .08 });
        document.querySelectorAll('.scroll-hidden').forEach(element => observer.observe(element));
    }

    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.getAttribute('href')));
    let scheduled = false;

    function updateActiveNav() {
        const readingLine = Math.min(window.innerHeight * .35, 260);
        let active = 0;
        sections.forEach((section, index) => {
            if (section && section.getBoundingClientRect().top <= readingLine) active = index;
        });
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (atBottom && sections.length) active = sections.length - 1;
        links.forEach((link, index) => {
            link.classList.toggle('active', index === active);
            if (index === active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
        scheduled = false;
    }

    window.addEventListener('scroll', () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(updateActiveNav);
    }, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
    updateActiveNav();
})();
