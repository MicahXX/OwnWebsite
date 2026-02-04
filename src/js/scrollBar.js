let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrollBar = document.getElementById('scroll-bar');

            if (scrollBar) {
                scrollBar.style.width = `${(scrolled / height) * 100}%`;
            }

            ticking = false;
        });
        ticking = true;
    }
});