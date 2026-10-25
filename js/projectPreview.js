(function initializeProjectPreviews() {
    if (typeof HTMLDialogElement === 'undefined') return;
    const images = [...document.querySelectorAll('.project-visual .bg')];
    if (!images.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'project-lightbox';
    dialog.setAttribute('aria-labelledby', 'preview-title');
    dialog.innerHTML = `<div class="preview-toolbar"><p id="preview-title"></p><div class="preview-actions"><button type="button" class="preview-zoom" aria-pressed="false">Zoom in</button><button type="button" class="preview-close">Close</button></div></div><div class="preview-image-wrap"><img class="preview-image" alt=""></div>`;
    document.body.append(dialog);
    const title = dialog.querySelector('#preview-title');
    const image = dialog.querySelector('.preview-image');
    const imageWrap = dialog.querySelector('.preview-image-wrap');
    const zoom = dialog.querySelector('.preview-zoom');
    let opener;

    function closePreview() {
        dialog.close();
    }

    images.forEach(source => {
        const name = source.closest('.carousel-slide').querySelector('h3').textContent;
        const button = document.createElement('button');
        button.className = 'project-preview';
        button.type = 'button';
        button.setAttribute('aria-label', `View ${name} screenshot full size`);
        button.setAttribute('aria-haspopup', 'dialog');
        source.before(button);
        button.append(source);
        const label = document.createElement('span');
        label.className = 'preview-hint';
        label.textContent = 'View full size';
        button.append(label);
        button.addEventListener('click', () => {
            opener = button;
            image.src = source.currentSrc || source.src;
            image.alt = source.alt;
            title.textContent = name;
            dialog.classList.remove('is-zoomed');
            zoom.textContent = 'Zoom in';
            zoom.setAttribute('aria-pressed', 'false');
            dialog.showModal();
            imageWrap.scrollTo(0, 0);
            document.documentElement.classList.add('preview-open');
        });
    });

    zoom.addEventListener('click', () => {
        const zoomed = dialog.classList.toggle('is-zoomed');
        zoom.textContent = zoomed ? 'Fit image' : 'Zoom in';
        zoom.setAttribute('aria-pressed', String(zoomed));
    });
    dialog.querySelector('.preview-close').addEventListener('click', closePreview);
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePreview();
    });
    dialog.addEventListener('close', () => {
        document.documentElement.classList.remove('preview-open');
        opener?.focus({ preventScroll: true });
    });
})();
