const question = document.getElementById("questions");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeleft = 120;
let badGuess = false;

let questions = [
  {
    question: "JavaScript arrays are used to do what?",
    choice1: "find the lenght of a string",
    choice2: "store multiple values in a single variable",
    choice3: "specify how an element should float",
    choice4: "adds a new element to an array",
    answer: 2
  },

  {
    question: "A JavaScript Boolean represents one of two values?",
    choice1: "true or false",
    choice2: "on or off",
    choice3: "yes or no",
    choice4: "greater than or less than",
    answer: 1
  },

  {
    question: "columns must sum to a width of ?",
    choice1: "6 columns",
    choice2: "10 columns",
    choice3: "12 columns",
    choice4: "3 columns",
    answer: 3
  },

  {
    question: "what is css ?",
    choice1: "central security service",
    choice2: "customer service support",
    choice3: "critical system support",
    choice4: "cascading style sheets",
    answer: 4
  },

  {
    question: " ___ is the code with natural language mixed with java code.",
    choice1: "java program",
    choice2: "A java statement",
    choice3: "Pseudocode",
    choice4: "A flowchart diagram",
    answer: 3
  }
];

//constants
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", timeleft);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// below the functions that generates questions anfter you click on the answer
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      badGuess = true;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// This is the timer function
var downloadTimer = setInterval(function() {
  timeleft--;
  badGuess ? (timeleft -= 15) : "";
  scoreText.innerText = timeleft;
  badGuess = false;
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
  }
}, 1000);
startGame();
