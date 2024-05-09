export const swicthThemeHandler = () => {
  const themeSwicther = document.getElementById('theme-swicther')
  const htmlElement = document.documentElement
  const darkThemeClass = 'dark'
  const themeKeyInStorage = 'theme'

  if (localStorage.getItem(themeKeyInStorage)) {
    htmlElement.classList.add(darkThemeClass)
    themeSwicther.checked = true
  }

  themeSwicther.addEventListener('input', () => {
    htmlElement.classList.toggle(darkThemeClass)

    if (htmlElement.classList.contains(darkThemeClass)) {
      localStorage.setItem(themeKeyInStorage, darkThemeClass)
    } else {
      localStorage.setItem(themeKeyInStorage, '')
    }
  })
}