/* =========================================
   GRANDVISTA HOTEL
   Booking Page
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const selectedRoomContainer =
        document.getElementById("selectedRoomContainer");

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

        return;
    }


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


    /*
       Format room type
    */

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
    /*
       Booking form validation
    */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const guestName =
                document.getElementById("guestName").value.trim();

            const guestEmail =
                document.getElementById("guestEmail").value.trim();

            const guestPhone =
                document.getElementById("guestPhone").value.trim();

            /*
               Validate name
            */

            if (guestName.length < 2) {

                alert("Please enter your full name.");

                return;

            }

            /*
               Validate email
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(guestEmail)) {

                alert("Please enter a valid email address.");

                return;

            }

            /*
               Validate phone
            */

            const phonePattern =
                /^[0-9]{10}$/;

            if (!phonePattern.test(guestPhone)) {

                alert("Please enter a valid 10-digit phone number.");

                return;

            }

            /*
               Save guest information
            */

            const guestDetails = {

                name: guestName,

                email: guestEmail,

                phone: guestPhone,

                specialRequest:
                    document
                        .getElementById("specialRequest")
                        .value
                        .trim()

            };

            localStorage.setItem(
                "grandVistaGuestDetails",
                JSON.stringify(guestDetails)
            );

            /*
               Continue to confirmation page
            */

            window.location.href =
                "confirmation.html";

        });

    }
});