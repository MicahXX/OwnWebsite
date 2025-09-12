let secretNumber = Math.floor((Math.random() * 11));
let userHealth = 3;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const lostSound = document.getElementById("lostSound");

const actionBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");
const userHealthDiv = document.getElementById("userHealth");

actionBtn.addEventListener("click", function handleClick() {
    if (actionBtn.value === "Retry" || actionBtn.value === "Again") {
        secretNumber = Math.floor(Math.random() * 11);
        userHealth = 3;
        userHealthDiv.textContent = "Lives left: " + userHealth;
        resultDiv.textContent = "";
        actionBtn.value = "Result";
        return;
    }

    let guess = parseInt(document.getElementById("number").value, 10);

    if (isNaN(guess) && userHealth > 0) {
        resultDiv.textContent = "Hey, guess a number!";
        wrongSound.play();
    } else if (guess < 0 && userHealth > 0) {
        resultDiv.textContent = "0-10 not a negative number...";
        wrongSound.play();
    } else if (guess > 10 && userHealth > 0) {
        resultDiv.textContent = "0-10 not a number over 10...";
        wrongSound.play();
    } else if (guess === secretNumber && userHealth > 0) {
        resultDiv.textContent = "You guessed the correct number!!!";
        userHealthDiv.textContent = "";
        correctSound.play();

        actionBtn.value = "Again";
    } else if (userHealth > 0) {
        userHealth--;
        if (userHealth === 0) {
            userHealthDiv.textContent = "";
            resultDiv.textContent = "You lost! The number was " + secretNumber + ".";
            lostSound.play();
            actionBtn.value = "Retry";
        } else {
            resultDiv.textContent = "You guessed the wrong number....";
            userHealthDiv.textContent = "Lives left: " + userHealth;
            wrongSound.play();
        }
    }
});