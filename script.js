const highscoreEL = document.querySelector(".highscore");
const timerEL = document.querySelector(".timer");
const questionsEL = document.querySelector(".questions");
const answer1EL = document.querySelector(".answer1");
const answer2EL = document.querySelector(".answer2");
const answer3EL = document.querySelector(".answer3");
const answer4EL = document.querySelector(".answer4");
const rightWrongEL = document.querySelector(".rightWrong");

let timedClock = 0;
let correctIncorrect = -1;


questionOne();






function questionOne() {

highscoreEL.innerHTML= '<a href="script.js">View Highscores</a>';


timerEL.textContent = "Timer: ";
questionsEL.textContent = "What does CSS stand for?";
const newDiv = document.createElement('button');
newDiv.setAttribute('class', "btn btn-outline-primary answers");
newDiv.setAttribute('type', "button");
newDiv.textContent = "Creative Style Sheets";
const newDiv2 = document.createElement('button');
newDiv2.setAttribute('class', "btn btn-outline-primary answers");
newDiv2.setAttribute('type', "button");
newDiv2.textContent = "Computer Style Sheets";
const newDiv3 = document.createElement('button');
newDiv3.setAttribute('class', "btn btn-outline-primary answers");
newDiv3.setAttribute('type', "button");
newDiv3.textContent = "Coloful Style Sheets";
const newDiv4 = document.createElement('button');
newDiv4.setAttribute('class', "btn btn-outline-primary answers");
newDiv4.setAttribute('type', "button");
newDiv4.textContent = "Cascading Style Sheets";

answer1EL.appendChild(newDiv);
answer2EL.appendChild(newDiv2);
answer3EL.appendChild(newDiv3);
answer4EL.appendChild(newDiv4);

onclick
}




function clear () {
    highscoreEL.textContent = "";
    timerEL.textContent = "";
    questionsEL.textContent = "";
    answer1EL.textContent = "";
    answer2EL.textContent = "";
    answer3EL.textContent = "";
    answer4EL.textContent = "";
}



