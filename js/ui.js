/*
=========================================
 Percent Balloon v2
 ui.js
 Part1
 DOM・初期化
=========================================
*/

/*=========================================
    UI
=========================================*/

const UI = {

    question: document.getElementById("question"),

    answerInput: document.getElementById("answerInput"),

    submitButton: document.getElementById("submitButton"),

    differenceText: document.getElementById("differenceText"),

    scoreText: document.getElementById("scoreText"),

    fillBar: document.getElementById("fillBar"),

    markerLayer: document.getElementById("markerLayer"),

    currentMarker: null,

    answerMarker: null,

    correctMarker: null

};

/*=========================================
    Initialize
=========================================*/

function initializeUI() {

    createMarkers();

    createTicks();

    resetUI();

}

/*=========================================
    Create Markers
=========================================*/

function createMarkers() {

    if (!UI.markerLayer) return;

    UI.markerLayer.innerHTML = "";

    UI.currentMarker = document.createElement("div");

    UI.currentMarker.className = "currentMarker";

    UI.markerLayer.appendChild(UI.currentMarker);

    UI.answerMarker = document.createElement("div");

    UI.answerMarker.className = "answerMarker";

    UI.answerMarker.innerHTML =
        '<div class="triangle"></div>' +
        '<div class="value">0%</div>';

    UI.markerLayer.appendChild(UI.answerMarker);

    UI.correctMarker = document.createElement("div");

    UI.correctMarker.className = "correctMarker";

    UI.correctMarker.innerHTML =
        '<div class="triangle"></div>' +
        '<div class="value">0%</div>';

    UI.markerLayer.appendChild(UI.correctMarker);

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part2
 目盛り生成・問題表示
=========================================
*/

/*=========================================
    Create Ticks
=========================================*/

function createTicks() {

    const container = document.getElementById("tickContainer");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i <= 100; i++) {

        const tick = document.createElement("div");

        tick.className = "tick";

        if (i % 10 === 0) {

            tick.classList.add("major");

            const label = document.createElement("span");

            label.textContent = i;

            tick.appendChild(label);

        }

        container.appendChild(tick);

    }

}

/*=========================================
    Show Question
=========================================*/

function showQuestionUI(question) {

    if (!UI.question) return;

    UI.question.textContent = question.text;

}

/*=========================================
    Set Submit Button
=========================================*/

function setSubmitButtonState(enabled) {

    if (!UI.submitButton) return;

    UI.submitButton.disabled = !enabled;

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part3
 バー・マーカー表示
=========================================
*/

/*=========================================
    Clamp
=========================================*/

function clampPercent(value) {

    value = Number(value);

    if (isNaN(value)) {

        value = 0;

    }

    return Math.max(0, Math.min(100, value));

}

/*=========================================
    Fill Bar
=========================================*/

function setFillBar(value) {

    if (!UI.fillBar) return;

    value = clampPercent(value);

    UI.fillBar.style.width = value + "%";

}

/*=========================================
    Current Marker
=========================================*/

function showCurrentMarkerUI(value) {

    value = clampPercent(value);

    setFillBar(value);

    if (!UI.currentMarker) return;

    UI.currentMarker.style.left = value + "%";

}

/*=========================================
    Answer Marker
=========================================*/

function showAnswerMarkerUI(value) {

    value = clampPercent(value);

    if (!UI.answerMarker) return;

    UI.answerMarker.style.left = value + "%";

    const label = UI.answerMarker.querySelector(".value");

    if (label) {

        label.textContent = value + "%";

    }

}

/*=========================================
    Correct Marker
=========================================*/

function showCorrectMarkerUI(value) {

    value = clampPercent(value);

    if (!UI.correctMarker) return;

    UI.correctMarker.style.left = value + "%";

    const label = UI.correctMarker.querySelector(".value");

    if (label) {

        label.textContent = value + "%";

    }

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part4
 リセット・結果表示
=========================================
*/

/*=========================================
    Reset UI
=========================================*/

function resetUI() {

    if (UI.answerInput) {

        UI.answerInput.value = "";

    }

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

    setFillBar(0);

    showCurrentMarkerUI(0);

    if (UI.answerMarker) {

        UI.answerMarker.style.left = "0%";

        const value = UI.answerMarker.querySelector(".value");

        if (value) {

            value.textContent = "0%";

        }

    }

    if (UI.correctMarker) {

        UI.correctMarker.style.left = "0%";

        const value = UI.correctMarker.querySelector(".value");

        if (value) {

            value.textContent = "0%";

        }

    }

}

/*=========================================
    Show Difference
=========================================*/

function showDifferenceUI(diff) {

    if (!UI.differenceText) return;

    UI.differenceText.textContent = "差：" + diff + "%";

}

/*=========================================
    Show Score
=========================================*/

function showScoreUI(score) {

    if (!UI.scoreText) return;

    UI.scoreText.textContent = "スコア：" + score;

}

/*=========================================
    Show Correct Answer
=========================================*/

function revealCorrectAnswer(value) {

    showCorrectMarkerUI(value);

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part5
 待機・ゲーム終了
=========================================
*/

/*=========================================
    Waiting
=========================================*/

function showWaitingUI() {

    if (!UI.question) return;

    UI.question.textContent = "ゲーム開始を待っています...";

    setSubmitButtonState(false);

}

/*=========================================
    Game Over
=========================================*/

function showGameOverUI(result) {

    if (UI.question) {

        UI.question.textContent = "ゲーム終了";

    }

    if (UI.differenceText) {

        UI.differenceText.textContent =
            "平均：" +
            result.average +
            "%";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent =
            "スコア：" +
            result.score +
            "　ランク：" +
            result.rank;

    }

    setSubmitButtonState(false);

}

/*=========================================
    Hide Correct Marker
=========================================*/

function hideCorrectMarker() {

    if (!UI.correctMarker) return;

    UI.correctMarker.style.display = "none";

}

/*=========================================
    Show Correct Marker
=========================================*/

function showCorrectMarker() {

    if (!UI.correctMarker) return;

    UI.correctMarker.style.display = "flex";

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part6
 エフェクト・表示切替
=========================================
*/

/*=========================================
    Tension Mode
=========================================*/

function setTensionMode(enable) {

    if (!UI.fillBar) {

        return;

    }

    if (enable) {

        UI.fillBar.classList.add("tension");

    } else {

        UI.fillBar.classList.remove("tension");

    }

}

/*=========================================
    Flash
=========================================*/

function flashUI(element) {

    if (!element) {

        return;

    }

    element.classList.remove("flash");

    void element.offsetWidth;

    element.classList.add("flash");

}

/*=========================================
    Pop Marker
=========================================*/

function popCurrentMarker() {

    if (!UI.currentMarker) {

        return;

    }

    UI.currentMarker.classList.remove("pop");

    void UI.currentMarker.offsetWidth;

    UI.currentMarker.classList.add("pop");

}

/*=========================================
    Reset Marker Effect
=========================================*/

function resetMarkerEffects() {

    if (!UI.currentMarker) {

        return;

    }

    UI.currentMarker.classList.remove("pop");

    UI.currentMarker.classList.remove("flash");

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part7
 補助関数
=========================================
*/

/*=========================================
    Enable Submit
=========================================*/

function enableSubmit() {

    setSubmitButtonState(true);

}

/*=========================================
    Disable Submit
=========================================*/

function disableSubmit() {

    setSubmitButtonState(false);

}

/*=========================================
    Clear Result
=========================================*/

function clearResultUI() {

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

}

/*=========================================
    Reset Question Screen
=========================================*/

function resetQuestionUI() {

    resetUI();

    clearResultUI();

    hideCorrectMarker();

    showCurrentMarkerUI(0);

    showAnswerMarkerUI(0);

    showCorrectMarkerUI(0);

    resetMarkerEffects();

}

/*=========================================
    Refresh
=========================================*/

function refreshUI() {

    initializeUI();

}