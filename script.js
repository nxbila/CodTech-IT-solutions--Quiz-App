let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-questions");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Quiz questions and answers array
const quizArray = [
    {
        id: 0,
        question: "HTML stands for ____:",
        options:[
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "None of these",
        ],
        correct: "HyperText Markup Language"
    },
      {
        "id": "1",
        "question": "CSS stands for ____:",
        "options": [
          "Counter Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
          "Cascading Style Sheets"
        ],
        "correct": "Cascading Style Sheets"
      },
      {
        "id": "2",
        "question": "What does JavaScript primarily add to a website?",
        "options": [
          "Styling and Layout",
          "Interactivity",
          "Database Management",
          "Server-side processing"
        ],
        "correct": "Interactivity"
      },
      {
        "id": "3",
        "question": "Which of the following is a programming language?",
        "options": [
          "HTML",
          "CSS",
          "Java",
          "XML"
        ],
        "correct": "Java"
      },
      {
        "id": "4",
        "question": "What is the purpose of the <head> element in HTML?",
        "options": [
          "To define the main content of the page",
          "To contain metadata about the document",
          "To create a header section",
          "To define a hyperlink"
        ],
        "correct": "To contain metadata about the document"
      },
      {
        "id": "5",
        "question": "What does the acronym API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Automated Processing Interface",
          "All Purpose Interface"
        ],
        "correct": "Application Programming Interface"
      },
      {
        "id": "6",
        "question": "Which symbol is used for single-line comments in JavaScript?",
        "options": [
          "//",
          "/*",
          "--",
          "#"
        ],
        "correct": "//"
      },
      {
        "id": "7",
        "question": "What is the purpose of the SQL language?",
        "options": [
          "Styling web pages",
          "Creating animations",
          "Database management",
          "Server-side scripting"
        ],
        "correct": "Database management"
      },
      {
        "id": "8",
        "question": "In programming, what is the role of a variable?",
        "options": [
          "To store and manipulate data",
          "To create graphical elements",
          "To define HTML structure",
          "To manage server configuration"
        ],
        "correct": "To store and manipulate data"
      },
      {
        "id": "9",
        "question": "What is the file extension for a Cascading Style Sheet (CSS) file?",
        "options": [
          ".html",
          ".css",
          ".js",
          ".txt"
        ],
        "correct": ".css"
      }    
]
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext =  () => {
    questionCount += 1;

    if(questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your Score is " + 
        scoreCount + " out of " + questionCount
    }
    else{
        countOfQuestion.innerHTML =  questionCount + 1 +
        " of "+  quizArray.length + " Question";
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
    removeFeedback();
}));
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if(count == 0){
            clearInterval(countdown);
            displayNext();
        } 
    },1000);
};
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};
function quizCreator(){
    quizArray.sort(() => Math.random() - 0.5);

    for(let i of quizArray){
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " +
        quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        
        div.innerHTML += `
        <button class = "option-div" onclick = "checker(this)">
        ${i.options[0]}</button>
        <button class = "option-div" onclick = "checker(this)">
        ${i.options[1]}</button>
        <button class = "option-div" onclick = "checker(this)">
        ${i.options[2]}</button>
        <button class = "option-div" onclick = "checker(this)">
        ${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
} 
function checker(userOption){
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if(userSolution === quizArray[questionCount]. correct){
        userOption.classList.add("correct");
        scoreCount++;
        displayFeedback("Correct!", "green");
    }
    else{
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if(element.innerText === quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        });
        displayFeedback("Incorrect!", "red");
    }

clearInterval(countdown);
options.forEach((element) => {
    element.disabled = true;
});

}
function displayFeedback(message, color) {
  let feedbackDiv = document.createElement("div");
  feedbackDiv.classList.add("feedback");
  feedbackDiv.style.color = color;
  feedbackDiv.innerHTML = message;
  quizContainer.appendChild(feedbackDiv);
}

function removeFeedback() {
  let feedbackDiv = document.querySelector(".feedback");
  if (feedbackDiv) {
      feedbackDiv.remove();
  }
}
function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator(); 
    quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};