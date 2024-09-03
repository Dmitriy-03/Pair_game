const game = document.getElementById("game")

function startGame(game, count) {
  const cardsNumberArray = []
  let firstCard = null
  let secondCard = null

  // Создание массива чисел
  for (let i = 1; i <= count; i++) {
    cardsNumberArray.push(i, i)
  }

  // Перемешивание массива чисел
  for (let i = 0; i < cardsNumberArray.length; i++) {
    let randomIndex = Math.floor(Math.random() * cardsNumberArray.length)

    let temp = cardsNumberArray[i]
    cardsNumberArray[i] = cardsNumberArray[randomIndex]
    cardsNumberArray[randomIndex] = temp
  }

  // Настройка сетки
  let columns = 2

  if (count === 3) {
    columns = 3
  }

  if (count === 4) {
    columns = 4
  }

  if (count === 5) {
    columns = 5
  }

  if (count === 6) {
    columns = 4
  }

  if (count % 2 == 0) {
    columns = 4
  }

  game.style = `grid-template-columns: repeat(${columns}, 1fr);`

  // Создание карточек
  for (const cardNumber of cardsNumberArray) {
    let card = document.createElement("div")
    card.textContent = cardNumber
    card.classList.add("card")

    // Клик по карточке
    card.addEventListener("click", function () {
      if (card.classList.contains("open") || card.classList.contains("success")) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove("open")
        secondCard.classList.remove("open")
        firstCard = null
        secondCard = null
      }

      card.classList.add("open")

      if (firstCard === null) {
        firstCard = card
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent
        let secondCardNumber = secondCard.textContent

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add("success")
          secondCard.classList.add("success")
        }
      }

      // Проверка финала игры
      if (cardsNumberArray.length === document.querySelectorAll(".success").length) {
        setTimeout(function () {
          game.innerHTML = ""
          alert("Победа!")
          let count = Number(prompt("Введите количесво пар", 2))
          startGame(game, count)
        }, 400)
      }
    })
    game.append(card)
  }
}

// Старт игры
let count = Number(prompt("Введите количесво пар", 2))
startGame(game, count)