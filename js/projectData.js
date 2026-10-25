(function initializeExperience() {
    const EXPERIENCE = [
        {
            img: "imgs/valor-events.webp",
            title:   "Valor Events",
            role:    "Head Developer",
            period:  "2025 – now",
            tags:    ["Server Management", "Java", "Spring Boot", "MySQL", "HTML/CSS/JS"],
            desc:    "I develop Java plugins and manage the Minecraft servers. My work uses Java and other tools.",
            discord: "https://discord.gg/hw3X2ZP5K8",
            link:    null,
            color: "rgb(200, 170, 100)",
        },
        {
            img: "imgs/pvphq.webp",
            title:   "PvPHQ",
            role:    "Server Moderator",
            period:  "2026 – now",
            tags:    ["Moderation", "Java"],
            desc:    "I handle support tickets and moderation reports as part of the moderation team." +
                " I also developed HQTiers, a Java/Fabric mod that displays PvPHQ player rankings.",
            discord: "https://discord.gg/pvphq",
            link:    { label: "HQTiers", href: "https://modrinth.com/mod/hqtiers" },
            color:   "rgb(206,145,11)",
        },
        {
            img: "imgs/shotgunraids.webp",
            title:   "ShotgunRaids",
            role:    "Event Contributor",
            period:  "2026 – now",
            tags:    ["Server Management", "Java"],
            desc:    "I contributed to development for ShotgunRaids 1,000-player COUNTRIES Civilization event, working with the event team.",
            discord: "https://discord.gg/shot",
            link:    null,
            color: "rgb(140, 90, 220)",
        },
    ];

    function buildCards() {
        const grid = document.getElementById("expGrid");
        if (!grid) return;
        grid.replaceChildren();

        EXPERIENCE.forEach(p => {
            const card = document.createElement("article");
            card.className = "exp-card";
            card.style.setProperty('--exp-color', p.color);

            const tagsHtml = p.tags
                .map(t => `<span class="exp-tag">${t}</span>`)
                .join("");

            const actionsHtml = [
                p.discord ? `<a class="exp-btn exp-btn-discord" href="${p.discord}" target="_blank" rel="noopener">
                    <i class="fab fa-discord"></i> Discord
                </a>` : "",
                p.link ? `<a class="exp-btn exp-btn-link" href="${p.link.href}" target="_blank" rel="noopener">
                    ${p.link.label}
                </a>` : "",
            ].join("");

            const imgHtml = p.img ? `<img src="${p.img}" class="exp-img" alt="" loading="lazy" width="38" height="38">` : "";

            card.innerHTML = `
                <div class="exp-identity">
                  <div class="exp-header">
                     ${imgHtml}
                     <span class="exp-period">${p.period}</span>
                  </div>
                  <h3 class="exp-title">${p.title}</h3>
                  <div class="exp-role">${p.role}</div>
                </div>
                <div class="exp-detail">
                  <p class="exp-desc">${p.desc}</p>
                  <div class="exp-tags">${tagsHtml}</div>
                  ${actionsHtml ? `<div class="exp-actions">${actionsHtml}</div>` : ""}
                </div>
            `;

            grid.appendChild(card);
        });

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildCards);
    } else {
        buildCards();
    }
})();
