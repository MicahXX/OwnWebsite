let lightmode = localStorage.getItem('lightmode');
const lightmodeButton = document.getElementById('lightmode');

const enableLightmode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
}

const disableLightmode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
}

if(lightmode === "active") enableLightmode();

lightmodeButton.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode');
    lightmode !== "active" ? enableLightmode() : disableLightmode();
})

const changeText = document.querySelector("#lightmode");

changeText.addEventListener("click", function() {
    lightmode = localStorage.getItem('lightmode');
    if (lightmode === "active") changeText.textContent = "Dark mode";
    if (lightmode !== "active") changeText.textContent = "Light mode";
});
