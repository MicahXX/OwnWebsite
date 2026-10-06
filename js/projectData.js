(function () {
    const EXPERIENCE = [
        {
            img: "https://cdn.discordapp.com/icons/1355586795009740980/7a958255217428e9bbad1fa8df5d7c1e.webp?size=512",
            title:   "Valor Events",
            role:    "Developer",
            period:  "2025 – now",
            tags:    ["Server Management", "Java", "Spring Boot", "MySQL", "HTML/CSS/JS"],
            desc:    "I develop Java plugins and a community website, and manage the Minecraft servers. My work uses Spring Boot, MySQL and HTML/CSS/JavaScript.",
            discord: "https://discord.gg/hw3X2ZP5K8",
            link:    null,
            color: "rgb(200, 170, 100)",
        },
        {
            img: "https://cdn.discordapp.com/icons/1462963503689371805/0c9f3fb1238e2983216c6e98ef7c67bf.webp?size=512",
            title:   "PvPHQ",
            role:    "Server Moderator",
            period:  "2026 – now",
            tags:    ["Moderation", "Java"],
            desc:    "I handle support tickets and moderation reports as part of the moderation team. I also developed HQTiers, a Java/Fabric mod that displays PvPHQ player rankings.",
            discord: "https://discord.gg/pvphq",
            link:    { label: "HQTiers", href: "https://modrinth.com/mod/hqtiers" },
            color:   "rgb(206,145,11)",
        },
        {
            img: "https://cdn.discordapp.com/icons/267364665766445057/846243bfb28bf6dc91d4945f9cec04fb.webp?size=512",
            title:   "ShotgunRaids",
            role:    "Event Contributor",
            period:  "2026 – now",
            tags:    ["Server Management", "Java"],
            desc:    "I contributed to development for ShotgunRaids' 1,000-player COUNTRIES Civilization event, working with the event team.",
            discord: "https://discord.gg/shot",
            link:    null,
            color: "rgb(140, 90, 220)",
        },
    ];

    /** Render community roles from the portfolio's experience data. */
    function buildCards() {
        const grid = document.getElementById("expGrid");
        if (!grid) return;
        grid.replaceChildren();

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
                    <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${p.link.label}
                </a>` : "",
            ].join("");

            const imgHtml = p.img ? `<img src="${p.img}" class="exp-img" alt="${p.title}">` : "";

            card.innerHTML = `
                <div class="exp-header">
                     ${imgHtml}
                     <span class="exp-period">${p.period}</span>
                </div>
                <h3 class="exp-title">${p.title}</h3>
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
