const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");

let mouseMoved = false;

const pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

const params = {
    pointsNumber: 15,
    widthFactor: 0.2,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
};

const trail = Array.from({ length: params.pointsNumber }, () => ({
    x: pointer.x,
    y: pointer.y,
    dx: 0,
    dy: 0,
}));

function updateMousePosition(x, y) {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    pointer.x = x;
    pointer.y = y;
}

window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.clientX, e.clientY);
});

window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY
    );
});

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

function update(t) {
    if (!mouseMoved) {
        pointer.x =
            (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
            window.innerWidth;
        pointer.y =
            (0.5 +
                0.2 * Math.cos(0.005 * t) +
                0.1 * Math.cos(0.01 * t)) *
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

    ctx.strokeStyle = "rgba(42, 223, 255, 0.35)";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }

    ctx.lineTo(
        trail[trail.length - 1].x,
        trail[trail.length - 1].y
    );
    ctx.stroke();

    requestAnimationFrame(update);

    let scrolling;
    window.addEventListener("scroll", () => {
        ctx.globalAlpha = 0.3;
        clearTimeout(scrolling);
        scrolling = setTimeout(() => ctx.globalAlpha = 1, 150);
    });
}

requestAnimationFrame(update);
