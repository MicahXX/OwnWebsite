const playedSections = new Set();

const scrollDelay = 150;

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (playedSections.has(entry.target)) return;
            if (navScrollActive) return;

            if (entry.isIntersecting) {
                playElement(entry.target);
            }
        });
    },
    {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
    }
);

function playElement(el, delay = 0) {
    if (playedSections.has(el)) return;
    if (el.hasAttribute('data-stagger')) {
        [...el.children].forEach((child, i) => {
            setTimeout(() => child.classList.add('scroll-show'), delay + i * 150);
        });
    } else {
        setTimeout(() => el.classList.add('scroll-show'), delay);
    }
    playedSections.add(el);
    observer.unobserve(el);
}

document.querySelectorAll(".scroll-hidden").forEach(el => observer.observe(el));

let navScrollActive = false;

const navGroups = {
    tools: ["tools", "languages"],
};

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const section = document.getElementById(targetId);
        if (!section) return;

        const sectionIds = navGroups[targetId] || [targetId];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

        const targets = sections.flatMap(sec => {
            const candidates = Array.from(sec.querySelectorAll(".scroll-hidden"));
            if (sec.classList.contains("scroll-hidden")) candidates.unshift(sec);
            return candidates.filter(el => !playedSections.has(el));
        });

        navScrollActive = true;

        if (targets.length === 0) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => navScrollActive = false, 300);
            return;
        }

        const navObserver = new IntersectionObserver((entriesNav) => {
            entriesNav.forEach(entryNav => {
                if (entryNav.isIntersecting) {
                    targets.forEach((t, i) => {
                        playElement(t, i * 400);
                    });
                    navObserver.disconnect();
                    navScrollActive = false;
                }
            });
        }, { threshold: 0.6 });

        navObserver.observe(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
