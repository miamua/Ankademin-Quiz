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


let questionNumber = 0
let points = 0;
let maxPoints = 10;
let questionBox = document.querySelector("#questionbox")
let questionAnswer = document.querySelector("#questionAnswer")
let question = document.querySelector("#question")
let answerSubmit = document.createElement("button")
let startQuiz = document.createElement("button")
startQuiz.setAttribute("id", "startQuiz")
answerSubmit.textContent = "Submit"
answerSubmit.setAttribute("id", "submit");
startQuiz.innerHTML = "Start Quiz"
let endResults = [];
questionBox.append(startQuiz)


startQuiz.addEventListener("click", () => {
    question.innerText = questionsArr[questionNumber].question;
    startQuiz.remove()
    questionBox.append(answerSubmit)
    for (i = 0; i < questionsArr[questionNumber].answers.length; i++) {
        let radioButton = document.createElement("input")
        radioButton.setAttribute("type", questionsArr[questionNumber].type);
        radioButton.setAttribute("name", "answear");
        radioButton.setAttribute("value", questionsArr[questionNumber].answers[i]);
        radioButton.setAttribute("id", "answear" + i);
        questionAnswer.appendChild(radioButton);

        let radioLabel = document.createElement("label");
        radioLabel.innerHTML = (questionsArr[questionNumber].answers[i])
        questionAnswer.appendChild(radioLabel)
    }

});

answerSubmit.addEventListener("click", () => {
    let answered = false;
    let answeredQuestions = [];
    let answer = document.getElementsByName("answear");
    let RightOrWrong = ""
    for (i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            answered = true
            answeredQuestions.push(answer[i].value)
        }
    }
    console.log(questionsArr[questionNumber].correct)
    console.log(answeredQuestions)
    if (JSON.stringify(answeredQuestions) == JSON.stringify(questionsArr[questionNumber].correct)) {
        console.log("Rätt")
        RightOrWrong = "✅";
        points++;
    } else {
        console.log("Wrong")
        RightOrWrong = "❌";
    }

    if (!answered) {
        alert("Please select an answear");
    } else if (questionNumber < questionsArr.length - 1) {
        let testToPutAll = { "question": questionsArr[questionNumber].question, "playerAns": answeredQuestions, "Result": RightOrWrong };
        endResults.push(testToPutAll);

        questionAnswer.innerHTML = ""
        questionNumber++
        question.innerText = questionsArr[questionNumber].question;

        for (i = 0; i < questionsArr[questionNumber].answers.length; i++) {
            radioButton = document.createElement("input")
            radioButton.setAttribute("type", questionsArr[questionNumber].type);
            radioButton.setAttribute("name", "answear");
            radioButton.setAttribute("value", questionsArr[questionNumber].answers[i]);
            radioButton.setAttribute("id", "answear" + i);
            questionAnswer.appendChild(radioButton)

            radioLabel = document.createElement("label");
            radioLabel.innerHTML = (questionsArr[questionNumber].answers[i])
            questionAnswer.appendChild(radioLabel)
        }
    } else {
        let testToPutAll = { "question": questionsArr[questionNumber].question, "playerAns": answeredQuestions, "Result": RightOrWrong };
        endResults.push(testToPutAll);
        document.querySelector("#questionbox").style.display = "none";
        let resultBtn = document.createElement("button");
        resultBtn.innerText = "Show score";
        resultBtn.setAttribute("id", "showScore"),
            document.querySelector("#resultBox").append(resultBtn);


        resultBtn.addEventListener("click", () => {
            console.log("Finished! Your score is " + points);
            result = document.createElement("h2");
            result.innerText = "Finished! Your score is " + points;
            document.querySelector("#resultBox").append(result);
            resultBtn.style.display = "none";
            gradeText = document.createElement("h3");

            grade(); //call grade function
            document.querySelector("#resultBox").append(gradeText);
            getAllquestion()
            console.log(endResults)
        })

    }


})

function getAllquestion() {
    let scoreTable = document.createElement("table");
    scoreTable.style.width = "100%";
    scoreTable.setAttribute("id", "scoreTable");
    let scoreRow = document.createElement("tr");
    let allquestions = document.createElement("th");
    let allUserAnswers = document.createElement("th");
    let allCorrectAnswers = document.createElement("th");
    document.querySelector("#allResults").append(scoreTable);
    scoreTable.append(scoreRow);
    allquestions.textContent = "Questions";
    allCorrectAnswers.innerText = "Results";
    allUserAnswers.innerText = "Your answers";
    scoreRow.append(allquestions, allUserAnswers, allCorrectAnswers);



    endResults.forEach((question) => {
        let questionsRow = document.createElement("tr");
        let questionsItem = document.createElement("td");
        questionsItem.setAttribute("id", "questionItem");
        let userAnswerItem = document.createElement("td");
        let ResultItem = document.createElement("td");
        questionsItem.innerText = question.question;
        userAnswerItem.style.textAlign = "center";
        ResultItem.style.textAlign = "center";
        userAnswerItem.innerText = question.playerAns;
        ResultItem.innerText = question.Result;
        document.querySelector("table").append(questionsRow);

        questionsRow.append(questionsItem);
        questionsRow.append(userAnswerItem);
        questionsRow.append(ResultItem);
    })
};


//-------------- Dark mode part -------------------
let darkModeBtn = document.querySelector("#darkMode");
let darkMode = document.querySelector("body");
let lightMode = document.querySelector("body");
let lightModeBtn = document.createElement("button");
lightModeBtn.setAttribute("id", "lightMode");


darkModeBtn.addEventListener("click", () => {
    darkMode.style.backgroundColor = "black";
    darkMode.style.color = "white";
    document.querySelector("#switchMode").append(lightModeBtn);
    lightModeBtn.innerText = "Light mode";
    lightModeBtn.style.display = "";
    darkModeBtn.style.display = "none";
});


lightModeBtn.addEventListener("click", () => {
    lightMode.style.backgroundColor = "white";
    lightMode.style.color = "black";
    darkModeBtn.style.display = "";
    lightModeBtn.style.display = "none";
});



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