window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const bar = document.getElementById("loaderBar");
    const pct = document.getElementById("loaderPct");
    const minTime = 1500;
    const startTime = performance.now();

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventTouch, { passive: false });

    function preventTouch(e) {
        e.preventDefault();
    }

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
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.removeEventListener("touchmove", preventTouch);
    }

    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minTime - elapsed);
    setTimeout(hideLoader, remaining);
});