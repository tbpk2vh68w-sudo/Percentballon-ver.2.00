/*
=========================================
 Percent Balloon v2
 ui.js
 Part1
 DOM取得・初期化
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

    fillBar: document.getElementById("fillBar")

};

/*=========================================
    Initialize
=========================================*/

function initializeUI() {

    if (UI.answerInput) {

        UI.answerInput.value = "";

    }

    if (UI.differenceText) {

        UI.differenceText.textContent = "";

    }

    if (UI.scoreText) {

        UI.scoreText.textContent = "";

    }

    if (UI.fillBar) {

        UI.fillBar.style.width = "0%";

    }

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part2
 問題・結果表示
=========================================
*/

/*=========================================
    Show Question
=========================================*/

function showQuestionUI(question) {

    if (!UI.question) {

        return;

    }

    UI.question.textContent = question.text;

}

/*=========================================
    Show Difference
=========================================*/

function showDifferenceUI(diff) {

    if (!UI.differenceText) {

        return;

    }

    UI.differenceText.textContent =
        "差：" + diff + "%";

}

/*=========================================
    Show Score
=========================================*/

function showScoreUI(score) {

    if (!UI.scoreText) {

        return;

    }

    UI.scoreText.textContent =
        "スコア：" + score;

}

/*=========================================
    Set Submit Button
=========================================*/

function setSubmitButtonState(enabled) {

    if (!UI.submitButton) {

        return;

    }

    UI.submitButton.disabled = !enabled;

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part3
 ゲージ・マーカー表示
=========================================
*/

/*=========================================
    Fill Bar
=========================================*/

function setFillBar(value) {

    if (!UI.fillBar) {

        return;

    }

    value = Math.max(

        0,

        Math.min(100, value)

    );

    UI.fillBar.style.width = value + "%";

}

/*=========================================
    Current Marker
=========================================*/

function showCurrentMarkerUI(value) {

    setFillBar(value);

}

/*=========================================
    Answer Marker
=========================================*/

function showAnswerMarkerUI(value) {

    // 今回はゲージのみ更新

}

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

    setFillBar(0);

}

/*
=========================================
 Percent Balloon v2
 ui.js
 Part4
 待機・ゲーム終了・エフェクト
=========================================
*/

/*=========================================
    Waiting
=========================================*/

function showWaitingUI() {

    if (UI.question) {

        UI.question.textContent = "ゲーム開始を待っています...";

    }

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
            "平均誤差：" +
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

    if (UI.submitButton) {

        UI.submitButton.disabled = true;

    }

}

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

