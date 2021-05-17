//1. Adding x and circle classes
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

//8. These are the combinations in which we can win
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

//1. Getting all the data attributes and classes
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restart")
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
)
let circleTurn

//12. Starting our game as soon as the page loads
startGame()

//13. Adding an event listener to our restart button to start the game again from scratch
restartButton.addEventListener("click", startGame)

//11. Creating our startGame function
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener("click", userClick)
    cell.addEventListener("click", userClick, { once: true })
  })
  hoverTurns()
  winningMessageElement.classList.remove("show")
}

//3. Check whether the user clicks and also handling that whose turn it is
function userClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    hoverTurns()
  }
}

//10. Check whether someone wins. If no one then draw match and restart
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML =
      "<p style='color: #f45c43'>Tie!</p>"
  } else {
    winningMessageTextElement.innerHTML = `${
      circleTurn
        ? "<p style='color: #8e54e9'>O </p>"
        : "<p style='color: #ff8008'>X </p>"
    } Wins!`
  }
  winningMessageElement.classList.add("show")
}

//6. Checking where the user actually clicks
function isDraw() {
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    )
  })
}

//4. If the user clicks the cell then add our X or O
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//5. Swaping turns so that one cannot play again and again
function swapTurns() {
  circleTurn = !circleTurn
}

//7. This tells that whose turn it is when hovering on the remaining cells
function hoverTurns() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

//9. Checking whether the combination of tic tac toe game is done or not
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combinations => {
    return combinations.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
