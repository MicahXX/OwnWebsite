/** Play a portfolio intro once per tab session, shared by both pages. */
(function showSessionIntro() {
    const sessionKey = 'micahcode:intro-seen';
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    try {
        if (sessionStorage.getItem(sessionKey)) return;

        // Mark on entry so reloading or leaving during the intro does not replay it.
        sessionStorage.setItem(sessionKey, 'true');
    } catch {
        // With storage disabled, keep the portfolio accessible without repeated intros.
        return;
    }

    if (motionPreference.matches || typeof HTMLDialogElement === 'undefined') return;

    const intro = document.createElement('dialog');
    intro.id = 'portfolio-intro';
    intro.setAttribute('aria-labelledby', 'intro-title');
    intro.innerHTML = `
        <div class="intro-center">
            <div class="intro-parts" aria-hidden="true">
                <span class="intro-part"></span>
                <span class="intro-part"></span>
                <span class="intro-part"></span>
                <span class="intro-part"></span>
                <span class="intro-core"></span>
            </div>

            <h2 id="intro-title">Hello, World!</h2>
        </div>`;

    const previousFocus = document.activeElement;
    let finishTimer;
    let closeTimer;
    let finished = false;

    document.body.append(intro);

    /** Remove the modal and restore scrolling and keyboard focus. */
    function closeIntro() {
        clearTimeout(finishTimer);
        clearTimeout(closeTimer);

        motionPreference.removeEventListener('change', onMotionChange);
        window.removeEventListener('pagehide', closeIntro);

        intro.close();
        intro.remove();

        document.documentElement.classList.remove('intro-active');

        if (previousFocus instanceof HTMLElement && previousFocus !== document.body) {
            previousFocus.focus({ preventScroll: true });
        }
    }

    /** Fade into the portfolio after playback. */
    function finishIntro() {
        if (finished) return;

        finished = true;
        clearTimeout(finishTimer);

        intro.classList.add('intro-finished');

        closeTimer = window.setTimeout(
            closeIntro,
            motionPreference.matches ? 0 : 350
        );
    }

    /** Immediately dismiss the animation if the motion preference changes. */
    function onMotionChange() {
        if (motionPreference.matches) closeIntro();
    }

    // Prevent Escape from skipping the intro.
    intro.addEventListener('cancel', event => {
        event.preventDefault();
    });

    motionPreference.addEventListener('change', onMotionChange);
    window.addEventListener('pagehide', closeIntro);

    try {
        intro.showModal();
        document.documentElement.classList.add('intro-active');

        // Automatically finish after 2.4 seconds.
        finishTimer = window.setTimeout(finishIntro, 2400);
    } catch {
        closeIntro();
    }
})();