let questionsArr = [
    {
        question: "1. Is Vim the best editor?",
        answers: "true"
    },
    {
        question: "2. Is Nano the best editor?",
        answers: "false"
    },
    {
        question: "3. Is Brandon the best teacher?",
        answers: "true"
    },
    {
        question: "4. Is Nackademin the best school on earth?",
        answers: "true"
    },
    {
        question: "5. Is the earth flat?",
        answers: "false"
    },
    {
        question: "6. 10x10 = 1000?",
        answers: "false"
    },
    {
        question: "7. 5x5 = 25?",
        answers: "true"
    },
    {
        question: "8. Fish cannot blink?",
        answers: "true"
    },
    {
        question: "9. An octopus has three hearts?",
        answers: "true"
    },
    {
        question: "10. Is this the last question?",
        answers: "true"
    },

];


let questionNumber = 0;
let getResultBtn = document.querySelector("#submitAnswers");
let questionDiv = document.querySelector("#questions-div")
let questionLi = document.createElement("div");
questionLi.innerText = questionsArr[questionNumber].question;
questionDiv.append(questionLi);

let points = 0;
getResultBtn.addEventListener("click", () => {
    let userAnswer = document.querySelector("[name='userAnswer']:checked").value;
    //console.log(userAnswer);
    //console.log(questionNumber);
    //console.log(questionsArr[questionNumber].answers)


    if (userAnswer == questionsArr[questionNumber].answers) {
        points++;

    }

    if (questionNumber < questionsArr.length - 1) {
        questionNumber++;
        questionLi.innerText = questionsArr[questionNumber].question; //get next question
        questionDiv.append(questionLi)
    } else if (questionNumber === questionsArr.length - 1) {
        console.log("Finish! Your score is " + points);
        //questionDiv.style.display = "none";
        document.querySelector("#container").style.display = "none";
        let resultBtn = document.createElement("button");
        resultBtn.innerText = "Show score";
        document.querySelector("#website-info").append(resultBtn);


        resultBtn.addEventListener("click", () => {
            result = document.createElement("h2");
            result.innerText = "Finish! Your score is " + points;
            document.querySelector("#website-info").append(result);
            resultBtn.style.display = "none";
        })

    }


    //remove a check from radio button
    let uncheck = document.querySelector("[name='userAnswer']:checked");
    uncheck.checked = false;

})

//});

