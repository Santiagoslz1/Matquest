const startButton = document.getElementById('startButton');
const gameScreen = document.getElementById('gameScreen');
const startScreen = document.getElementById('startScreen');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitButton = document.getElementById('submitAnswer');
const timerBar = document.getElementById('timerBar');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

let score = 0;
let timer;
let difficulty = 1;
let correctAnswers = 0;

function startGame() {
    score = 0;
    difficulty = 1;
    correctAnswers = 0;
    scoreElement.textContent = score;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    generateQuestion();
    startTimer();
}

function startTimer() {
    timerBar.style.animation = 'timer linear 10s';
    timer = setTimeout(() => gameOver(), 10000);
}

function resetTimer() {
    clearTimeout(timer);
    timerBar.style.animation = 'none';
    void timerBar.offsetWidth;
    startTimer();
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * (10 * difficulty)) + 1;
    const num2 = Math.floor(Math.random() * (10 * difficulty)) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    const questionText = `${num1} ${operator} ${num2}`;
    const answer = eval(questionText);

    questionElement.textContent = questionText;
    questionElement.dataset.answer = answer;
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    const correctAnswer = parseInt(questionElement.dataset.answer);

    if (userAnswer === correctAnswer) {
        score += 10;
        correctAnswers += 1;
        if (correctAnswers % 5 === 0) {
            difficulty += 2;
        }
        scoreElement.textContent = score;
        resetTimer();
        generateQuestion();
    } else {
        alert('¡Uy! Intenta de nuevo. ¡Tú puedes!');
    }
    answerInput.value = '';
}

function gameOver() {
    clearTimeout(timer);
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreElement.textContent = score;
}

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    startGame();
});