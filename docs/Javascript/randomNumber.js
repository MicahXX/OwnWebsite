let secretNumber = Math.floor((Math.random() * 11));
userHealth = 3;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const lostSound = document.getElementById("lostSound");

document.getElementById("submitBtn").addEventListener("click", function() {
    let guess = parseInt(document.getElementById("number").value, 10);

    if (isNaN(guess) && userHealth > 0) {
        document.getElementById("result").textContent = "Hey, guess a number!";
        wrongSound.play();
    } else if (guess < 0 && userHealth > 0) {
        document.getElementById("result").textContent = "0-10 not a negative number...";
        wrongSound.play();
    } else if (guess > 10 && userHealth > 0) {
        document.getElementById("result").textContent = "0-10 not a number over 10...";
        wrongSound.play();
    } else if (guess === secretNumber && userHealth > 0) {
        document.getElementById("result").textContent = "You guessed the correct number!!!";
        document.getElementById("userHealth").textContent = "";
        correctSound.play();
    } else if (userHealth > 0 && userHealth !== 0) {
        userHealth--;
        document.getElementById("result").textContent = "You guessed the wrong number....";
        document.getElementById("userHealth").textContent = "Lives left: " + userHealth + "";
        wrongSound.play();
    }

    if (userHealth === 0) {
        document.getElementById("userHealth").textContent = "";
        document.getElementById("result").textContent = "You lost! The number was " + secretNumber + ".";
        lostSound.play();
        userHealth--;
    }
});





