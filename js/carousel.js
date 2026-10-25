(function initializeCarousels() {
    document.querySelectorAll('.carousel').forEach(enhanceCarousel);

    function enhanceCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = [...carousel.querySelectorAll('.carousel-slide')];
        if (!track || slides.length < 2) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        const position = document.createElement('p');
        position.className = 'carousel-position';
        position.setAttribute('aria-live', 'polite');
        position.setAttribute('aria-atomic', 'true');
        const pagination = document.createElement('div');
        pagination.className = 'carousel-pagination';
        pagination.setAttribute('role', 'group');
        pagination.setAttribute('aria-label', 'Choose a slide');
        let current = 0;
        let requested = 0;
        let scrollTimer;

        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-roledescription', 'carousel');
        track.tabIndex = 0;
        track.setAttribute('aria-label', 'Use left and right arrow keys to browse');
        if (!track.id) track.id = `${carousel.id}-track`;
        const titles = slides.map((slide, index) => {
            slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
            return slide.querySelector('h3')?.textContent.trim() || `Review ${index + 1}`;
        });
        const pages = titles.map((title, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'carousel-page';
            button.setAttribute('aria-label', `Go to ${title}`);
            button.setAttribute('aria-controls', track.id);
            button.addEventListener('click', () => goTo(index));
            pagination.append(button);
            return button;
        });
        controls.append(position, pagination);

        if (carousel.dataset.arrows !== 'false') {
            const arrows = document.createElement('div');
            arrows.className = 'carousel-arrows';
            const previous = createDirectionButton('Previous project', 'Previous', -1);
            const next = createDirectionButton('Next project', 'Next', 1);
            arrows.append(previous, next);
            controls.append(arrows);
        }
        carousel.append(controls);
        carousel.classList.add('is-enhanced');

        function createDirectionButton(label, text, direction) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'carousel-arrow';
            button.textContent = text;
            button.setAttribute('aria-label', label);
            button.setAttribute('aria-controls', track.id);
            button.addEventListener('click', () => goTo(requested + direction));
            return button;
        }

        function slideOffset(index) {
            return slides[index].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
        }

        function goTo(index) {
            requested = (index + slides.length) % slides.length;
            track.scrollTo({ left: slideOffset(requested), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        }

        function syncPosition() {
            current = slides.reduce((closest, slide, index) =>
                Math.abs(slideOffset(index) - track.scrollLeft) < Math.abs(slideOffset(closest) - track.scrollLeft) ? index : closest, 0);
            requested = current;
            pages.forEach((page, index) => page.setAttribute('aria-current', String(index === current)));
            position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · ${titles[current]}`;
        }

        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(syncPosition, 150);
        }, { passive: true });
        track.addEventListener('scrollend', syncPosition);
        track.addEventListener('keydown', event => {
            if (event.target !== track) return;
            const destinations = { ArrowLeft: requested - 1, ArrowRight: requested + 1, Home: 0, End: slides.length - 1 };
            if (!(event.key in destinations)) return;
            event.preventDefault();
            goTo(destinations[event.key]);
        });
        track.addEventListener('focusin', event => {
            const index = slides.findIndex(slide => slide.contains(event.target));
            if (index !== -1) {
                track.scrollTo({ left: slideOffset(index), behavior: 'instant' });
                syncPosition();
            }
        });
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(() => {
                track.scrollTo({ left: slideOffset(current), behavior: 'instant' });
            }).observe(track);
        }
        syncPosition();
    }
})();
