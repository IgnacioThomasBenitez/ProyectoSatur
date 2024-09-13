document.addEventListener("DOMContentLoaded", function () {
    const openMenuButton = document.getElementById("open-menu");
    const closeMenuButton = document.getElementById("close-menu");
    const aside = document.querySelector("aside");
  
    openMenuButton.addEventListener("click", function () {
      aside.classList.add("aside-visible");
    });
  
    closeMenuButton.addEventListener("click", function () {
      aside.classList.remove("aside-visible");
    });
  });
  