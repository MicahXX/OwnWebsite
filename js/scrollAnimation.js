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
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0
    }
);

/** Reveal a section once, respecting the visitor's motion preference. */
function playElement(el, delay = 0) {
    if (playedSections.has(el)) return;
    const stagger = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150;
    if (stagger === 0) delay = 0;
    if (el.hasAttribute('data-stagger')) {
        [...el.children].forEach((child, i) => {
            setTimeout(() => child.classList.add('scroll-show'), delay + i * stagger);
        });
    } else {
        setTimeout(() => el.classList.add('scroll-show'), delay);
    }
    playedSections.add(el);
    observer.unobserve(el);
}

document.querySelectorAll(".scroll-hidden").forEach(el => observer.observe(el));
window._scrollObserver = observer;

let navScrollActive = false;

const navGroups = {
    tools: ["tools", "languages"],
};

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

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
            section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
            setTimeout(() => navScrollActive = false, 300);
            return;
        }

        const navObserver = new IntersectionObserver((entriesNav) => {
            entriesNav.forEach(entryNav => {
                if (entryNav.isIntersecting) {
                    clearTimeout(fallback); // Cancel the fallback after the destination becomes visible.
                    targets.forEach((t, i) => playElement(t, i * 150)); // Stagger section content.
                    navObserver.disconnect();
                    navScrollActive = false;
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }); // Reveal shortly after entering the viewport.

        // Fallback in case observer never fires (e.g. already at section)
        const fallback = setTimeout(() => {
            targets.forEach((t, i) => playElement(t, i * 150));
            navObserver.disconnect();
            navScrollActive = false;
        }, 800);

        navObserver.observe(section);
        section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    });
});

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

/** Choose immediate scrolling when the visitor requests reduced motion. */
function scrollBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

/** Highlight the navigation link for the section currently in view. */
function updateActiveNav() {
    if (navScrollActive) return;

    let currentSection = "home";


    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        link.removeAttribute('aria-current');
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
            link.setAttribute('aria-current', 'location');
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
