import "../css/style.css";
import { swicthThemeHandler, getRandomWord } from "./utilities";
import { startGame } from "./game";

swicthThemeHandler();

const startGameBtn = document.querySelector(".button-primary");
startGameBtn.addEventListener("click", () => {
  startGame();
});
