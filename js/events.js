document.addEventListener("DOMContentLoaded", function () {

    const proposalButtons = document.querySelectorAll(
        ".event-type-card .text-link"
    );


    proposalButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const eventCard = button.closest(".event-type-card");

            if (!eventCard) {
                return;
            }


            const eventNameElement = eventCard.querySelector("h3");

            if (!eventNameElement) {
                return;
            }


            const eventName = eventNameElement.textContent.trim();


            // Save the selected event type for the enquiry page
            localStorage.setItem(
                "grandVistaSelectedEvent",
                eventName
            );

        });

    });

});