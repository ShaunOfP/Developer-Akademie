let questions = [
    {
        "question": "Was ist das maximale Level was ein Warframe erreichen kann?",
        "answer_1": "7",
        "answer_2": "80",
        "answer_3": "30",
        "answer_4": "50",
        "right_answer": 3
    },
    {
        "question": "Kann Platin nur mit echtem Geld erworben werden?",
        "answer_1": "Ja",
        "answer_2": "Nein, auch durch Handel",
        "answer_3": "Nein, auch durch Missionen",
        "answer_4": "Nein, Platin wird in Ausgrabungs-Missionen gewonnen",
        "right_answer": 2
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('sounds/success.mp3');
let AUDIO_FAIL = new Audio('sounds/wrong.mp3');


function init() {
    document.getElementById('max-questions').innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver(){
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('endScreen').style = ``;
    document.getElementById('questionBody').style = `display: none;`;
    document.getElementById('fin-max-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/trophy.png';
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('current-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${questions[currentQuestion]['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber){
    return selectedQuestionNumber == questions[currentQuestion]['right_answer']
}


function nextQuestion() {
    currentQuestion++;
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success', 'bg-danger');
    }
    document.getElementById('next-button').disabled = true;

    showQuestion();
}


function restartGame() {
    document.getElementById('header-image').src = './img/numbers.jpg';
    document.getElementById('questionBody').style = ``;
    document.getElementById('endScreen').style = `display: none;`;

    rightQuestions = 0;
    currentQuestion = 0;

    init();
}


