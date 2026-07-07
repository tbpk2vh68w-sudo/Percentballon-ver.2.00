/*
=========================================
 Percent Balloon v2
 play.js
 Part1
 初期化・ルーム接続
=========================================
*/

/*=========================================
    Initialize
=========================================*/

function initPlay() {

    const roomId = prompt("ルームIDを入力してください");

    if (!roomId) {

        location.href = "index.html";

        return;

    }

    if (!loadRoom(roomId)) {

        alert("ルームが見つかりません。");

        location.href = "index.html";

        return;

    }

    initializeGame();

    loadGame();

}

/*=========================================
    Current Question
=========================================*/

function getPlayQuestion() {

    return getCurrentQuestion();

}

/*
=========================================
 Percent Balloon v2
 play.js
 Part2
 問題表示・回答受付
=========================================
*/

/*=========================================
    Show Question
=========================================*/

function showCurrentQuestion() {

    const question = getPlayQuestion();

    if (!question) {

        return;

    }

    showQuestionUI(question);

    setSubmitButtonState(true);

}

/*=========================================
    Submit Answer
=========================================*/

function submitAnswer() {

    const input = document.getElementById("answerInput");

    const value = Number(input.value);

    if (!setUserAnswer(value)) {

        alert("0〜100の数字を入力してください。");

        return;

    }

    loadCorrectAnswer();

    setCorrectAnswer(getCorrectAnswer());

    startAnimation(getCorrectAnswer());

}

/*=========================================
    Reset Input
=========================================*/

function resetAnswerInput() {

    const input = document.getElementById("answerInput");

    if (input) {

        input.value = "";

    }

}

/*
=========================================
 Percent Balloon v2
 play.js
 Part3
 アニメーション終了・結果表示・次の問題
=========================================
*/

/*=========================================
    Animation Complete
=========================================*/

function onAnimationComplete() {

    calculateDifference();

    addScore();

    showDifferenceUI(

        getDifference()

    );

    showScoreUI(

        getScore()

    );

    setTimeout(() => {

        nextPlayQuestion();

    }, CONFIG.GAME.AUTO_NEXT_TIME);

}

/*=========================================
    Next Question
=========================================*/

function nextPlayQuestion() {

    if (!nextRound()) {

        finishPlayGame();

        return;

    }

    resetAnswerInput();

    showCurrentQuestion();

}

/*=========================================
    Finish Game
=========================================*/

function finishPlayGame() {

    endGame();

    showGameOverUI(

        getGameResult()

    );

}

/*
=========================================
 Percent Balloon v2
 play.js
 Part4
 イベント・初期化
=========================================
*/

/*=========================================
    Bind Events
=========================================*/

function bindPlayEvents() {

    const submitButton = document.getElementById(

        "submitButton"

    );

    const homeButton = document.getElementById(

        "homeButton"

    );

    if (submitButton) {

        submitButton.onclick = submitAnswer;

    }

    if (homeButton) {

        homeButton.onclick = function () {

            location.href = "index.html";

        };

    }

}

/*=========================================
    Refresh UI
=========================================*/

function refreshPlayUI() {

    showCurrentQuestion();

    resetAnswerInput();

}

/*=========================================
    Initialize App
=========================================*/

function initializePlayApp() {

    initPlay();

    bindPlayEvents();

    refreshPlayUI();

}

/*=========================================
    Auto Start
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        initializePlayApp();

    }

);