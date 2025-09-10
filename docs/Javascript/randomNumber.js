let secretNumber = 10;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

document.getElementById("submitBtn").addEventListener("click", function() {
    let guess = parseInt(document.getElementById("number").value, 10);

    if (isNaN(guess)) {
        document.getElementById("result").innerHTML = "<h2>Hey, guess a number!</h2>";
        wrongSound.play();
    } else if (guess < 0) {
        document.getElementById("result").innerHTML = "<h2>0-100 not a negative number );</h2>";
        wrongSound.play();
    } else if (guess > 100) {
        document.getElementById("result").innerHTML = "<h2>0-100 not a number over 100 );</h2>";
        wrongSound.play();
    } else if (guess === secretNumber) {
        document.getElementById("result").innerHTML = "<h2>You guessed the correct number!!!</h2>";
        correctSound.play();
    } else {
        document.getElementById("result").innerHTML = "<h2>You guessed the wrong number.....</h2>";
        wrongSound.play();
    }
});





