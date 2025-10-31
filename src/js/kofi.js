document.getElementById('kofiLink').addEventListener('click', function (e) {
    e.stopPropagation();
    window.open(this.href, '_blank');
});
