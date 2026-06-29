// ================================
// ELEMENTOS
// ================================

const result = document.getElementById("result");
const expression = document.getElementById("expression");

const buttons = document.querySelectorAll(".btn");
const equalBtn = document.querySelector(".equal");

const historyPanel = document.getElementById("historyPanel");
const openHistoryBtn = document.getElementById("openHistory");
const closeHistoryBtn = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");

const themeBtn = document.getElementById("themeBtn");

const clearHistoryBtn = document.getElementById("clearHistory");

const confirmModal = document.getElementById("confirmModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

// ================================
// VARIÁVEIS
// ================================

let currentInput = "";

let history =
    JSON.parse(
        localStorage.getItem("calculatorHistory")
    ) || [];

// ================================
// INICIALIZAÇÃO
// ================================

renderHistory();
updateDisplay();

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
}

// ================================
// EVENTOS
// ================================

// Histórico

openHistoryBtn.addEventListener("click", openHistory);

closeHistoryBtn.addEventListener("click", closeHistory);

// Tema

themeBtn.addEventListener("click", toggleTheme);

// Modal

clearHistoryBtn.addEventListener(
    "click",
    showConfirmModal
);

cancelDeleteBtn.addEventListener(
    "click",
    hideConfirmModal
);

confirmDeleteBtn.addEventListener(
    "click",
    clearHistory
);

confirmModal.addEventListener("click", (e) => {

    if (e.target === confirmModal) {

        hideConfirmModal();

    }

});

// Botões

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if (button.classList.contains("clear")) {

            clearDisplay();
            return;

        }

        if (button.classList.contains("delete")) {

            deleteLast();
            return;

        }

        appendValue(value);

    });

});

equalBtn.addEventListener("click", calculate);

// Teclado

document.addEventListener("keydown", handleKeyboard);

// ================================
// FUNÇÕES DE INTERFACE
// ================================

function openHistory() {

    historyPanel.classList.add("active");

}

function closeHistory() {

    historyPanel.classList.remove("active");

}

function showConfirmModal() {

    confirmModal.classList.add("show");

}

function hideConfirmModal() {

    confirmModal.classList.remove("show");

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

}

// ================================
// CALCULADORA
// ================================

function clearDisplay() {

    currentInput = "";

    updateDisplay();

}

function deleteLast() {

    currentInput =
        currentInput.slice(0, -1);

    updateDisplay();

}

function currentNumber() {

    const parts =
        currentInput.split(/[+\-*/%]/);

    return parts[parts.length - 1];

}

function appendValue(value) {

    const operators = [
        "+",
        "-",
        "*",
        "/",
        "%"
    ];

    const last =
        currentInput.slice(-1);

    // Impede dois pontos

    if (value === ".") {

        if (
            currentNumber().includes(".")
        ) {

            return;

        }

    }

    // Troca operador anterior

    if (
        operators.includes(value) &&
        operators.includes(last)
    ) {

        currentInput =
            currentInput.slice(0, -1) +
            value;

        updateDisplay();

        return;

    }

    currentInput += value;

    updateDisplay();

}

function calculate() {

    if (currentInput === "") return;

    const last = currentInput.slice(-1);

    if (["+", "-", "*", "/", "%", "."].includes(last)) {
        result.value = "Expressão inválida";

        setTimeout(() => updateDisplay(), 1200);
        return;
    }

    try {

        const expressionText = currentInput;

        console.log("Expressão:", currentInput);

        let expressionToCalc = currentInput;

        // transforma porcentagem
        expressionToCalc = expressionToCalc.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)*"
        );

        const answer = eval(expressionToCalc);

        currentInput = answer.toString();

        result.value = currentInput;

        expression.textContent = expressionText + " =";

        addHistory(expressionText, answer);

    } catch (err) {

        console.log(err);

        result.value = "Erro";

        setTimeout(() => {
            clearDisplay();
        }, 1200);
    }
}

function updateDisplay() {

    result.value =
        currentInput || "0";

    expression.textContent =
        currentInput;

}

// ================================
// HISTÓRICO
// ================================

function addHistory(exp, answer) {

    const now = new Date();

    const time =
        now.toLocaleDateString("pt-BR") +
        " • " +
        now.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    history.unshift({

        expression: exp,
        result: answer,
        time

    });

    if (history.length > 30) {

        history.pop();

    }

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

    renderHistory();

}

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "calculatorHistory"
    );

    renderHistory();

    hideConfirmModal();

}

function renderHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML = `
            <p class="empty-history">
                Nenhuma conta realizada.
            </p>
        `;

        return;

    }

    history.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "history-item";

        div.innerHTML = `
            <p>
                ${item.expression}
                =
                <strong>${item.result}</strong>
            </p>

            <span>
                ${item.time}
            </span>
        `;

        div.addEventListener(
            "click",
            () => {

                currentInput =
                    item.expression;

                updateDisplay();

                closeHistory();

            }
        );

        historyList.appendChild(div);

    });

}

// ================================
// TECLADO
// ================================

function handleKeyboard(e) {

    const key = e.key;

    if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "%"]
        .includes(key)
    ) {

        appendValue(key);

    }

    if (key === "Backspace") {

        deleteLast();

    }

    if (key === "Delete") {

        clearDisplay();

    }

    if (
        key === "Enter" ||
        key === "="
    ) {

        e.preventDefault();

        calculate();

    }

}

// ================================
// FIM
// ================================
