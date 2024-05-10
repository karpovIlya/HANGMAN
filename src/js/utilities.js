import { DARK_THEME_CLASS, THEME_KEY_IN_LOCACL_STORE } from "./constants";

export const swicthThemeHandler = () => {
  const themeSwicther = document.getElementById("theme-swicther");
  const htmlElement = document.documentElement;

  if (localStorage.getItem(THEME_KEY_IN_LOCACL_STORE)) {
    htmlElement.classList.add(DARK_THEME_CLASS);
    themeSwicther.checked = true;
  }

  themeSwicther.addEventListener("input", () => {
    htmlElement.classList.toggle(DARK_THEME_CLASS);

    if (htmlElement.classList.contains(DARK_THEME_CLASS)) {
      localStorage.setItem(THEME_KEY_IN_LOCACL_STORE, DARK_THEME_CLASS);
    } else {
      localStorage.setItem(THEME_KEY_IN_LOCACL_STORE, "");
    }
  });
};
