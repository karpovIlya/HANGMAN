import { LETTERS, SELECTED_WORD_KEY_IN_SESSION_STORE } from "./constants";
import { getRandomWord } from "./utilities";

const gameDiv = document.getElementById("game");
const logo = document.getElementById("logo");

let triesLeft = 10;
let guessedLetters = 0;

const createPlaceholdersHTML = () => {
  const selectedWord = sessionStorage.getItem(
    SELECTED_WORD_KEY_IN_SESSION_STORE
  );
  const placeholders = selectedWord.split("").reduce((acc, _, index) => {
    return (acc += `<div class="placeholder" id="placeholder_${index}">_</div>`);
  }, "");

  return `<div class="placeholder-wrapper" id="placeholders">${placeholders}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  const letters = LETTERS.reduce((acc, curr) => {
    return (acc += `<button id="${curr}" class="letter">${curr}</button>`);
  }, "");

  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";
  keyboard.innerHTML = letters;

  return keyboard;
};

const createTriesCounter = () => {
  return `<p class="tries" id="tries">Tries left: <span id="tries-left" class="tries-left">${triesLeft}</span></p>`;
};

const createHangmanImg = () => {
  const image = document.createElement("img");

  image.src = "./images/hg-0.png";
  image.alt = "Hangman image";
  image.id = "hangman";
  image.classList.add("hangman");

  return image;
};

const createResultText = (status) => {
  const resultText = document.createElement("p");
  resultText.classList.add("result-text");

  switch (status) {
    case "win":
      resultText.classList.add("win-text");
      resultText.textContent = "Congratulations, you won =)";
      break;
    case "lose":
      resultText.classList.add("lose-text");
      resultText.textContent = "Sorry, you lost =(";
      break;
  }

  return resultText;
};

const createSelectedWordHtml = () => {
  const selectedWord = sessionStorage.getItem(
    SELECTED_WORD_KEY_IN_SESSION_STORE
  );
  const selectedWordHtml = document.createElement("p");

  selectedWordHtml.classList.add("selected-word");
  selectedWordHtml.innerHTML = `The word was: <span class="selected-word-bold">${selectedWord}</span>`;

  return selectedWordHtml;
};

const changeForWinImg = (status) => {
  if (status === "win") {
    document.getElementById("hangman").src = "./images/hg-win.png";
  }
};

const createQuitBtn = () => {
  const quitBtn = document.createElement("button");

  quitBtn.classList.add("button-secondary");
  quitBtn.textContent = "quit";
  quitBtn.id = "quit";

  return quitBtn;
};

const createRetryBtn = () => {
  const retryBtn = document.createElement("button");

  retryBtn.classList.add("button-primary");
  retryBtn.textContent = "retry";
  retryBtn.id = "retry";

  return retryBtn;
};

const stopGame = (status) => {
  const retryBtn = createRetryBtn();

  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  logo.classList.remove("logo-small");
  changeForWinImg(status);

  if (status !== "quit") {
    gameDiv.appendChild(createResultText(status));
  } else {
    document.getElementById("hangman").remove();
  }

  gameDiv.appendChild(createSelectedWordHtml());
  gameDiv.appendChild(retryBtn);

  retryBtn.addEventListener("click", () => {
    gameDiv.innerHTML = "";

    const startGameBtn = document.createElement("button");

    startGameBtn.classList.add("button-primary");
    startGameBtn.textContent = "START GAME";

    gameDiv.appendChild(startGameBtn);

    startGameBtn.addEventListener("click", () => {
      startGame();
    });

    triesLeft = 10;
    guessedLetters = 0;
  });
};

const checkLetter = (letter) => {
  const selectedWord = sessionStorage
    .getItem(SELECTED_WORD_KEY_IN_SESSION_STORE)
    .toLowerCase();
  const inputLetter = letter.toLowerCase();
  const triesLeftSpan = document.getElementById("tries-left");
  const hangmanImg = document.getElementById("hangman");
  const selectedWordArray = selectedWord.split("");

  if (!selectedWord.includes(inputLetter)) {
    triesLeft--;

    if (triesLeft === 0) {
      stopGame("lose");
    }

    triesLeftSpan.textContent = triesLeft;
    hangmanImg.src = `./images/hg-${10 - triesLeft}.png`;
  } else {
    selectedWordArray.forEach((currentLetter, index) => {
      if (currentLetter === inputLetter) {
        const expandablePlaceholder = document.getElementById(
          `placeholder_${index}`
        );
        expandablePlaceholder.textContent = currentLetter.toUpperCase();

        guessedLetters++;
        if (guessedLetters === selectedWord.length) {
          stopGame("win");
        }
      }
    });
  }
};

export const startGame = () => {
  getRandomWord()
    .then((selectedWord) => {
      const keyboard = createKeyboard();
      const hangmanImage = createHangmanImg();
      const quitBtn = createQuitBtn();

      sessionStorage.setItem(SELECTED_WORD_KEY_IN_SESSION_STORE, selectedWord);
      logo.classList.add("logo-small");

      gameDiv.innerHTML = "";
      gameDiv.appendChild(hangmanImage);
      gameDiv.innerHTML += createPlaceholdersHTML();
      gameDiv.innerHTML += createTriesCounter();
      gameDiv.appendChild(keyboard);
      gameDiv.appendChild(quitBtn);

      keyboard.addEventListener("click", (event) => {
        const targetId = event.target.id;

        if (LETTERS.includes(targetId)) {
          event.target.disabled = true;
          checkLetter(targetId);
        }
      });

      quitBtn.addEventListener("click", () => {
        const isSure = confirm("Are you sure you want to quit?");

        if (isSure) {
          stopGame("quit");
        }
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};
