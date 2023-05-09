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
var scores = JSON.parse(localStorage.getitem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;

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

    // Timer will start as soon as start button is clicked on the screen
    timerCount();
    setNextQuestion();
};

// Creat a function for Go to the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// Create function to Display question and answers
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}; 

// Reset state function create
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};
// Select answer function
function selectAnswer(e) {
    var selectedButton = e.target;
    //console.dir(selectedButton);
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    // Check if the answer ia right or wrong then show the text
    if (correct) {
        checkAnswerEl.innerHTML = "You got it right!";
    } else {
        checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the answer is wrong, decrease time by 10
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
};
// Check and shows the correct answer by setting the color buttons
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};
// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};


// Save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        //localStorage.setItem("scores", JSON.stringify(scores));
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};
var loadScores = function () {
    

    if (!savedScores) {
        return false;
    }

    
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};
