/* =========================================
   GRANDVISTA HOTEL
   Dining Filter
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".dining-filter-button");

    const diningCards =
        document.querySelectorAll(".dining-highlight-card");

    const menuItems =
        document.querySelectorAll(".dining-menu-item");


    /*
       Highlight filtering
    */

    function filterHighlights(category) {

        diningCards.forEach(card => {

            const cardCategory =
                card.getAttribute("data-category");

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }


    /*
       Menu filtering
    */

    function filterMenu(category) {

        menuItems.forEach(item => {

            const itemCategory =
                item.getAttribute("data-category");

            if (
                category === "all" ||
                itemCategory === category
            ) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    }


    /*
       Filter buttons
    */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.getAttribute("data-category");


            /*
               Only update buttons in the
               same filter section.
            */

            const filterSection =
                button.closest(
                    ".dining-filter"
                );


            if (filterSection) {

                filterSection
                    .querySelectorAll(
                        ".dining-filter-button"
                    )
                    .forEach(item => {

                        item.classList.remove("active");

                    });

                button.classList.add("active");

            }


            /*
               Menu categories
            */

            if (menuItems.length) {

                const menuSection =
                    button.closest(
                        ".dining-menu-section"
                    );

                if (menuSection) {

                    filterMenu(category);

                }

            }


            /*
               Dining highlight categories
            */

            if (diningCards.length) {

                const highlightSection =
                    button.closest(
                        ".dining-highlights"
                    );

                if (highlightSection) {

                    filterHighlights(category);

                }

            }

        });

    });

});