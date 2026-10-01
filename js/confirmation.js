/* =========================================
   GRANDVISTA HOTEL
   Booking Confirmation
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const confirmationDetails =
        document.getElementById("confirmationDetails");

    const savedRoom =
        localStorage.getItem("grandVistaSelectedRoom");

    const savedGuest =
        localStorage.getItem("grandVistaGuestDetails");

    /*
       Check saved booking information
    */

    if (!savedRoom || !savedGuest) {

        confirmationDetails.innerHTML = `

            <div class="booking-empty">

                <h3>
                    Booking Information Not Found
                </h3>

                <p>
                    Please complete the booking process
                    before viewing the confirmation.
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
       Read saved information
    */

    let room;
    let guest;

    try {

        room = JSON.parse(savedRoom);

        guest = JSON.parse(savedGuest);

    } catch (error) {

        console.error(
            "Unable to read booking information.",
            error
        );

        return;

    }


    /*
       Display confirmation details
    */

    confirmationDetails.innerHTML = `

        <div class="confirmation-room">

            <img
                src="${room.image}"
                alt="${room.name}">

            <div>

                <p class="room-type">
                    ${formatRoomType(room.type)}
                </p>

                <h3>
                    ${room.name}
                </h3>

                <p>
                    ${room.description}
                </p>

            </div>

        </div>


        <div class="confirmation-info">

            <div>

                <span>
                    Guest Name
                </span>

                <strong>
                    ${guest.name}
                </strong>

            </div>


            <div>

                <span>
                    Email
                </span>

                <strong>
                    ${guest.email}
                </strong>

            </div>


            <div>

                <span>
                    Phone
                </span>

                <strong>
                    ${guest.phone}
                </strong>

            </div>


            <div>

                <span>
                    Room
                </span>

                <strong>
                    ${room.name}
                </strong>

            </div>


            <div>

                <span>
                    Room Price
                </span>

                <strong>
                    ₹${room.price.toLocaleString("en-IN")} / night
                </strong>

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

});