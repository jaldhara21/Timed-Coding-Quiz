//Start quiz eith timer and create a variables
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var submitButton = document.getElementById("submit-btn");
var viewHighScores = document.getElementById("view-high-scores");
var goBackButton = document.getElementById("goback-btn");
var clearHighScoreButton = document.getElementById("clearhighscore-btn");
var initialsField = document.getElementById("player-name");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;

// Attach event listener to start button to call startgame function on click and next button.
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//Create a function for timer countdown
function timerCount() {
  timeLeft--;
  timerEl.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
    saveScore();
  }
}

// Create a startGame function to start quiz
function startGame() {
  timerID = setInterval(timerCount, 1000);
  startContainerEl.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");

  // Timer will start as soon as start button is clicked on the screen
  timerCount();
  setNextQuestion();
}

// Creat a function for Go to the next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Create function to Display question and answers
function showQuestion(question) {
  console.log(question);
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    // Add a data attribute to the button to check it's the correct answer or not
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

// Reset state function create
function resetState() {
  //clearStatusClass(document.body)
  console.log("next btn: ", nextButton, checkAnswerEl);
  nextButton.classList.add("hide");
  checkAnswerEl.classList.add("hide");
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

// Select answer button function
function selectAnswer(e) {
  var selectedButton = e.target;
  //console.dir(selectedButton);
  var correct = selectedButton.dataset.correct;
  checkAnswerEl.classList.remove("hide");
  // Create if else statement to Check if the answer is right or wrong then show the text
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

  Array.from(answerButtonsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    checkAnswerEl.classList.remove("hide");
  } else {
    startButton.classList.remove("hide");
    saveScore();
  }
}

// Check and shows the correct answer by setting the color buttons
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

//  Remove all the classes
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// create function for Save scores
function saveScore() {
  clearInterval(timerID);
  timerEl.textContent = "Time: " + timeLeft;
  setTimeout(function () {
    //localStorage.setItem("scores", JSON.stringify(scores));
    questionContainerEl.classList.add("hide");
    document.getElementById("score-container").classList.remove("hide");
    document.getElementById("your-score").textContent =
      "Your final score is " + timeLeft;
  }, 2000);
}

var loadScores = function () {
  if (!saveScore) {
    return false;
  }

  saveScore = JSON.parse(saveScore);
  var initials = document.querySelector("#initials-field").value;
  var newScore = {
    score: timeLeft,
    initials: initials,
  };
  saveScore.push(newScore);
  console.log(saveScore);

  saveScore.forEach((score) => {
    initialsField.innerText = score.initials;
    scoreField.innerText = score.score;
  });
};

//create a show high score function
function showHighScores(initials) {
  document.getElementById("highscores").classList.remove("hide");
  document.getElementById("score-container").classList.add("hide");
  startContainerEl.classList.add("hide");
  questionContainerEl.classList.add("hide");
  if (typeof initials == "string") {
    var score = {
      initials,
      timeLeft,
    };
    scores.push(score);
  }

  var highScoreEl = document.getElementById("highscore");
  highScoreEl.innerHTML = "";
  for (i = 0; i < scores.length; i++) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "name-div");
    div1.innerText = scores[i].initials;
    var div2 = document.createElement("div");
    div2.setAttribute("class", "score-div");
    div2.innerText = scores[i].timeLeft;

    highScoreEl.appendChild(div1);
    highScoreEl.appendChild(div2);
  }

  // The scores data will be store in client storage
  localStorage.setItem("scores", JSON.stringify(scores));
}

//Attaches event listener to view high score
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initial-field").value;
  showHighScores(initials);
});

//Attaches event listener to go back button
goBackButton.addEventListener("click", function () {
  window.location.reload();
});

//Attaches event listener to high score button and clear local storage item
clearHighScoreButton.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscore").innerHTML = "";
});
