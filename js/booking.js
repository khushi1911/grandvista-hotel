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
    const adults = document.getElementById("adults");
    const children = document.getElementById("children");
    const rooms = document.getElementById("rooms");
    const roomType = document.getElementById("roomType");

    // Get today's date
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    // Prevent selecting past dates
    checkIn.min = todayString;
    checkOut.min = todayString;


    // Update minimum checkout date
    checkIn.addEventListener("change", () => {

        checkOut.min = checkIn.value;

        if (
            checkOut.value &&
            checkOut.value <= checkIn.value
        ) {
            checkOut.value = "";
        }

    });


    // Handle booking search
    form.addEventListener("submit", (event) => {

        event.preventDefault();


        // Basic validation
        if (!checkIn.value || !checkOut.value) {

            alert("Please select both check-in and check-out dates.");

            return;
        }


        if (checkOut.value <= checkIn.value) {

            alert("Check-out must be after check-in.");

            return;
        }


        // Collect booking search data
        const bookingSearch = {

            checkIn: checkIn.value,

            checkOut: checkOut.value,

            adults: adults.value,

            children: children.value,

            rooms: rooms.value,

            roomType: roomType.value

        };


        // Save search information
        localStorage.setItem(
            "grandVistaBookingSearch",
            JSON.stringify(bookingSearch)
        );


        // Open Rooms page with search information
        window.location.href = "pages/rooms.html";

    });

});