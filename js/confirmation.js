/* =========================================
   GRANDVISTA HOTEL
   Booking Confirmation
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const confirmationDetails =
        document.getElementById("confirmationDetails");

    if (!confirmationDetails) {
        return;
    }


    /* =========================================
       LOAD SAVED DATA
       ========================================= */

    const savedRoom =
        localStorage.getItem("grandVistaSelectedRoom");

    const savedGuest =
        localStorage.getItem("grandVistaGuestDetails");

    const savedBooking =
        localStorage.getItem("grandVistaBookingDetails");


    if (!savedRoom || !savedGuest || !savedBooking) {

        confirmationDetails.innerHTML = `

            <div class="booking-empty">

                <h3>
                    Booking Details Not Found
                </h3>

                <p>
                    Please return to the rooms page and
                    start your booking again.
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


    let room;
    let guest;
    let booking;


    try {

        room =
            JSON.parse(savedRoom);

        guest =
            JSON.parse(savedGuest);

        booking =
            JSON.parse(savedBooking);

    } catch (error) {

        console.error(
            "Unable to load booking information.",
            error
        );

        confirmationDetails.innerHTML = `

            <div class="booking-empty">

                <h3>
                    Something Went Wrong
                </h3>

                <p>
                    We could not load your booking details.
                </p>

                <a
                    href="rooms.html"
                    class="primary-button">
                    Start Again
                </a>

            </div>

        `;

        return;
    }


    /* =========================================
       GENERATE BOOKING REFERENCE
       ========================================= */

    let bookingReference =
        localStorage.getItem(
            "grandVistaBookingReference"
        );


    if (!bookingReference) {

        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        bookingReference =
            `GV-${randomNumber}`;

        localStorage.setItem(
            "grandVistaBookingReference",
            bookingReference
        );

    }


    /* =========================================
       SERVICES
       ========================================= */

    let servicesHTML = "None";


    if (
        booking.services &&
        booking.services.length > 0
    ) {

        servicesHTML = booking.services
            .map(
                (service) =>
                    `<span>${service.name} — ₹${service.price.toLocaleString("en-IN")}</span>`
            )
            .join("");

    }


    /* =========================================
       DISPLAY CONFIRMATION
       ========================================= */

    confirmationDetails.innerHTML = `

        <div class="confirmation-reference">

            <span>
                Booking Reference
            </span>

            <strong>
                ${bookingReference}
            </strong>

        </div>


        <div class="confirmation-grid">

            <div class="confirmation-item">

                <span>
                    Guest Name
                </span>

                <strong>
                    ${guest.name}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Email
                </span>

                <strong>
                    ${guest.email}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Phone
                </span>

                <strong>
                    ${guest.phone}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Country
                </span>

                <strong>
                    ${guest.country}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Room
                </span>

                <strong>
                    ${room.name}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Room Type
                </span>

                <strong>
                    ${formatRoomType(room.type)}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Check-in
                </span>

                <strong>
                    ${formatDate(booking.checkIn)}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Check-out
                </span>

                <strong>
                    ${formatDate(booking.checkOut)}
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Guests
                </span>

                <strong>
                    ${guest.adults} Adult(s), ${guest.children} Child(ren)
                </strong>

            </div>


            <div class="confirmation-item">

                <span>
                    Nights
                </span>

                <strong>
                    ${booking.nights}
                </strong>

            </div>

        </div>


        <div class="confirmation-pricing">

            <h2>
                Price Summary
            </h2>


            <div class="price-row">

                <span>
                    Room Price
                </span>

                <strong>
                    ₹${booking.roomTotal.toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="price-row">

                <span>
                    Additional Services
                </span>

                <strong>
                    ₹${booking.servicesTotal.toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="price-row">

                <span>
                    Taxes
                </span>

                <strong>
                    ₹${booking.tax.toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="price-row price-total">

                <span>
                    Total
                </span>

                <strong>
                    ₹${booking.total.toLocaleString("en-IN")}
                </strong>

            </div>

        </div>


        <div class="confirmation-services">

            <h3>
                Additional Services
            </h3>

            <div class="service-list">

                ${servicesHTML}

            </div>

        </div>


        <div class="confirmation-status">

            <strong>
                Booking Status
            </strong>

            <span>
                Pending Confirmation
            </span>

        </div>


        ${
            guest.specialRequest
                ? `
                    <div class="confirmation-request">

                        <strong>
                            Special Request
                        </strong>

                        <p>
                            ${guest.specialRequest}
                        </p>

                    </div>
                  `
                : ""
        }


        <p class="demo-note">
            This is a fictional/demo booking confirmation
            for the GrandVista Hotel project.
        </p>

    `;


    /* =========================================
       HELPERS
       ========================================= */

    function formatDate(dateString) {

        if (!dateString) {
            return "—";
        }

        const date =
            new Date(`${dateString}T00:00:00`);

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


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

        return type || "Room";

    }

});