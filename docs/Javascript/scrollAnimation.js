const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.hasAttribute("data-stagger")) {
                [...entry.target.children].forEach((child, i) => {
                    setTimeout(() => {
                        child.classList.add("scroll-show");
                    }, i * 150);
                });
            } else {
                entry.target.classList.add("scroll-show");
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".scroll-hidden").forEach((el) => observer.observe(el));
