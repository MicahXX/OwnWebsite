window.addEventListener("load", () => {
    const scrollElements = document.querySelectorAll(".scroll-hidden");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute("data-stagger")) {
                    [...entry.target.children].forEach((child, i) => {
                        setTimeout(() => child.classList.add("scroll-show"), i * 150);
                    });
                } else {
                    entry.target.classList.add("scroll-show");
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        scrollElements.forEach(el => {
            observer.observe(el);

            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (el.hasAttribute("data-stagger")) {
                    [...el.children].forEach((child, i) => {
                        setTimeout(() => child.classList.add("scroll-show"), i * 150);
                    });
                } else {
                    el.classList.add("scroll-show");
                }
                observer.unobserve(el);
            }
        });
    }, 25);
});
