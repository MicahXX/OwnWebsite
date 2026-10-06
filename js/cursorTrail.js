const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = window.matchMedia('(max-width: 768px)');
let animationFrame = null;

let mouseMoved = false;

const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

const params = {
    pointsNumber: 15,
    widthFactor: 1.1,
    spring: 0.4,
    friction: 0.5,
};

const trail = Array.from({ length: params.pointsNumber }, () => ({
    x: pointer.x,
    y: pointer.y,
    dx: 0,
    dy: 0,
}));

/** Move the trail's target to the latest pointer position. */
function updateMousePosition(x, y) {
    pointer.x = x;
    pointer.y = y;
}

window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.clientX, e.clientY);
});

/** Size the drawing surface for the viewport and device pixel ratio. */
function setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", setupCanvas);
setupCanvas();

/** Draw one spring-based trail frame while decorative motion is enabled. */
function update(t) {

    if (!mouseMoved) {
        pointer.x =
            (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
            window.innerWidth;
        pointer.y =
            (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
            window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trail.forEach((p, i) => {
        const prev = i === 0 ? pointer : trail[i - 1];
        const spring = i === 0 ? 0.4 * params.spring : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;

        p.dx *= params.friction;
        p.dy *= params.friction;

        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.strokeStyle = "rgba(42,223,255,0.78)";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
    }

    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    animationFrame = requestAnimationFrame(update);
}

let scrolling;
window.addEventListener("scroll", () => {
    ctx.globalAlpha = 0.3;
    clearTimeout(scrolling);
    scrolling = setTimeout(() => ctx.globalAlpha = 1, 150);
});

/** Stop drawing for reduced motion, small screens and background tabs. */
function syncTrailAnimation() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!reducedMotion.matches && !smallScreen.matches && !document.hidden) {
        animationFrame = requestAnimationFrame(update);
    }
}

reducedMotion.addEventListener('change', syncTrailAnimation);
smallScreen.addEventListener('change', syncTrailAnimation);
document.addEventListener('visibilitychange', syncTrailAnimation);
syncTrailAnimation();
