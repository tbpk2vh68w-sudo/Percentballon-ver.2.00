/*
=========================================
 Percent Balloon v2
 host.js
 Part1
 初期化・ルーム生成
=========================================
*/

/*=========================================
    DOM
=========================================*/

const HostUI = {

    roomId: document.getElementById("roomId"),

    questionInput: document.getElementById("questionInput"),

    answerInput: document.getElementById("answerInput"),

    questionList: document.getElementById("questionList"),

    addButton: document.getElementById("addQuestionButton"),

    saveButton: document.getElementById("saveButton"),

    startButton: document.getElementById("startButton"),

    homeButton: document.getElementById("homeButton")

};

/*=========================================
    Initialize
=========================================*/

function initHost() {

    createRoom();

    initializeGame();

    HostUI.roomId.textContent = getRoomId();

}

/*
=========================================
 Percent Balloon v2
 host.js
 Part2
 問題追加・削除・一覧表示
=========================================
*/

/*=========================================
    Render Question List
=========================================*/

function renderQuestionList() {

    HostUI.questionList.innerHTML = "";

    const questions = getQuestions();

    questions.forEach((q, index) => {

        const row = document.createElement("div");

        row.className = "hostQuestion";

        row.textContent =
            (index + 1) +
            ". " +
            q.text +
            " (" +
            q.answer +
            "%)";

        const del = document.createElement("button");

        del.textContent = "削除";

        del.onclick = function () {

            deleteQuestion(index);

            renderQuestionList();

        };

        row.appendChild(del);

        HostUI.questionList.appendChild(row);

    });

}

/*=========================================
    Add Question
=========================================*/

function addQuestionFromUI() {

    const text = HostUI.questionInput.value;

    const answer = Number(

        HostUI.answerInput.value

    );

    if (!validateQuestion(text, answer)) {

        alert("問題文と0〜100の答えを入力してください。");

        return;

    }

    if (!addQuestion(text, answer)) {

        alert("問題を追加できません。");

        return;

    }

    HostUI.questionInput.value = "";

    HostUI.answerInput.value = "";

    renderQuestionList();

}

/*
=========================================
 Percent Balloon v2
 host.js
 Part3
 ボタン・ゲーム開始・イベント
=========================================
*/

/*=========================================
    Save
=========================================*/

function saveRoomFromUI() {

    saveRoom();

    alert("保存しました。");

}

/*=========================================
    Start Game
=========================================*/

function startGameFromUI() {

    if (!hasQuestions()) {

        alert("問題を1問以上追加してください。");

        return;

    }

    startGame();

    localStorage.setItem(

        "currentRoomId",

        getRoomId()

    );

    location.href = "play.html";

}

/*=========================================
    Home
=========================================*/

function backToHome() {

    location.href = "index.html";

}

/*=========================================
    Bind Events
=========================================*/

function bindEvents() {

    HostUI.addButton.onclick = addQuestionFromUI;

    HostUI.saveButton.onclick = saveRoomFromUI;

    HostUI.startButton.onclick = startGameFromUI;

    HostUI.homeButton.onclick = backToHome;

}

/*
=========================================
 Percent Balloon v2
 host.js
 Part4
 初期化
=========================================
*/

/*=========================================
    Refresh UI
=========================================*/

function refreshHostUI() {

    HostUI.roomId.textContent = getRoomId();

    renderQuestionList();

}

/*=========================================
    Initialize Host
=========================================*/

function initializeHostApp() {

    initHost();

    bindEvents();

    refreshHostUI();

}

/*=========================================
    Auto Start
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        initializeHostApp();

    }

);