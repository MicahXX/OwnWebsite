let whitemode = localStorage.getItem('whitemode');
const whitemodeButton = document.getElementById('whitemode');

const enableWhitemode = () => {
    document.body.classList.add('whitemode');
    localStorage.setItem('whitemode', 'active');
}

const disableWhitemode = () => {
    document.body.classList.remove('whitemode');
    localStorage.setItem('whitemode', null);
}

if(whitemode === "active") enableWhitemode();

whitemodeButton.addEventListener("click", (e) => {
    whitemode = localStorage.getItem('whitemode');
    whitemode !== "active" ? enableWhitemode() : disableWhitemode();
})

const changeText = document.querySelector("#whitemode");

changeText.addEventListener("click", function() {
    if (whitemode === "active") changeText.textContent = "Darkmode";
    if (whitemode !== "active") changeText.textContent = "Whitemode";
});
