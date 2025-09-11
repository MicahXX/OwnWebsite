let secretNumber = Math.floor((Math.random() * 11));
userHealth = 3;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

document.getElementById("submitBtn").addEventListener("click", function() {
    let guess = parseInt(document.getElementById("number").value, 10);

    if (userHealth === 0) {
        document.getElementById("userHealth").innerHTML = "<h2>You lost all your lives);</h2>";
    } else if (userHealth <= 0) {
        document.getElementById("userHealth").innerHTML = "<h2>You have no lives left reload website for another try!</h2>";
    }

    if (isNaN(guess) && userHealth > 0) {
        document.getElementById("result").innerHTML = "<h2>Hey, guess a number!</h2>";
        wrongSound.play();
    } else if (guess < 0 && userHealth > 0) {
        document.getElementById("result").innerHTML = "<h2>0-10 not a negative number );</h2>";
        wrongSound.play();
    } else if (guess > 10 && userHealth > 0) {
        document.getElementById("result").innerHTML = "<h2>0-10 not a number over 10 );</h2>";
        wrongSound.play();
    } else if (guess === secretNumber && userHealth > 0) {
        document.getElementById("result").innerHTML = "<h2>You guessed the correct number!!!</h2>";
        correctSound.play();
    } else if (userHealth > 0) {
        userHealth--;
        document.getElementById("result").innerHTML = "<h2>You guessed the wrong number.....</h2>";
        document.getElementById("userHealth").innerHTML = userHealth;
        wrongSound.play();
    }
});





