 /* =========================================
    GRANDVISTA HOTEL
    Dining Filter
 ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".dining-filter-button");

    const diningCards =
        document.querySelectorAll(".dining-highlight-card");


    if (!filterButtons.length || !diningCards.length) {
        return;
    }


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const category =
                button.getAttribute("data-category");


            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            diningCards.forEach((card) => {

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

        });

    });

});