//Start quiz eith timer and create a variables
var timeLeft = 80;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("qus-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var submitButton = document.getElementById("submit-btn");
var viewHighScores = document.getElementById("highscores");
var goBackButton = document.getElementById("go-back");
var clearHighScoreButton = document.getElementById("clear-high-score");
var initialsField = document.getElementById("player-name");
var scoreField = document.getElementById("player-score");


// Attach event listener to start button to call startButton function on click and next button.
startButton.addEventListener("click", startButton);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});
//Creat a function for timer countdown
function timerCount() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}
// Create a startGame function
function startGame() {
    timerID = setInterval(timerCount, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    // Timer will start as soon as start button is clicked
    timerCount();
    setNextQuestion();
};