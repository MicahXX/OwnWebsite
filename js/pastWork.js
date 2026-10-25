(function initializePastWork() {
    const section = document.querySelector('.pastwork-section');
    if (!section) return;
    const viewport = section.querySelector('.pastwork-window');
    const track = section.querySelector('.pastwork-track');
    const group = section.querySelector('.pastwork-grid');
    if (!viewport || !track || !group) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const copy = group.cloneNode(true);
    copy.classList.add('pastwork-copy');
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    track.append(copy);
    section.setAttribute('role', 'region');
    section.setAttribute('aria-label', 'Past work');
    viewport.tabIndex = 0;
    viewport.setAttribute('aria-label', 'Past work. Scroll to explore.');

    let frame = 0;
    let lastTime = 0;
    let loopWidth = 0;
    let position = 0;
    let visible = true;
    let hovered = false;
    let focused = false;
    let touching = false;
    let manualPause = false;
    let resumeTimer;
    let drag;

    function updateAnimation() {
        const paused = motion.matches || !visible || document.hidden || hovered || focused || touching || manualPause;
        if (paused) {
            cancelAnimationFrame(frame);
            frame = 0;
            lastTime = 0;
        } else if (!frame) {
            position = viewport.scrollLeft;
            frame = requestAnimationFrame(advance);
        }
    }

    function advance(time) {
        const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
        lastTime = time;
        if (loopWidth > 0) {
            position = (position + elapsed * .024) % loopWidth;
            viewport.scrollLeft = position;
        }
        frame = requestAnimationFrame(advance);
    }

    function measure() {
        loopWidth = group.getBoundingClientRect().width;
        if (!motion.matches && loopWidth > 0 && viewport.scrollLeft >= loopWidth) viewport.scrollLeft %= loopWidth;
        position = viewport.scrollLeft;
        updateAnimation();
    }

    function resumeWhenQuiet() {
        clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
            manualPause = false;
            updateAnimation();
        }, 1200);
    }

    function pauseForInteraction() {
        manualPause = true;
        clearTimeout(resumeTimer);
        updateAnimation();
    }

    viewport.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse') return;
        hovered = true;
        updateAnimation();
    });
    viewport.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'mouse') return;
        hovered = false;
        updateAnimation();
    });
    viewport.addEventListener('focusin', event => {
        focused = event.target.matches(':focus-visible');
        updateAnimation();
    });
    viewport.addEventListener('focusout', () => {
        focused = false;
        updateAnimation();
    });
    viewport.addEventListener('keydown', event => {
        if (event.key === 'Tab') return;
        focused = true;
        updateAnimation();
    });
    viewport.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        focused = false;
        touching = true;
        pauseForInteraction();
        if (event.pointerType !== 'mouse') return;
        drag = { id: event.pointerId, x: event.clientX, left: viewport.scrollLeft };
        viewport.setPointerCapture(event.pointerId);
        viewport.classList.add('is-dragging');
    });
    viewport.addEventListener('pointermove', event => {
        if (drag?.id === event.pointerId) viewport.scrollLeft = drag.left + drag.x - event.clientX;
    });

    function finishInteraction() {
        touching = false;
        drag = null;
        viewport.classList.remove('is-dragging');
        resumeWhenQuiet();
    }

    viewport.addEventListener('pointerup', finishInteraction);
    viewport.addEventListener('pointercancel', finishInteraction);
    viewport.addEventListener('lostpointercapture', finishInteraction);
    viewport.addEventListener('scroll', () => {
        if (manualPause && !touching) resumeWhenQuiet();
    }, { passive: true });
    viewport.addEventListener('wheel', () => {
        pauseForInteraction();
        resumeWhenQuiet();
    }, { passive: true });
    document.addEventListener('visibilitychange', updateAnimation);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            updateAnimation();
        }).observe(section);
    }
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(viewport);
    else window.addEventListener('resize', measure);
    motion.addEventListener('change', () => {
        section.classList.toggle('is-animated', !motion.matches);
        viewport.scrollLeft = 0;
        measure();
    });
    section.classList.toggle('is-animated', !motion.matches);
    measure();
})();
