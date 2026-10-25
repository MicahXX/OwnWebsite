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
    let selectedTarget = null;
    let settleTimer;

    function setActiveLink(active) {
        links.forEach((link, index) => {
            link.classList.toggle('active', index === active);
            if (index === active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    function updateActiveNav() {
        scheduled = false;
        if (selectedTarget !== null) return;
        const readingLine = Math.min(window.innerHeight * .35, 260);
        let active = 0;
        sections.forEach((section, index) => {
            if (section && section.getBoundingClientRect().top <= readingLine) active = index;
        });
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (atBottom && sections.length) active = sections.length - 1;
        setActiveLink(active);
    }

    function resumeScrollTracking() {
        clearTimeout(settleTimer);
        selectedTarget = null;
        updateActiveNav();
    }

    links.forEach((link, index) => {
        link.addEventListener('click', event => {
            if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !sections[index]) return;
            event.preventDefault();
            selectedTarget = index;
            setActiveLink(index);
            const hash = link.getAttribute('href');
            if (window.location.hash !== hash) window.history.pushState(null, '', hash);
            const top = sections[index].getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            clearTimeout(settleTimer);
            settleTimer = window.setTimeout(resumeScrollTracking, 1000);
        });
    });

    window.addEventListener('scroll', () => {
        if (selectedTarget !== null) {
            clearTimeout(settleTimer);
            settleTimer = window.setTimeout(resumeScrollTracking, 180);
            return;
        }
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(updateActiveNav);
    }, { passive: true });
    window.addEventListener('wheel', resumeScrollTracking, { passive: true });
    window.addEventListener('touchstart', resumeScrollTracking, { passive: true });
    window.addEventListener('keydown', event => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
            resumeScrollTracking();
        }
    });
    window.addEventListener('resize', resumeScrollTracking);
    window.addEventListener('popstate', resumeScrollTracking);
    window.addEventListener('load', updateActiveNav);
    updateActiveNav();
})();
