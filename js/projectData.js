(function () {
    const EXPERIENCE = [
        {
            img: "https://cdn.discordapp.com/icons/1355586795009740980/7a958255217428e9bbad1fa8df5d7c1e.webp?size=512",
            title:   "Valor Events",
            role:    "Developer",
            period:  "2025 – now",
            tags:    ["Server Management", "Java", "Spring Boot", "MySQL", "HTML/CSS/JS"],
            desc:    "I manage the Minecraft servers and have made multiple plugins and an entire website for the server (will be released soon).",
            discord: "https://discord.gg/hw3X2ZP5K8",
            link:    null,
            color: "rgb(200, 170, 100)",
        },
        {
            img: "https://cdn.discordapp.com/icons/267364665766445057/846243bfb28bf6dc91d4945f9cec04fb.webp?size=512",
            title:   "ShotgunRaids",
            role:    "Event Contributor & Moderator",
            period:  "2026 – now",
            tags:    ["Server Management", "Java", "Moderation"],
            desc:    "Helped out in Development of an event, and now serve as a moderator on the server.",
            discord: "https://discord.gg/shot",
            link:    null,
            color: "rgb(140, 90, 220)",
        },
        {
            img: "https://cdn.discordapp.com/icons/1462963503689371805/2f2b5319f774664c8be08d55f6203d9a.webp?size=512",
            title:   "FlowPVP",
            role:    "Moderator",
            period:  "2026 – now",
            tags:    ["Moderation", "Java"],
            desc:    "Active moderator on FlowPVP, handling tickets 24/7. Also made a Fabric mod for the server, check it out in Projects/on Github.",
            discord: "https://discord.gg/flowpvp",
            link:    { label: "FlowTiers", href: "https://github.com/ykk4ga/FlowTiers2" },
            color:   "rgb(42, 223, 255)",
        },
    ];

    function buildCards() {
        const grid = document.getElementById("expGrid");
        if (!grid) return;

        EXPERIENCE.forEach((p, i) => {
            const card = document.createElement("div");
            card.className = "exp-card";
            card.style.cssText = `--exp-color:${p.color}; transition-delay:${i * 80}ms`;

            const tagsHtml = p.tags
                .map(t => `<span class="exp-tag">${t}</span>`)
                .join("");

            const actionsHtml = [
                p.discord ? `<a class="exp-btn exp-btn-discord" href="${p.discord}" target="_blank" rel="noopener">
                    <i class="fab fa-discord"></i> Discord
                </a>` : "",
                p.link ? `<a class="exp-btn exp-btn-link" href="${p.link.href}" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> ${p.link.label}
                </a>` : "",
            ].join("");

            const imgHtml = p.img ? `<img src="${p.img}" class="exp-img" alt="${p.title}">` : "";

            card.innerHTML = `
                <div class="exp-header">
                     ${imgHtml}
                     <span class="exp-period">${p.period}</span>
                </div>
                <div class="exp-title">${p.title}</div>
                <div class="exp-role">${p.role}</div>
                <p class="exp-desc">${p.desc}</p>
                <div class="exp-tags">${tagsHtml}</div>
                ${actionsHtml ? `<div class="exp-actions">${actionsHtml}</div>` : ""}
            `;

            grid.appendChild(card);
        });

        setTimeout(() => {
            const obs = window._scrollObserver;
            if (obs) {
                grid.querySelectorAll(".scroll-hidden").forEach(el => obs.observe(el));
            } else {
                grid.querySelectorAll(".scroll-hidden").forEach(el => el.classList.add("scroll-show"));
            }
        }, 50);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildCards);
    } else {
        buildCards();
    }
})();