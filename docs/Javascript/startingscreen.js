window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const minTime = 1500;
    const startTime = performance.now();

function hideLoader() {
    loader.classList.add("hidden");
}

const elapsed = performance.now() - startTime;
const remaining = Math.max(0, minTime - elapsed);

setTimeout(hideLoader, remaining);
});