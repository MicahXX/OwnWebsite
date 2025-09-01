let lightmode = localStorage.getItem('lightmode');
const lightmodeButton = document.getElementById('lightmode');

const enableLightmode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
    lightmodeButton.textContent = "🔆";
}

const disableLightmode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
    lightmodeButton.textContent = "🌑";
}

if(lightmode === "active") {
    enableLightmode();
} else {
    disableLightmode();
}

lightmodeButton.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode');
    lightmode !== "active" ? enableLightmode() : disableLightmode();
});
