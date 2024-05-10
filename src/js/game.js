import {
  WORDS,
  LETTERS,
  SELECTED_WORD_KEY_IN_SESSION_STORE,
} from "./constants";

const gameDiv = document.getElementById("game");
const logo = document.getElementById("logo");

let triesLeft = 10;

const createPlaceholdersHTML = () => {
  const selectedWord = sessionStorage.getItem(
    SELECTED_WORD_KEY_IN_SESSION_STORE
  );
  const placeholders = selectedWord.split("").reduce((acc, _, index) => {
    return (acc += `<div class="placeholder" id="placeholder_${index}">_</div>`);
  }, "");

  return `<div class="placeholder-wrapper">${placeholders}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  const letters = LETTERS.reduce((acc, curr) => {
    return (acc += `<button id="${curr}" class="letter">${curr}</button>`);
  }, "");

  keyboard.classList.add("keyboard");
  keyboard.innerHTML = letters;

  return keyboard;
};

const createTriesCounter = () => {
  return `<p class="tries" id="tries">Tries left: <span id="tries-left" class="tries-left">${triesLeft}</span></p>`;
};

const createHangmanImg = () => {
  const image = document.createElement("img");

  image.src = "/images/hg-0.png";
  image.alt = "Hangman image";
  image.id = "hangman";
  image.classList.add("hangman");

  return image;
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
    triesLeftSpan.textContent = triesLeft;
    hangmanImg.src = `/images/hg-${10 - triesLeft}.png`;
  } else {
    selectedWordArray.forEach((currentLetter, index) => {
      if (currentLetter === inputLetter) {
        const expandablePlaceholder = document.getElementById(
          `placeholder_${index}`
        );
        expandablePlaceholder.textContent = currentLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const selectedWord = WORDS[randomIndex];
  const keyboard = createKeyboard();
  const hangmanImage = createHangmanImg();

  sessionStorage.setItem(SELECTED_WORD_KEY_IN_SESSION_STORE, selectedWord);
  logo.classList.add("logo-small");

  gameDiv.innerHTML = "";
  gameDiv.appendChild(hangmanImage);
  gameDiv.innerHTML += createPlaceholdersHTML();
  gameDiv.innerHTML += createTriesCounter();
  gameDiv.appendChild(keyboard);

  keyboard.addEventListener("click", (event) => {
    const targetId = event.target.id;

    if (LETTERS.includes(targetId)) {
      event.target.disabled = true;
      checkLetter(targetId);
    }
  });
};
