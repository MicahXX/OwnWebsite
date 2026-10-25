(function initializePastWork() {
    const section = document.querySelector('.pastwork-section');
    if (!section) return;

    const track = section.querySelector('.pastwork-track');
    const group = section.querySelector('.pastwork-grid');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const copy = group.cloneNode(true);
    copy.classList.add('pastwork-copy');
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    track.append(copy);

    function updateMotion() {
        section.classList.toggle('is-animated', !motionPreference.matches);
    }

    motionPreference.addEventListener('change', updateMotion);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            section.classList.toggle('is-offscreen', !entries[0].isIntersecting);
        });
        observer.observe(section);
    }
    updateMotion();
})();
