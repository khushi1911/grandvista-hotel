/* =========================================
   GRANDVISTA HOTEL
   Main JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }

});