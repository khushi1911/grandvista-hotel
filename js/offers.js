document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".offer-filter-button");
    const offerCards = document.querySelectorAll(".offer-card");
    const emptyMessage = document.getElementById("offersEmptyMessage");


    function filterOffers(category) {

        let visibleOffers = 0;

        offerCards.forEach(function (card) {

            const cardCategory = card.dataset.category;

            if (category === "all" || cardCategory === category) {

                card.style.display = "";

                visibleOffers++;

            } else {

                card.style.display = "none";

            }

        });


        if (emptyMessage) {

            emptyMessage.hidden = visibleOffers !== 0;

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.category;


            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");


            filterOffers(selectedCategory);

        });

    });


    // Show all offers when the page loads
    filterOffers("all");

});