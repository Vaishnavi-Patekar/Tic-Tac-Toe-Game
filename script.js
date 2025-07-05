// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newGameBtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");

// let turnO = true; //playerX , playerO
// let count = 0; //To track Draw

// let currentPlayer = 'X';

// // Function to handle a player's move
// const handleMove = (event) => {
//     const button = event.target;

//     // Check if the box is already filled
//     if (button.textContent !== '') return;

//     // Set the value for the current player
//     button.textContent = currentPlayer;
//     button.dataset.value = currentPlayer;

//     // Change the color dynamically
//     if (currentPlayer === 'X') {
//         button.style.color = '#d32f2f'; // Red for X
//     } else {
//         button.style.color = '#1976d2'; // Blue for O
//     }

//     // Toggle the player
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
// };

// // Add event listeners to all boxes
// boxes.forEach((box) => {
//     box.addEventListener('click', handleMove);
// });

// // Reset game function
// const resetButton = document.getElementById('reset-btn');
// resetButton.addEventListener('click', () => {
//     boxes.forEach((box) => {
//         box.textContent = ''; // Clear the text
//         box.dataset.value = ''; // Clear the dataset
//         box.style.color = ''; // Reset color
//     });
//     currentPlayer = 'X'; // Reset to player X
// });



// const winPatterns = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8]
// ];

// const resetGame = ()=>{
//     turnO = true;
//     count = 0;
//     enableBoxes();
//     msgContainer.classList.add("hide");
// };

// boxes.forEach((box)=>{
//     box.addEventListener("click",()=>{
//         //box.innerText = "vina";
//         if(turnO){
//             box.innerText = "O";
//             turnO = false;

//         }else {
//             box.innerText = "X";
//             turnO = true;
//         }
//         box.disabled = true;
//         count++;

//         let isWinner = checkWinner();

//         if (count === 9 && !isWinner){
//             gameDraw();
//         }



//     });
// });


// const gameDraw = ()=>{ 
//     msg.innerText = `Game was a Draw`;
//     msgContainer.classList.remove("hide");
//     disableBoxes();
// };

// const disableBoxes = ()=>{
//     for(let box of boxes){
//         box.disabled=true;
//     }
// }

// const enableBoxes = ()=>{
//     for(let box of boxes){
//         box.disabled = false;
//         box.innerText = ""; 
//     }
// }
// const showWinner = (winner)=>{ 
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     disableBoxes();
// };


// const checkWinner = ()=>{
//     for (let pattern of winPatterns){
//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;

//         if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
//             if (pos1Val === pos2Val && pos2Val === pos3Val){
            
//                 showWinner(pos1Val);
//                 return true;
//             }
//         }
//     }
// };


// newGameBtn.addEventListener("click",resetGame);
// resetBtn.addEventListener("click",resetGame);

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
