let currentQuestionIndex = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function loadQuestion() {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');

    const currentQuestion = quizData.quiz[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Load options dynamically
    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.classList.add('option-btn');
        optionButton.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = quizData.quiz[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score += 10; // Award points for correct answer
        document.getElementById('score').innerText = score;
    }

    // Load next question or end quiz
    if (currentQuestionIndex < quizData.quiz.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';

    // Add score to leaderboard and store it in localStorage
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a); // Sort leaderboard in descending order

    // Store leaderboard in localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Display leaderboard
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; // Clear previous leaderboard entries

    leaderboard.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerText = `Player ${index + 1}: ${score} points`;
        leaderboardContainer.appendChild(li);
    });
}

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < quizData.quiz.length) {
        loadQuestion();
    }
});

// Initialize the quiz
loadQuestion();
displayLeaderboard(); // Display the leaderboard on page load
