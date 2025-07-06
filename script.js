let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for O's turn, false for X
let count = 0; // track moves to detect draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const handleClick = (box) => {
    if (box.innerText !== "") return;

    if (turnO) {
        box.innerText = "O";
        box.style.color = "#1976d2"; // Blue
    } else {
        box.innerText = "X";
        box.style.color = "#d32f2f"; // Red
    }

    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (!isWinner && count === 9) {
        gameDraw();
    }

    turnO = !turnO;
};




boxes.forEach((box) => {
    box.addEventListener("click", () => handleClick(box));
});

const showWinner = (winner, winBoxes) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    // Add animation to winning boxes
    winBoxes.forEach((index) => {
        boxes[index].classList.add("winner");
    });

    // Confetti 🎊
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
    });
if (winner === "X") {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
} else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
}

    
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1, pattern);
            return true;
        }
    }
    return false;
};

const gameDraw = () => {
    msg.innerText = `😐 Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
        box.classList.remove("winner"); // Remove animation if applied
    });
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "🌙 Light Mode" : "🌞 Dark Mode";
});
let scoreX = 0;
let scoreO = 0;

const scoreXDisplay = document.getElementById("score-x");
const scoreODisplay = document.getElementById("score-o");
