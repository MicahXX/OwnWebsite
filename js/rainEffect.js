document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.querySelector('.rain');
    if (!rainContainer) return;

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        rainContainer.appendChild(drop);
    }

    document.addEventListener('visibilitychange', () => {
        const drops = document.querySelectorAll('.drop');
        drops.forEach(d => {
            d.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    });
});