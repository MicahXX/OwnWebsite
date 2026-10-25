(function initializeProjectPreviews() {
    if (typeof HTMLDialogElement === 'undefined') return;
    const images = [...document.querySelectorAll('.project-visual .bg')];
    if (!images.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'project-lightbox';
    dialog.setAttribute('aria-labelledby', 'preview-title');
    dialog.setAttribute('aria-describedby', 'preview-help');
    dialog.innerHTML = `
        <div class="preview-toolbar">
            <p id="preview-title"></p>
            <div class="preview-actions" role="group" aria-label="Screenshot controls">
                <button type="button" class="preview-minus" aria-label="Zoom out">−</button>
                <output class="preview-scale" aria-label="Zoom level">100%</output>
                <button type="button" class="preview-plus" aria-label="Zoom in">+</button>
                <button type="button" class="preview-fit" aria-label="Fit screenshot to screen">Fit</button>
                <button type="button" class="preview-close" aria-label="Close screenshot"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
            </div>
        </div>
        <div class="preview-image-wrap" tabindex="0" aria-label="Screenshot viewer">
            <img class="preview-image" alt="" draggable="false">
            <p class="preview-message" role="status">Loading screenshot…</p>
        </div>
        <p class="preview-help" id="preview-help">Scroll or pinch to zoom · Drag to explore · Esc to close</p>`;
    document.body.append(dialog);
    const title = dialog.querySelector('#preview-title');
    const image = dialog.querySelector('.preview-image');
    const viewport = dialog.querySelector('.preview-image-wrap');
    const message = dialog.querySelector('.preview-message');
    const output = dialog.querySelector('.preview-scale');
    const minus = dialog.querySelector('.preview-minus');
    const plus = dialog.querySelector('.preview-plus');
    const fit = dialog.querySelector('.preview-fit');
    const pointers = new Map();
    let opener;
    let scale = 1;
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    let ready = false;

    function render() {
        const maxX = Math.max(0, (width * scale - viewport.clientWidth) / 2);
        const maxY = Math.max(0, (height * scale - viewport.clientHeight) / 2);
        x = Math.max(-maxX, Math.min(maxX, x));
        y = Math.max(-maxY, Math.min(maxY, y));
        image.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        output.value = `${Math.round(scale * 100)}%`;
        minus.disabled = !ready || scale <= 1;
        plus.disabled = !ready || scale >= 4;
        fit.disabled = !ready || scale === 1;
        viewport.classList.toggle('is-zoomed', scale > 1);
    }

    function zoomTo(nextScale, clientX, clientY) {
        if (!ready) return;
        const bounds = viewport.getBoundingClientRect();
        const anchorX = clientX === undefined ? 0 : clientX - bounds.left - bounds.width / 2;
        const anchorY = clientY === undefined ? 0 : clientY - bounds.top - bounds.height / 2;
        const next = Math.max(1, Math.min(4, nextScale));
        x = anchorX - (anchorX - x) * next / scale;
        y = anchorY - (anchorY - y) * next / scale;
        scale = next;
        render();
    }

    function fitImage() {
        if (!dialog.open || !image.naturalWidth) return;
        const ratio = Math.min((viewport.clientWidth - 24) / image.naturalWidth,
            (viewport.clientHeight - 24) / image.naturalHeight, 1);
        width = image.naturalWidth * ratio;
        height = image.naturalHeight * ratio;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        scale = 1;
        x = y = 0;
        ready = true;
        viewport.setAttribute('aria-busy', 'false');
        dialog.classList.add('is-ready');
        message.textContent = '';
        render();
    }

    image.addEventListener('load', fitImage);
    image.addEventListener('error', () => {
        ready = false;
        viewport.setAttribute('aria-busy', 'false');
        message.textContent = 'This screenshot could not load. Close and try again.';
        render();
    });

    images.forEach(source => {
        const name = source.closest('.carousel-slide').querySelector('h3').textContent.trim();
        const button = document.createElement('button');
        button.className = 'project-preview';
        button.type = 'button';
        button.setAttribute('aria-label', `Enlarge ${name} screenshot`);
        button.setAttribute('aria-haspopup', 'dialog');
        source.before(button);
        button.append(source);
        const label = document.createElement('span');
        button.append(label);
        button.addEventListener('click', () => {
            opener = button;
            title.textContent = name;
            image.alt = source.alt;
            ready = false;
            scale = 1;
            x = y = 0;
            pointers.clear();
            dialog.classList.remove('is-ready');
            message.textContent = 'Loading screenshot…';
            viewport.setAttribute('aria-busy', 'true');
            document.documentElement.classList.add('preview-open');
            dialog.showModal();
            render();
            image.src = source.currentSrc || source.src;
            if (image.complete && image.naturalWidth) fitImage();
        });
    });

    minus.addEventListener('click', () => zoomTo(scale / Math.SQRT2));
    plus.addEventListener('click', () => zoomTo(scale * Math.SQRT2));
    fit.addEventListener('click', () => zoomTo(1));
    dialog.querySelector('.preview-close').addEventListener('click', () => dialog.close());
    viewport.addEventListener('wheel', event => {
        event.preventDefault();
        zoomTo(scale * Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * .003), event.clientX, event.clientY);
    }, { passive: false });
    viewport.addEventListener('dblclick', event => {
        zoomTo(scale > 1 ? 1 : 2, event.clientX, event.clientY);
    });
    viewport.addEventListener('pointerdown', event => {
        if (!ready || (event.pointerType === 'mouse' && event.button !== 0)) return;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        viewport.setPointerCapture(event.pointerId);
        viewport.classList.add('is-dragging');
    });
    viewport.addEventListener('pointermove', event => {
        if (!pointers.has(event.pointerId)) return;
        const previous = [...pointers.values()];
        const point = pointers.get(event.pointerId);
        const dx = event.clientX - point.x;
        const dy = event.clientY - point.y;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        const current = [...pointers.values()];
        if (current.length === 2) {
            const distance = points => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
            const before = distance(previous);
            if (before > 0) zoomTo(scale * distance(current) / before,
                (previous[0].x + previous[1].x) / 2, (previous[0].y + previous[1].y) / 2);
            x += dx / 2;
            y += dy / 2;
        } else if (current.length === 1) {
            x += dx;
            y += dy;
        }
        render();
    });
    function releasePointer(event) {
        pointers.delete(event.pointerId);
        if (!pointers.size) viewport.classList.remove('is-dragging');
    }
    viewport.addEventListener('pointerup', releasePointer);
    viewport.addEventListener('pointercancel', releasePointer);
    viewport.addEventListener('lostpointercapture', releasePointer);
    dialog.addEventListener('keydown', event => {
        if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            if (event.key === '+' || event.key === '=') zoomTo(scale * Math.SQRT2);
            else if (event.key === '-') zoomTo(scale / Math.SQRT2);
            else if (event.key === '0') zoomTo(1);
            else {
                x += event.key === 'ArrowLeft' ? 60 : event.key === 'ArrowRight' ? -60 : 0;
                y += event.key === 'ArrowUp' ? 60 : event.key === 'ArrowDown' ? -60 : 0;
                render();
            }
        }
    });
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
        pointers.clear();
        viewport.classList.remove('is-dragging');
        document.documentElement.classList.remove('preview-open');
        if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    window.addEventListener('resize', fitImage);
})();
