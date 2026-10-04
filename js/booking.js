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

        const today =
            new Date().toISOString().split("T")[0];

        if (checkIn) {
            checkIn.min = today;
        }

        if (checkIn && checkOut) {

            checkIn.addEventListener("change", () => {

                checkOut.min = checkIn.value;

                if (
                    checkOut.value &&
                    checkOut.value <= checkIn.value
                ) {
                    checkOut.value = "";
                }

            });

        }

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


            window.location.href =
                "pages/rooms.html";

        });

    }


    /* =========================================
       BOOKING PAGE
       ========================================= */

    const selectedRoomContainer =
        document.getElementById("selectedRoomContainer");

    const bookingForm =
        document.getElementById("bookingForm");


    if (!selectedRoomContainer || !bookingForm) {
        return;
    }


    /* =========================================
       LOAD SELECTED ROOM
       ========================================= */

    const savedRoom =
        localStorage.getItem("grandVistaSelectedRoom");

    if (!savedRoom) {

        selectedRoomContainer.innerHTML = `

            <div class="booking-empty">

                <h3>
                    No Room Selected
                </h3>

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

        bookingForm.style.display = "none";

        return;
    }


    let room;

    try {

        room =
            JSON.parse(savedRoom);

    } catch (error) {

        console.error(
            "Unable to read selected room.",
            error
        );

        selectedRoomContainer.innerHTML = `

            <div class="booking-empty">

                <h3>
                    Unable to Load Room
                </h3>

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

        bookingForm.style.display = "none";

        return;
    }


    /* =========================================
       DISPLAY SELECTED ROOM
       ========================================= */

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


    /* =========================================
       LOAD SEARCH DATA
       ========================================= */

    const savedSearch =
        localStorage.getItem("grandVistaBookingSearch");

    let search = null;

    if (savedSearch) {

        try {

            search =
                JSON.parse(savedSearch);

        } catch (error) {

            console.error(
                "Unable to read booking search.",
                error
            );

        }

    }


    const bookingCheckIn =
        document.getElementById("bookingCheckIn");

    const bookingCheckOut =
        document.getElementById("bookingCheckOut");

    const bookingAdults =
        document.getElementById("bookingAdults");

    const bookingChildren =
        document.getElementById("bookingChildren");


    const today =
        new Date().toISOString().split("T")[0];


    if (bookingCheckIn) {
        bookingCheckIn.min = today;
    }


    if (search) {

        if (bookingCheckIn) {
            bookingCheckIn.value =
                search.checkIn || "";
        }

        if (bookingCheckOut) {
            bookingCheckOut.value =
                search.checkOut || "";
        }

        if (bookingAdults) {
            bookingAdults.value =
                search.adults || 1;
        }

        if (bookingChildren) {
            bookingChildren.value =
                search.children || 0;
        }

    }


    if (
        bookingCheckIn &&
        bookingCheckOut
    ) {

        bookingCheckOut.min =
            bookingCheckIn.value || today;


        bookingCheckIn.addEventListener(
            "change",
            () => {

                bookingCheckOut.min =
                    bookingCheckIn.value;

                if (
                    bookingCheckOut.value &&
                    bookingCheckOut.value <=
                    bookingCheckIn.value
                ) {

                    bookingCheckOut.value = "";

                }

                updatePrice();

            }
        );


        bookingCheckOut.addEventListener(
            "change",
            updatePrice
        );

    }


    /* =========================================
       PRICE ELEMENTS
       ========================================= */

    const summaryRoom =
        document.getElementById("summaryRoom");

    const summaryNights =
        document.getElementById("summaryNights");

    const summaryRoomPrice =
        document.getElementById("summaryRoomPrice");

    const summaryServices =
        document.getElementById("summaryServices");

    const summaryTax =
        document.getElementById("summaryTax");

    const summaryTotal =
        document.getElementById("summaryTotal");


    /* =========================================
       CALCULATE NIGHTS
       ========================================= */

    function calculateNights() {

        if (
            !bookingCheckIn ||
            !bookingCheckOut ||
            !bookingCheckIn.value ||
            !bookingCheckOut.value
        ) {
            return 0;
        }


        const checkInDate =
            new Date(
                bookingCheckIn.value
            );

        const checkOutDate =
            new Date(
                bookingCheckOut.value
            );


        const difference =
            checkOutDate - checkInDate;


        const nights =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        return nights > 0 ? nights : 0;

    }


    /* =========================================
       ADDITIONAL SERVICES
       ========================================= */

    const serviceOptions =
        document.querySelectorAll(
            ".service-option"
        );


    function calculateServices() {

        let total = 0;

        serviceOptions.forEach(
            (service) => {

                if (service.checked) {

                    total +=
                        Number(service.value);

                }

            }
        );

        return total;

    }


    serviceOptions.forEach(
        (service) => {

            service.addEventListener(
                "change",
                updatePrice
            );

        }
    );


    /* =========================================
       UPDATE PRICE
       ========================================= */

    function updatePrice() {

        const nights =
            calculateNights();

        const roomTotal =
            room.price * nights;

        const serviceTotal =
            calculateServices();

        /*
           Demo hotel tax:
           12% of room + services
        */

        const taxableAmount =
            roomTotal + serviceTotal;

        const tax =
            Math.round(
                taxableAmount * 0.12
            );

        const total =
            roomTotal +
            serviceTotal +
            tax;


        if (summaryRoom) {

            summaryRoom.textContent =
                room.name;

        }


        if (summaryNights) {

            summaryNights.textContent =
                nights;

        }


        if (summaryRoomPrice) {

            summaryRoomPrice.textContent =
                `₹${roomTotal.toLocaleString("en-IN")}`;

        }


        if (summaryServices) {

            summaryServices.textContent =
                `₹${serviceTotal.toLocaleString("en-IN")}`;

        }


        if (summaryTax) {

            summaryTax.textContent =
                `₹${tax.toLocaleString("en-IN")}`;

        }


        if (summaryTotal) {

            summaryTotal.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }

    }


    updatePrice();


    /* =========================================
       BOOKING FORM SUBMISSION
       ========================================= */

    bookingForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const checkIn =
                bookingCheckIn.value;

            const checkOut =
                bookingCheckOut.value;

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

            const guestCountry =
                document
                    .getElementById("guestCountry")
                    .value
                    .trim();

            const adults =
                Number(
                    bookingAdults.value
                );

            const children =
                Number(
                    bookingChildren.value
                );

            const specialRequest =
                document
                    .getElementById("specialRequest")
                    .value
                    .trim();


            /* Dates */

            if (!checkIn || !checkOut) {

                alert(
                    "Please select your check-in and check-out dates."
                );

                return;
            }


            if (checkOut <= checkIn) {

                alert(
                    "Check-out date must be after check-in date."
                );

                return;
            }


            /* Name */

            if (guestName.length < 2) {

                alert(
                    "Please enter your full name."
                );

                return;
            }


            /* Email */

            const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    guestEmail
                )
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            /* Phone */

            const phonePattern =
                /^[0-9]{10}$/;


            if (
                !phonePattern.test(
                    guestPhone
                )
            ) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            /* Country */

            if (guestCountry.length < 2) {

                alert(
                    "Please enter your country."
                );

                return;
            }


            /* Guests */

            if (
                adults < 1 ||
                children < 0
            ) {

                alert(
                    "Please enter valid guest numbers."
                );

                return;
            }


            /* Room capacity */

            if (
                adults + children >
                Number(room.guests)
            ) {

                alert(
                    `This room can accommodate up to ${room.guests} guests.`
                );

                return;
            }


            const nights =
                calculateNights();

            const serviceTotal =
                calculateServices();

            const roomTotal =
                room.price * nights;

            const tax =
                Math.round(
                    (roomTotal + serviceTotal) *
                    0.12
                );

            const total =
                roomTotal +
                serviceTotal +
                tax;


            /* Selected services */

            const selectedServices = [];

            serviceOptions.forEach(
                (service) => {

                    if (service.checked) {

                        selectedServices.push({

                            name:
                                service.dataset.name,

                            price:
                                Number(service.value)

                        });

                    }

                }
            );


            /* Guest details */

            const guestDetails = {

                name: guestName,

                email: guestEmail,

                phone: guestPhone,

                country: guestCountry,

                adults: adults,

                children: children,

                specialRequest:
                    specialRequest

            };


            /* Booking details */

            const bookingDetails = {

                checkIn: checkIn,

                checkOut: checkOut,

                nights: nights,

                roomPrice: room.price,

                roomTotal: roomTotal,

                services: selectedServices,

                servicesTotal: serviceTotal,

                tax: tax,

                total: total

            };


            localStorage.setItem(
                "grandVistaGuestDetails",
                JSON.stringify(
                    guestDetails
                )
            );


            localStorage.setItem(
                "grandVistaBookingDetails",
                JSON.stringify(
                    bookingDetails
                )
            );


            window.location.href =
                "confirmation.html";

        }
    );


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

});