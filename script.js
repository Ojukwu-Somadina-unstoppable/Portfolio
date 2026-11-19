// ==========================================
// OS CALCULATOR
// ==========================================

const firstNumberInput = document.getElementById("first-number");
const operationSelect = document.getElementById("operation");
const secondNumberInput = document.getElementById("second-number");
const calculateButton = document.getElementById("calculate-button");
const calculatorResult = document.getElementById("calculator-result");

if (calculateButton) {
    calculateButton.addEventListener("click", function () {
        const num1 = parseFloat(firstNumberInput.value);
        const num2 = parseFloat(secondNumberInput.value);
        const operation = operationSelect.value;

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            calculatorResult.textContent = "Please enter both numbers.";
            return;
        }

        let answer;

        if (operation === "+") {
            answer = num1 + num2;
        } else if (operation === "-") {
            answer = num1 - num2;
        } else if (operation === "*") {
            answer = num1 * num2;
        } else if (operation === "/") {
            if (num2 === 0) {
                calculatorResult.textContent = "Cannot divide by zero.";
                return;
            }
            answer = num1 / num2;
        }

        calculatorResult.textContent = "Result: " + answer;
    });
}


// ==========================================
// PROGRAMMING QUIZ
// ==========================================

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "High-Tech Modern Language",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "Python",
            "CSS",
            "Java",
            "SQL"
        ],
        correct: 1
    },
    {
        question: "Which method attaches a click handler to an element in JavaScript?",
        options: [
            "getElementById()",
            "addEventListener()",
            "parseFloat()",
            "querySelectorAll()"
        ],
        correct: 1
    },
    {
        question: "Which keyword defines a function in Python?",
        options: [
            "function",
            "func",
            "def",
            "fn"
        ],
        correct: 2
    }
];

const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const quizScoreEl = document.getElementById("quiz-score");
const nextQuestionBtn = document.getElementById("next-question");

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

function renderQuestion() {
    hasAnswered = false;
    quizFeedbackEl.textContent = "";
    quizOptionsEl.innerHTML = "";
    nextQuestionBtn.hidden = true;

    const item = quizQuestions[currentQuestion];
    quizQuestionEl.textContent = item.question;
    quizScoreEl.textContent = "Score: " + score + " / " + quizQuestions.length;

    item.options.forEach(function (optionText, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.textContent = optionText;

        button.addEventListener("click", function () {
            if (hasAnswered) {
                return;
            }
            hasAnswered = true;

            const allOptionButtons = quizOptionsEl.querySelectorAll(".quiz-option");
            allOptionButtons.forEach(function (btn) {
                btn.disabled = true;
            });

            if (index === item.correct) {
                score++;
                button.style.borderColor = "#4ade80";
                quizFeedbackEl.textContent = "Correct!";
            } else {
                button.style.borderColor = "#f87171";
                allOptionButtons[item.correct].style.borderColor = "#4ade80";
                quizFeedbackEl.textContent = "Not quite — the correct answer is: " + item.options[item.correct];
            }

            quizScoreEl.textContent = "Score: " + score + " / " + quizQuestions.length;
            nextQuestionBtn.textContent =
                currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Final Score";
            nextQuestionBtn.hidden = false;
        });

        quizOptionsEl.appendChild(button);
    });
}

if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", function () {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            renderQuestion();
        } else {
            quizQuestionEl.textContent = "Quiz Complete!";
            quizOptionsEl.innerHTML = "";
            quizFeedbackEl.textContent = "Final Score: " + score + " out of " + quizQuestions.length;
            quizScoreEl.textContent = "";
            nextQuestionBtn.textContent = "Restart Quiz";
            currentQuestion = -1;
            score = 0;
            nextQuestionBtn.hidden = false;
        }
    });
}

if (quizQuestionEl && quizOptionsEl) {
    renderQuestion();
}