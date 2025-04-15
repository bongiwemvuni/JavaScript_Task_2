var errors = 0;
var cardList = [
    "A", "B", "C", "D",
    "E", "F", "G", "H"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 4;

var card1Selected;
var card2Selected;

window.onload = function () {
    shuffleCards();
    startGame();
};

function shuffleCards() {
    cardSet = cardList.concat(cardList); // two of each card
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardValue = cardSet.pop();
            row.push(cardValue);

            let card = document.createElement("img");
            card.id = `${r}-${c}`;
            card.dataset.value = cardValue;
            card.classList.add("card");
            card.style.backgroundColor = "##1d0404"; 
            card.src = " "; 
            card.addEventListener("click", selectCard);
            boardContainer.appendChild(card);
        }
        board.push(row);
    }
}

function selectCard() {
    if (!this.src || this.src === window.location.href) {
        const [r, c] = this.id.split("-").map(Number);
        const cardValue = board[r][c];

        this.src = cardValue + ".jpg"; 
        this.style.backgroundColor = "transparent";

        if (!card1Selected) {
            card1Selected = this;
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (card1Selected.dataset.value !== card2Selected.dataset.value) {
       
        card1Selected.src = "";
        card2Selected.src = "";
        card1Selected.style.backgroundColor = "#aaa";
        card2Selected.style.backgroundColor = "#aaa";

        errors++;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}
