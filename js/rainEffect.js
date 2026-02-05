document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.querySelector('.rain');

    if (!rainContainer) return;

    // Generate 500 rain drops
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        rainContainer.appendChild(drop);
    }
});