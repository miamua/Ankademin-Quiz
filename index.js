//-------------- get qustion's choices -------------------
function getQuestionChoices() {
    for (i = 0; i < questionsArr[questionNumber].answers.length; i++) {
        answerInput = document.createElement("input")
        answerInput.setAttribute("type", questionsArr[questionNumber].type);
        answerInput.setAttribute("name", "answer");
        answerInput.setAttribute("value", questionsArr[questionNumber].answers[i]);
        questionAnswer.append(answerInput)
        answerLabel = document.createElement("label");
        answerLabel.innerHTML = (questionsArr[questionNumber].answers[i])
        questionAnswer.append(answerLabel)
    }
}

//-------------- calculate grade function -------------------
function grade() {
    if (points >= maxPoints * 0.75) {
        gradeText.innerText = "Mycket väl godkänd Dude!";
        gradeText.style.color = "green";

    } else if (points >= maxPoints * 0.5 && points < maxPoints * 0.75) {
        gradeText.innerText = "Godkänd!";
        gradeText.style.color = "orange";
    } else {
        gradeText.innerText = "Underkänd!";
        gradeText.style.color = "red";
    }

}

//-------------- show all questions/user answers/results function -------------------
function getAllquestion() {
    let scoreTable = document.createElement("table");
    scoreTable.style.width = "100%";
    let scoreRow = document.createElement("tr");
    let allquestions = document.createElement("th");
    let allUserAnswers = document.createElement("th");
    let allResults = document.createElement("th");
    allquestions.textContent = "Questions";
    allUserAnswers.innerText = "Your answers";
    allResults.innerText = "Results";
    document.querySelector("#allResults").append(scoreTable);
    scoreTable.append(scoreRow);
    scoreRow.append(allquestions, allUserAnswers, allResults);

    endResults.forEach((question) => {
        let questionsRow = document.createElement("tr");
        let questionsItem = document.createElement("td");
        let userAnswerItem = document.createElement("td");
        let ResultItem = document.createElement("td");
        questionsItem.innerText = question.question;
        userAnswerItem.innerText = question.playerAns;
        ResultItem.innerText = question.Result;
        questionsItem.style.textAlign = "left";
        userAnswerItem.style.textAlign = "center";
        ResultItem.style.textAlign = "center";
        scoreTable.append(questionsRow);
        questionsRow.append(questionsItem, userAnswerItem, ResultItem);
    })
};


let questionsArr = [
    {
        question: "1. Fish cannot blink?",
        answers: ["true", "false"],
        correct: ["true"],
        type: "radio"
    },
    {
        question: "2. Is the earth flat?",
        answers: ["true", "false"],
        correct: ["false"],
        type: "radio"
    },
    {
        question: "3. What colour is the “m” from the McDonald’s logo?",
        answers: ["Blue", "Red", "Yellow", "Black"],
        correct: ["Yellow"],
        type: "radio"
    },
    {
        question: "4. Which of these EU countries does not use the euro as its currency?",
        answers: ["Poland", "Denmark", "Sweden", "All of the above"],
        correct: ["All of the above"],
        type: "radio"
    },
    {
        question: "5. Which animals has 4 legs?",
        answers: ["Bear", "Bird", "Buffalo", "Fox"],
        correct: ["Bear", "Buffalo", "Fox"],
        type: "checkbox"
    },
    {
        question: "6. Which country is in Asia?",
        answers: ["Japan", "Thailand", "Sweden", "England"],
        correct: ["Japan", "Thailand"],
        type: "checkbox"
    },
    {
        question: "7. What does the term “SOS” commonly stand for?",
        answers: ["Save Our Sheep", "Save Our Ship", "Save Our Seal", "Save Our Souls"],
        correct: ["Save Our Souls"],
        type: "radio"
    },
    {
        question: "8. Which company is known for publishing the Mario video game?",
        answers: ["Xbox", "Nintendo", "SEGA", "Electronic Arts"],
        correct: ["Nintendo"],
        type: "radio"
    },
    {
        question: "9. Mars is the closest planet to the Sun?",
        answers: ["true", "false"],
        correct: ["false"],
        type: "radio"
    },
    {
        question: "10. Is this the last question?",
        answers: ["true", "false"],
        correct: ["true"],
        type: "radio"
    },

];

//Declare all variables 
let questionNumber = 0
let points = 0;
let maxPoints = 10;
let endResults = [];
let questionBox = document.querySelector("#questionbox")
let questionAnswer = document.querySelector("#questionAnswer")
let question = document.querySelector("#question")
let answerSubmit = document.createElement("button")
answerSubmit.setAttribute("id", "submit");  //set element id for answerSubmit button
answerSubmit.innerText = "Submit"
let startQuiz = document.createElement("button")
startQuiz.setAttribute("id", "startQuiz")
startQuiz.innerText = "Start Quiz";
document.querySelector("#startBtn").append(startQuiz)
let restartBtn = document.createElement("button")
restartBtn.setAttribute("id", "restartBtn")
restartBtn.innerText = "Try again";
let resultBtn = document.createElement("button");
resultBtn.innerText = "Show score";
resultBtn.setAttribute("id", "showScore");


//when startQuiz button is clicked
startQuiz.addEventListener("click", () => {
    question.innerText = questionsArr[questionNumber].question;
    //remove startQuiz button and display answerSubmit button
    startQuiz.remove()
    questionBox.append(answerSubmit)
    getQuestionChoices()

});

//when submit button is clicked
answerSubmit.addEventListener("click", () => {
    let answered = false;
    let answeredQuestions = []; //arr for chosen answer
    let answer = document.getElementsByName("answer"); //"answer" crated in getQuestionChoices function
    let RightOrWrong = "";

    //looping over all answers to check which one is checked
    for (i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            answered = true;
            answeredQuestions.push(answer[i].value)
        }
    }
    console.log(questionsArr[questionNumber].correct)
    console.log(answeredQuestions)

    //check if answer is correct
    //JSON.stringify makes the array into a string
    if (JSON.stringify(answeredQuestions) === JSON.stringify(questionsArr[questionNumber].correct)) {
        console.log("Rätt")
        RightOrWrong = "✅";
        points++;
    } else {
        console.log("Wrong")
        RightOrWrong = "❌";
    }

    //no choices is picked
    if (!answered) {
        alert("Please select an answer");
        //question number < 10 so continue display questions
    } else if (questionNumber < questionsArr.length - 1) {
        let putAllData = { "question": questionsArr[questionNumber].question, "playerAns": answeredQuestions, "Result": RightOrWrong };
        endResults.push(putAllData);
        questionAnswer.innerHTML = "";
        questionNumber++
        question.innerText = questionsArr[questionNumber].question;
        getQuestionChoices()

        //out of questions
    } else {
        let putAllData = { "question": questionsArr[questionNumber].question, "playerAns": answeredQuestions, "Result": RightOrWrong };
        endResults.push(putAllData);
        document.querySelector("#questionbox").style.display = "none";
        document.querySelector("#resultBox").append(resultBtn);

    }

})

resultBtn.addEventListener("click", () => {
    console.log("Finished! Your score is " + points);
    result = document.createElement("h2");
    result.innerText = "Finished! Your score is " + points;
    document.querySelector("#resultBox").append(result);
    resultBtn.style.display = "none";
    document.querySelector("#startBtn").append(restartBtn);
    gradeText = document.createElement("h2");
    document.querySelector("#resultBox").append(gradeText);
    grade();
    getAllquestion()
    console.log(endResults)
})


//-------------- Dark mode part -------------------
// Dark mode button
let darkModeBtn = document.createElement("button");
let darkMode = document.querySelector("body");
darkModeBtn.setAttribute("id", "darkMode");
darkModeBtn.innerText = "Dark mode";
document.querySelector("#switchMode").append(darkModeBtn);

//Light mode button
let lightModeBtn = document.createElement("button");
let lightMode = document.querySelector("body");
lightModeBtn.setAttribute("id", "lightMode");
lightModeBtn.innerText = "Light mode";


darkModeBtn.addEventListener("click", () => {
    darkMode.style.backgroundColor = "black";
    darkMode.style.color = "white";
    document.querySelector("#switchMode").append(lightModeBtn);
    darkModeBtn.style.display = "none"; //hide darkModeBtn
    lightModeBtn.style.display = ""; //display lightModeBtn

});


lightModeBtn.addEventListener("click", () => {
    lightMode.style.backgroundColor = "white";
    lightMode.style.color = "black";
    darkModeBtn.style.display = "";
    lightModeBtn.style.display = "none";
});


restartBtn.addEventListener("click", () => {
    window.location.reload();
})
