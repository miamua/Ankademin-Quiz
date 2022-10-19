let questionsArr = [
    {
        question: "1. Is Vim the best editor?",
        answers: ["true", "false"],
        correct: ["true"],
        type: "radio"
    },
    {
        question: "2. Is Nano the best editor?",
        answers: ["Yes", "No", "Never", "Sometimes"],
        correct: ["Yes", "Sometimes"],
        type: "checkbox"
    },
    {
        question: "3. Is Brandon the best teacher?",
        answers: ["true", "false", "maybe", "never"],
        correct: ["true"],
        type: "radio"
    },
    {
        question: "4. Is Nackademin the best school on earth?",
        answers: ["true", "true", "true", "false"],
        correct: ["true", "true", "true"],
        type: "checkbox"
    },
    {
        question: "5. Is the earth flat?",
        answers: ["true", "true", "true", "false"],
        correct: ["true", "true", "true"],
        type: "checkbox"
    },
    {
        question: "6. 10x10 = 1000?",
        answers: ["true", "false"],
        correct: ["false"],
        type: "radio"
    },
    {
        question: "7. 5x5 = 25?",
        answers: ["true", "false"],
        correct: ["true"],
        type: "radio"
    },
    {
        question: "8. Fish cannot blink?",
        answers: ["true", "false"],
        correct: ["true"],
        type: "radio"
    },
    {
        question: "9. An octopus has three hearts?",
        answers: ["true", "false"],
        correct: ["true"],
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
answerSubmit.textContent = "Submit"
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

    let testToPutAll = { "question": questionsArr[questionNumber].question, "playerAns": answeredQuestions, "Result": RightOrWrong };
    endResults.push(testToPutAll);

    if (!answered) {
        alert("Please select an answear")
    } else if (questionNumber < questionsArr.length - 1) {

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
        document.querySelector("#questionbox").style.display = "none";
        let resultBtn = document.createElement("button");
        resultBtn.innerText = "Show score";
        document.querySelector("#resultBox").append(resultBtn);


        resultBtn.addEventListener("click", () => {
            console.log("Finished! Your score is " + points);
            result = document.createElement("h2");
            result.innerText = "Finished! Your score is " + points;
            document.querySelector("#resultBox").append(result);
            resultBtn.style.display = "none";
            gradeText = document.createElement("h3");



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
            document.querySelector("#resultBox").append(gradeText);
            getAllquestion()
            console.log(endResults)
        })

    }


})

function getAllquestion() {
    let scoreTable = document.createElement("table");
    scoreTable.style.width = "100%";
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
        let userAnswerItem = document.createElement("td");
        let ResultItem = document.createElement("td");
        questionsItem.innerText = question.question;
        userAnswerItem.innerText = question.playerAns;
        ResultItem.innerText = question.Result;
        document.querySelector("table").append(questionsRow);

        questionsRow.append(questionsItem);
        questionsRow.append(userAnswerItem);
        questionsRow.append(ResultItem);
    })
};


let darkModeBtn = document.querySelector("#darkMode");
let darkMode = document.querySelector("body");
let lightMode = document.querySelector("body");
let lightModeBtn = document.createElement("button");



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