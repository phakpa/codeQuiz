const highscoreEL = document.querySelector(".highscore");
const timerEL = document.querySelector(".timer");
const questionsEL = document.querySelector(".questions");
const startButtonEL = document.querySelector(".startButton");
const answerAEL = document.querySelector(".answerA");
const answerBEL = document.querySelector(".answerB");
const answerCEL = document.querySelector(".answerC");
const answerDEL = document.querySelector(".answerD");
const rightWrongEL = document.querySelector(".rightWrong");
const submissionEL = document.querySelector(".submission");
const formMainEL = document.querySelector(".formMain");
const mainEL = document.querySelector(".main");
const finalScoreEL = document.querySelector(".finalScore");

const userIdEL = document.querySelector("#userID");
const highScoreFormEL = document.querySelector(".highScoreForm");
const highScoreFormMainEL = document.querySelector(".highScoreFormMain");
const highScoreList = document.querySelector("#highScore-list");
const userSubmitEL = document.querySelector(".userSubmit");
const goBackBtnEL = document.querySelector(".goBackBtn");
const clearScoreBtnEL = document.querySelector(".clearScoreBtn");

let questionsArr = [
  {
    question:
      "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    answerA: "The User's machine running a Web browser",
    answerB: "The Web server",
    answerC: "A central machine deep within Netscape's corporate offices",
    answerD: "None of the above",
    //answer : A
  },
  {
    question: "______ JavaScript is also called client-side JavaScript.",
    answerA: "Microsoft",
    answerB: "Navigator",
    answerC: "LiveWire",
    answerD: "Native",
    //answer : B
  },
  {
    question: "__________ JavaScript is also called server-side JavaScript.",
    answerA: "Microsoft",
    answerB: "Navigator",
    answerC: "LiveWire",
    answerD: "Native",
    //answer : C
  },
  {
    question: "What are variables used for in JavaScript Programs?",
    answerA: "Storing numbers, dates, or other values",
    answerB: "Varying randomly",
    answerC: "Causing high-school algebra flashbacks",
    answerD: "None of the above",
    //answer : A
  },
  {
    question:
      "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
    answerA: "Client-side",
    answerB: "Server-side",
    answerC: "Local",
    answerD: "Native",
    //answer : A
  },
  {
    question:
      "Which of the following can't be done with client-side JavaScript?",
    answerA: "Validating a form",
    answerB: "Sending a form's contents by email",
    answerC: "Storing the form's contents to a database file on the server",
    answerD: "None of the above",
    //answer : C
  },
  {
    question:
      "Which of the following are capabilities of functions in JavaScript?",
    answerA: "Return a value",
    answerB: "Accept parameters and Return a value",
    answerC: "Accept parameters",
    answerD: "None of the above",
    //answer : C
  },
  {
    question: "Which of the following is not a valid JavaScript variable name?",
    answerA: "FirstAndLast",
    answerB: "_first_and_last_names",
    answerC: "None of the above",
    answerD: "2names",
    //answer : D
  },
  {
    question:
      "______ tag is an extension to HTML that can enclose any number of JavaScript",
    answerA: "<TITLE>",
    answerB: "<BODY>",
    answerC: "<HEAD>",
    answerD: "<SCRIPT>",
    //answer : D
  },
  {
    question: "How does JavaScript store dates in a date object?",
    answerA: "The number of milliseconds since January 1st, 1970",
    answerB: "The number of days since January 1st, 1900",
    answerC: "The number of seconds since Netscape's public stock offering.",
    answerD: "None of the above",
    //answer : A
  },
];

let questionsIndex = 0;
let secondsLeft = 0;
let correctIncorrect = -1;
let count = 0;
let stopTimer = 0;
let highScoresArr = [];

mainPage();

init();

function renderHS() {
  highScoreList.innerHTML = "";

  for (let i = 0; i < highScoresArr.length; i++) {
    let highScore = highScoresArr[i];

    let li = document.createElement("li");
    li.textContent = highScore;
    li.setAttribute("data-index", i);

    highScoreList.appendChild(li);
  }
}

function init() {
  let storedHS = JSON.parse(localStorage.getItem("highScores"));
  if (storedHS !== null) {
    highScoresArr = storedHS;
  }
  renderHS();
}

function storeHS() {
  localStorage.setItem("highScores", JSON.stringify(highScoresArr));
}

userSubmitEL.addEventListener("click", function (event) {
  event.preventDefault();

  let HSText = userIdEL.value.trim();

  if (HSText === "") {
    return;
  }

  highScoresArr.push(HSText);
  userIdEL.value = "";

  storeHS();
  renderHS();
});

clearScoreBtnEL.addEventListener("click", function (event) {
  let element = event.target;

  if (element.matches("button") === true) {
    let index = element.parentElement.getAttribute("data-index");
    highScoresArr.splice(index, 100);

    storeHS();
    renderHS();
  }
});

function mainPage() {
  count = 0;
  stopTimer = 0;
  secondsLeft = 0;
  questionsIndex = 0;
  correctIncorrect = -1;
  submissionEL.classList.add("hide");
  questionsEL.classList.remove("hide");
  startButtonEL.classList.remove("hide");
  timerEL.classList.remove("hide");
  highscoreEL.classList.remove("hide");
  highScoreFormMainEL.classList.add("hide");
  formMainEL.classList.add("hide");
  highscoreEL.innerHTML = '<a href="#">View Highscores</a>';
  timerEL.textContent = "Timer: " + secondsLeft;
  questionsEL.innerHTML =
    "<h1>Coding Quiz Challenge</h1> <p>There are a total of 10 questions, you get 5 seconds subtracted from your final time for every wrong answer. Good luck and have fun!</p>";
  startButtonEL.innerHTML = "Start";
  mainEL.classList.add("center");
  answerAEL.classList.add("hide");
  answerBEL.classList.add("hide");
  answerCEL.classList.add("hide");
  answerDEL.classList.add("hide");
}

function startGame() {
  secondsLeft = 75;
  setTime();
  mainEL.classList.remove("center");
  nextQuestion();
  startButtonEL.classList.add("hide");
  answerAEL.classList.remove("hide");
  answerBEL.classList.remove("hide");
  answerCEL.classList.remove("hide");
  answerDEL.classList.remove("hide");
}

function nextQuestion() {
  correctAnswer();
  if (count > 0) {
    rightWrongEL.classList.remove("hide");
  }
  questionsEL.textContent = questionsArr[questionsIndex].question;
  answerAEL.textContent = questionsArr[questionsIndex].answerA;
  answerBEL.textContent = questionsArr[questionsIndex].answerB;
  answerCEL.textContent = questionsArr[questionsIndex].answerC;
  answerDEL.textContent = questionsArr[questionsIndex].answerD;
  questionsIndex++;
}

function submission() {
  correctAnswer();
  submissionEL.classList.remove("hide");
  formMainEL.classList.remove("hide");
  answerAEL.classList.add("hide");
  answerBEL.classList.add("hide");
  answerCEL.classList.add("hide");
  answerDEL.classList.add("hide");
  questionsEL.classList.add("hide");

  finalScoreEL.innerHTML = "Your Final Score is: " + (secondsLeft - 1);
}

function correctAnswer() {
  if (correctIncorrect === 0) {
    if (secondsLeft > 6) {
      secondsLeft = secondsLeft - 5;
    } else {
      secondsLeft = 0;
    }
    rightWrongEL.textContent = "Wrong!";
  } else if (correctIncorrect === 1) {
    rightWrongEL.textContent = "Correct!";
  } else {
  }
}

function highScores() {
  mainEL.classList.remove("center");
  highScoreFormMainEL.classList.remove("hide");
  questionsEL.classList.add("hide");
  startButtonEL.classList.add("hide");
  timerEL.classList.add("hide");
  highscoreEL.classList.add("hide");
  submissionEL.classList.add("hide");
  formMainEL.classList.add("hide");
  rightWrongEL.classList.add("hide");
  answerAEL.classList.add("hide");
  answerBEL.classList.add("hide");
  answerCEL.classList.add("hide");
  answerDEL.classList.add("hide");
}

function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timerEL.textContent = "Timer: " + secondsLeft;

    if (secondsLeft === 0 || stopTimer === 1) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startButtonEL.addEventListener("click", function () {
  startGame();
});

highscoreEL.addEventListener("click", function () {
  highScores();
});
userSubmitEL.addEventListener("click", function () {
  highScores();
});
answerAEL.addEventListener("click", function () {
  if (count === 0 || count === 3 || count === 4 || count === 9) {
    correctIncorrect = 1;
  } else {
    correctIncorrect = 0;
  }
  count++;
  if (count < questionsArr.length) {
    nextQuestion();
  } else {
    stopTimer = 1;
    submission();
  }
});
answerBEL.addEventListener("click", function () {
  if (count === 1) {
    correctIncorrect = 1;
  } else {
    correctIncorrect = 0;
  }
  count++;
  if (count < questionsArr.length) {
    nextQuestion();
  } else {
    stopTimer = 1;
    submission();
  }
});
answerCEL.addEventListener("click", function () {
  if (count === 2 || count === 5 || count === 6) {
    correctIncorrect = 1;
  } else {
    correctIncorrect = 0;
  }
  count++;
  if (count < questionsArr.length) {
    nextQuestion();
  } else {
    stopTimer = 1;
    submission();
  }
});
answerDEL.addEventListener("click", function () {
  if (count === 7 || count === 8) {
    correctIncorrect = 1;
  } else {
    correctIncorrect = 0;
  }
  count++;
  if (count < questionsArr.length) {
    nextQuestion();
  } else {
    stopTimer = 1;
    submission();
  }
});

goBackBtnEL.addEventListener("click", function () {
  mainPage();
});
