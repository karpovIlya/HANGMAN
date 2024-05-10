import "/src/css/style.css";
import { swicthThemeHandler } from "./utilities";
import { startGame } from "./game";

swicthThemeHandler();

const startGameBtn = document.querySelector(".button-primary");
startGameBtn.addEventListener("click", () => {
  startGame();
});
