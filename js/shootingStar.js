function launchShootingStar() {
    if (document.body.classList.contains('lightmode')) return;

    const star = document.createElement('div');
    star.className = 'shooting-star';

    star.style.left = (-100 + Math.random() * window.innerWidth * 0.8) + 'px';
    star.style.top = (-30 - Math.random() * 180) + 'px';
    star.style.setProperty('--shoot-angle', (35 + Math.random() * 20) + 'deg');

    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
}

function scheduleShootingStar() {
    setTimeout(() => {
        launchShootingStar();
        scheduleShootingStar();
    }, 1500 + Math.random() * 3000);
}

scheduleShootingStar();