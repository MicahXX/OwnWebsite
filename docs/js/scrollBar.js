window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scroll-bar').style.width =
        `${(scrolled / height) * 100}%`;
});