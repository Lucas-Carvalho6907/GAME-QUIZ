const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        answers: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
        correct: "Brasília"
    },
    {
        question: "Qual linguagem é usada para estilizar páginas web?",
        answers: ["HTML", "JavaScript", "CSS", "Python"],
        correct: "CSS"
    },
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: ["Marte", "Júpiter", "Saturno", "Vênus"],
        correct: "Marte"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const correctSound = document.getElementById("correctSound");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    answersEl.innerHTML = "";
    current.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(answer);
        answersEl.appendChild(btn);
    });
}

function selectAnswer(answer) {
    const correctAnswer = quizData[currentQuestion].correct;
    if(answer === correctAnswer){
        score++;
        correctSound.play();
    }
    Array.from(answersEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
    currentQuestion++;
    if(currentQuestion < quizData.length){
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    resultEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

loadQuestion();
