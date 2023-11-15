let body = document.querySelector("body");
let botonColorMode = document.querySelector(".color-mode");

botonColorMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
})