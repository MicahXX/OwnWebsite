document.querySelectorAll('.tool-badge').forEach(el => {
    el.addEventListener('mousemove', e => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.225}px, ${y * 0.225}px) scale(1.05)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0) scale(1)';
    });
});
