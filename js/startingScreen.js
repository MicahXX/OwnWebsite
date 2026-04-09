window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const bar = document.getElementById("loaderBar");
    const pct = document.getElementById("loaderPct");
    const minTime = 1500;
    const startTime = performance.now();

    function animateProgress() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(100, Math.round((elapsed / minTime) * 100));
        bar.style.width = progress + "%";
        pct.textContent = progress + "%";
        if (progress < 100) requestAnimationFrame(animateProgress);
    }

    requestAnimationFrame(animateProgress);

    function hideLoader() {
        loader.classList.add("hidden");
    }

    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minTime - elapsed);
    setTimeout(hideLoader, remaining);
});