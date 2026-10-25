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
    const letters = [...name].map((letter, index) =>
        `<span class="intro-letter-mask" aria-hidden="true"><span class="intro-letter" style="--i:${index}">${letter}</span></span>`
    ).join('');

    intro.innerHTML = `
        <div class="intro-background" aria-hidden="true"></div>
        <div class="intro-content">
            <div class="intro-eyebrow">
                WELCOME TO MY PORTFOLIO
            </div>
            <h1 class="intro-title" aria-label="${name}">
                ${letters}
            </h1>
            <p class="intro-subtitle">DEVELOPER</p>
            <div class="intro-progress" aria-hidden="true">
                <div class="intro-progress-bar"></div>
            </div>
        </div>`;

    const previousFocus = document.activeElement;
    let finishTimer;
    let closeTimer;
    let finished = false;
    let closed = false;
    function closeIntro() {
        if (closed) return;
        closed = true;
        clearTimeout(finishTimer);
        clearTimeout(closeTimer);
        motionPreference.removeEventListener('change', onMotionChange);
        window.removeEventListener('pagehide', closeIntro);
        if (intro.open) intro.close();
        intro.remove();
        document.documentElement.classList.remove('intro-active');
        if (previousFocus instanceof HTMLElement && previousFocus.isConnected && previousFocus !== document.body) {
            previousFocus.focus({ preventScroll: true });
        }
    }
    function finishIntro() {
        if (finished || closed) return;
        finished = true;
        clearTimeout(finishTimer);
        intro.classList.add('intro-finished');
        closeTimer = window.setTimeout(closeIntro, 950);
    }
    function onMotionChange() {
        if (motionPreference.matches) closeIntro();
    }

    intro.addEventListener('animationend', event => {
        if (event.animationName === 'intro-loading') finishIntro();
    });
    intro.addEventListener('transitionend', event => {
        if (finished && event.target === intro && event.propertyName === 'opacity') closeIntro();
    });
    intro.addEventListener('cancel', event => {
        event.preventDefault();
        closeIntro();
    });
    motionPreference.addEventListener('change', onMotionChange);
    window.addEventListener('pagehide', closeIntro);
    document.body.append(intro);

    try {
        intro.showModal();
        document.documentElement.classList.add('intro-active');
        finishTimer = window.setTimeout(finishIntro, 2300);
    } catch {
        closeIntro();
    }
})();
