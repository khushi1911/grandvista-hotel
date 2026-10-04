/* =========================================
   GRANDVISTA HOTEL
   Booking & Availability
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HOMEPAGE - CHECK AVAILABILITY
       ========================================= */

    const bookingSearchForm =
        document.getElementById("bookingSearchForm");

    if (bookingSearchForm) {

        const checkIn =
            document.getElementById("checkIn");

        const checkOut =
            document.getElementById("checkOut");

        /*
           Set today's date as the minimum
           check-in date
        */

        const today =
            new Date().toISOString().split("T")[0];

        if (checkIn) {
            checkIn.min = today;
        }

        /*
           Checkout cannot be before check-in
        */

        if (checkIn && checkOut) {

            checkIn.addEventListener("change", () => {

                checkOut.min = checkIn.value;

                if (
                    checkOut.value &&
                    checkOut.value < checkIn.value
                ) {
                    checkOut.value = "";
                }

            });

        }


        /*
           Handle Check Availability
        */

        bookingSearchForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const checkInValue =
                checkIn.value;

            const checkOutValue =
                checkOut.value;

            const adults =
                document.getElementById("adults").value;

            const children =
                document.getElementById("children").value;

            const rooms =
                document.getElementById("rooms").value;

            const roomType =
                document.getElementById("roomType").value;


            /*
               Validate dates
            */

            if (!checkInValue || !checkOutValue) {

                alert(
                    "Please select both check-in and check-out dates."
                );

                return;
            }


            if (checkOutValue <= checkInValue) {

                alert(
                    "Check-out date must be after check-in date."
                );

                return;
            }


            /*
               Save booking search
            */

            const bookingSearch = {

                checkIn: checkInValue,

                checkOut: checkOutValue,

                adults: adults,

                children: children,

                rooms: rooms,

                roomType: roomType

            };


            localStorage.setItem(
                "grandVistaBookingSearch",
                JSON.stringify(bookingSearch)
            );


            /*
               Go to rooms page
            */

            window.location.href =
                "pages/rooms.html";

        });

    }


    /* =========================================
       BOOKING PAGE - SELECTED ROOM
       ========================================= */

    const selectedRoomContainer =
        document.getElementById("selectedRoomContainer");

    if (selectedRoomContainer) {

        const savedRoom =
            localStorage.getItem("grandVistaSelectedRoom");


        /*
           Check whether a room was selected
        */

        if (!savedRoom) {

            selectedRoomContainer.innerHTML = `

                <div class="booking-empty">

                    <h3>No Room Selected</h3>

                    <p>
                        Please select a room before continuing
                        with your booking.
                    </p>

                    <a
                        href="rooms.html"
                        class="primary-button">

                        Browse Rooms

                    </a>

                </div>

            `;

        } else {

            /*
               Read selected room
            */

            let room;

            try {

                room = JSON.parse(savedRoom);

            } catch (error) {

                console.error(
                    "Unable to read selected room.",
                    error
                );

                selectedRoomContainer.innerHTML = `

                    <div class="booking-empty">

                        <h3>Unable to Load Room</h3>

                        <p>
                            Please return to the rooms page
                            and select a room again.
                        </p>

                        <a
                            href="rooms.html"
                            class="primary-button">

                            Browse Rooms

                        </a>

                    </div>

                `;

                return;
            }


            /*
               Display selected room
            */

            selectedRoomContainer.innerHTML = `

                <div class="selected-room-image">

                    <img
                        src="${room.image}"
                        alt="${room.name}">

                </div>


                <div class="selected-room-details">

                    <p class="room-type">
                        ${formatRoomType(room.type)}
                    </p>

                    <h3>
                        ${room.name}
                    </h3>

                    <p>
                        ${room.description}
                    </p>

                    <div class="selected-room-info">

                        <span>
                            ${room.size}
                        </span>

                        <span>
                            ${room.guests} Guests
                        </span>

                        <span>
                            ${room.bed}
                        </span>

                        <span>
                            ${room.view}
                        </span>

                    </div>


                    <div class="selected-room-price">

                        <strong>
                            ₹${room.price.toLocaleString("en-IN")}
                        </strong>

                        <span>
                            / night
                        </span>

                    </div>

                </div>

            `;

        }

    }


    /* =========================================
       FORMAT ROOM TYPE
       ========================================= */

    function formatRoomType(type) {

        if (type === "deluxe") {
            return "Deluxe";
        }

        if (type === "premium") {
            return "Premium";
        }

        if (type === "suite") {
            return "Executive Suite";
        }

        return type;

    }


    /* =========================================
       BOOKING PAGE - GUEST FORM
       ========================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();


            const guestEmail =
                document
                    .getElementById("guestEmail")
                    .value
                    .trim();


            const guestPhone =
                document
                    .getElementById("guestPhone")
                    .value
                    .trim();


            /*
               Validate name
            */

            if (guestName.length < 2) {

                alert(
                    "Please enter your full name."
                );

                return;

            }


            /*
               Validate email
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(guestEmail)) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            /*
               Validate phone
            */

            const phonePattern =
                /^[0-9]{10}$/;

            if (!phonePattern.test(guestPhone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            /*
               Special request
            */

            const specialRequestElement =
                document.getElementById("specialRequest");


            const specialRequest =
                specialRequestElement
                    ? specialRequestElement.value.trim()
                    : "";


            /*
               Save guest information
            */

            const guestDetails = {

                name: guestName,

                email: guestEmail,

                phone: guestPhone,

                specialRequest: specialRequest

            };


            localStorage.setItem(
                "grandVistaGuestDetails",
                JSON.stringify(guestDetails)
            );


            /*
               Continue to confirmation
            */

            window.location.href =
                "confirmation.html";

        });

    }

});