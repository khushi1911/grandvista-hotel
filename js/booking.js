/* =========================================
   GRANDVISTA HOTEL
   Booking Search
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("bookingSearchForm");

    if (!form) {
        return;
    }


    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");


    // Prevent past dates
    const today = new Date()
        .toISOString()
        .split("T")[0];

    checkIn.min = today;
    checkOut.min = today;


    checkIn.addEventListener("change", () => {

        checkOut.min = checkIn.value;

        if (
            checkOut.value &&
            checkOut.value < checkIn.value
        ) {
            checkOut.value = "";
        }

    });


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        if (!checkIn.value || !checkOut.value) {

            alert(
                "Please select both check-in and check-out dates."
            );

            return;
        }


        if (checkOut.value <= checkIn.value) {

            alert(
                "Check-out must be after check-in."
            );

            return;
        }


        alert(
            "Availability search will be implemented in the next step."
        );

    });

});