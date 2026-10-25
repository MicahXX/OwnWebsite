(function showSessionIntro() {
    const sessionKey = 'micahcode:intro-seen';
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    try {
        if (sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, 'true');
    } catch {
        return;
    }

    if (motionPreference.matches || typeof HTMLDialogElement === 'undefined') return;

    const intro = document.createElement('dialog');
    intro.id = 'portfolio-intro';
    intro.setAttribute('aria-label', 'Welcome to MicahCode');

    const name = 'micahcode';
    const letters = [...name]
        .map((letter, index) => `
            <span class="intro-letter" style="--i:${index}">
                ${letter}
            </span>
        `).join('');

    intro.innerHTML = `
        <div class="intro-background"></div>
        <div class="intro-glow"></div>

        <div class="intro-content">
            <div class="intro-eyebrow">
                <span class="intro-dot"></span>
                WELCOME TO MY PORTFOLIO
            </div>

            <h1 class="intro-title">
                ${letters}<span class="intro-brand-dot">.</span>
            </h1>

            <p class="intro-subtitle">
                DEVELOPER
            </p>
        </div>

        <div class="intro-progress">
            <div class="intro-progress-bar"></div>
        </div>
    `;

    const previousFocus = document.activeElement;
    let finishTimer;
    let closeTimer;
    let finished = false;

    document.body.append(intro);


    function closeIntro() {
        clearTimeout(finishTimer);
        clearTimeout(closeTimer);

        motionPreference.removeEventListener('change', onMotionChange);
        window.removeEventListener('pagehide', closeIntro);

        if (intro.open) intro.close();
        intro.remove();

        document.documentElement.classList.remove('intro-active');

        if (!document.documentElement.classList.contains('intro-revealing')) {
            document.documentElement.classList.remove('intro-revealing');
        }

        if (previousFocus instanceof HTMLElement &&
            previousFocus.isConnected &&
            previousFocus !== document.body) {
            previousFocus.focus({ preventScroll: true });
        }
    }

    function finishIntro() {
        if (finished) return;

        finished = true;
        clearTimeout(finishTimer);
        document.documentElement.classList.add('intro-revealing');
        intro.classList.add('intro-finished');

        closeTimer = window.setTimeout(() => {
            closeIntro();
            window.setTimeout(() => {
                document.documentElement.classList.remove('intro-revealing');
            }, 1500);
        }, 900);
    }



    function onMotionChange() {
        if (motionPreference.matches) closeIntro();
    }

    intro.addEventListener('cancel', event => {
        event.preventDefault();
        closeIntro();
    });

    motionPreference.addEventListener('change', onMotionChange);
    window.addEventListener('pagehide', closeIntro);

    try {
        intro.showModal();
        document.documentElement.classList.add('intro-active');

        finishTimer = window.setTimeout(finishIntro, 2100);
    } catch {
        closeIntro();
    }
})();
