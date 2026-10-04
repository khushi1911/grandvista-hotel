/* =========================================
   GRANDVISTA HOTEL
   Rooms Page
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const roomsContainer =
        document.getElementById("roomsContainer");

    const noRoomsMessage =
        document.getElementById("noRoomsMessage");

    const showAllRoomsButton =
        document.getElementById("showAllRooms");

    const roomTypeFilter =
        document.getElementById("roomTypeFilter");

    const guestFilter =
        document.getElementById("guestFilter");

    const sortRooms =
        document.getElementById("sortRooms");


    /* =========================================
       ROOM DATA
       ========================================= */

    const rooms = [

        {
            id: 1,
            name: "Deluxe Room",
            type: "deluxe",
            price: 5000,
            size: 350,
            sizeText: "350 sq.ft.",
            guests: 2,
            bed: "King Bed",
            view: "City View",
            image: "../images/rooms/deluxe-room.jpg",
            description:
                "A comfortable room with modern amenities and a relaxing city view."
        },

        {
            id: 2,
            name: "Premium Room",
            type: "premium",
            price: 7000,
            size: 450,
            sizeText: "450 sq.ft.",
            guests: 3,
            bed: "King Bed",
            view: "Garden View",
            image: "../images/rooms/premium-room.jpg",
            description:
                "A spacious room designed for guests looking for extra comfort and space."
        },

        {
            id: 3,
            name: "Executive Suite",
            type: "suite",
            price: 10000,
            size: 650,
            sizeText: "650 sq.ft.",
            guests: 4,
            bed: "King Bed",
            view: "Panoramic View",
            image: "../images/rooms/executive-suite.jpg",
            description:
                "A spacious suite with separate living space and premium amenities."
        }

    ];


    /* =========================================
       BOOKING SEARCH
       ========================================= */

    const savedSearch =
        localStorage.getItem(
            "grandVistaBookingSearch"
        );

    let bookingSearch = null;


    if (savedSearch) {

        try {

            bookingSearch =
                JSON.parse(savedSearch);

        } catch (error) {

            console.error(
                "Unable to read booking search data.",
                error
            );

        }

    }


    /* =========================================
       DISPLAY SEARCH SUMMARY
       ========================================= */

    if (bookingSearch) {

        document.getElementById(
            "displayCheckIn"
        ).textContent =
            formatDate(bookingSearch.checkIn);

        document.getElementById(
            "displayCheckOut"
        ).textContent =
            formatDate(bookingSearch.checkOut);


        const totalGuests =
            Number(bookingSearch.adults || 0) +
            Number(bookingSearch.children || 0);


        document.getElementById(
            "displayGuests"
        ).textContent =
            `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""}`;


        document.getElementById(
            "displayRooms"
        ).textContent =
            bookingSearch.rooms || 1;


        document.getElementById(
            "displayRoomType"
        ).textContent =
            formatRoomType(
                bookingSearch.roomType
            );

    }


    /* =========================================
       INITIAL FILTERS
       ========================================= */

    if (
        bookingSearch &&
        bookingSearch.roomType &&
        bookingSearch.roomType !== "all"
    ) {

        roomTypeFilter.value =
            bookingSearch.roomType;

    }


    /* =========================================
       FILTER EVENTS
       ========================================= */

    roomTypeFilter.addEventListener(
        "change",
        renderRooms
    );

    guestFilter.addEventListener(
        "change",
        renderRooms
    );

    sortRooms.addEventListener(
        "change",
        renderRooms
    );


    /* =========================================
       SHOW ALL
       ========================================= */

    showAllRoomsButton.addEventListener(
        "click",
        () => {

            roomTypeFilter.value = "all";
            guestFilter.value = "0";
            sortRooms.value = "featured";

            renderRooms();

        }
    );


    /* =========================================
       RENDER
       ========================================= */

    function renderRooms() {

        let filteredRooms =
            [...rooms];


        /* Room type */

        const selectedType =
            roomTypeFilter.value;


        if (selectedType !== "all") {

            filteredRooms =
                filteredRooms.filter(
                    room =>
                        room.type === selectedType
                );

        }


        /* Guest capacity */

        const minimumGuests =
            Number(
                guestFilter.value
            );


        if (minimumGuests > 0) {

            filteredRooms =
                filteredRooms.filter(
                    room =>
                        room.guests >=
                        minimumGuests
                );

        }


        /* Sorting */

        const sortValue =
            sortRooms.value;


        if (sortValue === "price-low") {

            filteredRooms.sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        if (sortValue === "price-high") {

            filteredRooms.sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        if (sortValue === "size") {

            filteredRooms.sort(
                (a, b) =>
                    b.size - a.size
            );

        }


        displayRooms(
            filteredRooms
        );

    }


    /* =========================================
       DISPLAY ROOM CARDS
       ========================================= */

    function displayRooms(roomList) {

        roomsContainer.innerHTML = "";


        if (roomList.length === 0) {

            noRoomsMessage.hidden = false;

            return;

        }


        noRoomsMessage.hidden = true;


        roomList.forEach(room => {

            const roomCard =
                document.createElement(
                    "article"
                );


            roomCard.className =
                "room-card";


            roomCard.innerHTML = `

                <div class="room-image">

                    <img
                        src="${room.image}"
                        alt="${room.name}"
                    >

                </div>


                <div class="room-card-content">

                    <p class="room-type">
                        ${formatRoomType(room.type)}
                    </p>

                    <h3>
                        ${room.name}
                    </h3>

                    <p class="room-description">
                        ${room.description}
                    </p>


                    <div class="room-details">

                        <span>
                            ${room.sizeText}
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


                    <div class="room-card-footer">

                        <div class="room-price">

                            <strong>
                                ₹${room.price.toLocaleString("en-IN")}
                            </strong>

                            <span>
                                / night
                            </span>

                        </div>


                        <div class="room-card-actions">

                            <button
                                type="button"
                                class="secondary-button view-room-button"
                                data-room-id="${room.id}"
                            >
                                View Details
                            </button>

                            <button
                                type="button"
                                class="primary-button select-room-button"
                                data-room-id="${room.id}"
                            >
                                Book Now
                            </button>

                        </div>

                    </div>

                </div>

            `;


            roomsContainer.appendChild(
                roomCard
            );

        });


        attachRoomButtons();

    }


    /* =========================================
       ROOM BUTTONS
       ========================================= */

    function attachRoomButtons() {

        const viewButtons =
            document.querySelectorAll(
                ".view-room-button"
            );


        viewButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const roomId =
                            Number(
                                button.dataset.roomId
                            );


                        const selectedRoom =
                            rooms.find(
                                room =>
                                    room.id === roomId
                            );


                        if (!selectedRoom) {
                            return;
                        }


                        localStorage.setItem(
                            "grandVistaSelectedRoom",
                            JSON.stringify(
                                selectedRoom
                            )
                        );


                        window.location.href =
                            `room-details.html?room=${roomId}`;

                    }
                );

            }
        );


        const selectButtons =
            document.querySelectorAll(
                ".select-room-button"
            );


        selectButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const roomId =
                            Number(
                                button.dataset.roomId
                            );


                        const selectedRoom =
                            rooms.find(
                                room =>
                                    room.id === roomId
                            );


                        if (!selectedRoom) {
                            return;
                        }


                        localStorage.setItem(
                            "grandVistaSelectedRoom",
                            JSON.stringify(
                                selectedRoom
                            )
                        );


                        window.location.href =
                            "booking.html";

                    }
                );

            }
        );

    }


    /* =========================================
       FORMAT DATE
       ========================================= */

    function formatDate(dateString) {

        if (!dateString) {
            return "-";
        }


        const date =
            new Date(
                dateString + "T00:00:00"
            );


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =========================================
       FORMAT ROOM TYPE
       ========================================= */

    function formatRoomType(type) {

        if (!type || type === "all") {
            return "All Rooms";
        }


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
       INITIAL DISPLAY
       ========================================= */

    renderRooms();

});