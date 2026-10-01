/* =========================================
   GRANDVISTA HOTEL
   Rooms Page
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const roomsContainer = document.getElementById("roomsContainer");

    const noRoomsMessage = document.getElementById("noRoomsMessage");

    const showAllRoomsButton = document.getElementById("showAllRooms");


    /*
       Hotel room data
    */

    const rooms = [

        {
            id: 1,
            name: "Deluxe Room",
            type: "deluxe",
            price: 5000,
            size: "350 sq.ft.",
            guests: 2,
            bed: "King Bed",
            view: "City View",
            image: "../images/hotel/deluxe-room.jpg",
            description:
                "A comfortable room with modern amenities and a relaxing city view."
        },

        {
            id: 2,
            name: "Premium Room",
            type: "premium",
            price: 7000,
            size: "450 sq.ft.",
            guests: 3,
            bed: "King Bed",
            view: "Garden View",
            image: "../images/hotel/premium-room.jpg",
            description:
                "A spacious room designed for guests looking for extra comfort and space."
        },

        {
            id: 3,
            name: "Executive Suite",
            type: "suite",
            price: 10000,
            size: "650 sq.ft.",
            guests: 4,
            bed: "King Bed",
            view: "Panoramic View",
            image: "../images/hotel/executive-suite.jpg",
            description:
                "A spacious suite with separate living space and premium amenities."
        }

    ];


    /*
       Get booking search data
    */

    const savedSearch =
        localStorage.getItem("grandVistaBookingSearch");


    let bookingSearch = null;


    if (savedSearch) {

        try {

            bookingSearch = JSON.parse(savedSearch);

        } catch (error) {

            console.error(
                "Unable to read booking search data.",
                error
            );

        }

    }


    /*
       Display booking information
    */

    if (bookingSearch) {

        document.getElementById("displayCheckIn").textContent =
            formatDate(bookingSearch.checkIn);

        document.getElementById("displayCheckOut").textContent =
            formatDate(bookingSearch.checkOut);

        const totalGuests =
            Number(bookingSearch.adults || 0) +
            Number(bookingSearch.children || 0);

        document.getElementById("displayGuests").textContent =
            `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""}`;

        document.getElementById("displayRooms").textContent =
            bookingSearch.rooms;

        document.getElementById("displayRoomType").textContent =
            formatRoomType(bookingSearch.roomType);

    }


    /*
       Filter rooms
    */

    let filteredRooms = rooms;


    if (
        bookingSearch &&
        bookingSearch.roomType &&
        bookingSearch.roomType !== "all"
    ) {

        filteredRooms = rooms.filter(
            room => room.type === bookingSearch.roomType
        );

    }


    /*
       Display rooms
    */

    displayRooms(filteredRooms);


    /*
       Show all rooms
    */

    if (showAllRoomsButton) {

        showAllRoomsButton.addEventListener(
            "click",
            () => {

                noRoomsMessage.hidden = true;

                displayRooms(rooms);

            }
        );

    }


    /*
       Format date
    */

    function formatDate(dateString) {

        if (!dateString) {
            return "-";
        }

        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /*
       Format room type
    */

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


    /*
       Display room cards
    */

    function displayRooms(roomList) {

        roomsContainer.innerHTML = "";


        if (roomList.length === 0) {

            noRoomsMessage.hidden = false;

            return;

        }


        noRoomsMessage.hidden = true;


        roomList.forEach(room => {

            const roomCard =
                document.createElement("article");

            roomCard.className = "room-card";


            roomCard.innerHTML = `

                <div class="room-image">

                    <img
                        src="${room.image}"
                        alt="${room.name}"
                        onerror="this.style.display='none'"
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


                    <div class="room-card-footer">

                        <div class="room-price">

                            <strong>
                                ₹${room.price.toLocaleString("en-IN")}
                            </strong>

                            <span>
                                / night
                            </span>

                        </div>


                        <button
                            type="button"
                            class="primary-button select-room-button"
                            data-room-id="${room.id}">

                            Select Room

                        </button>

                    </div>

                </div>

            `;


            roomsContainer.appendChild(roomCard);

        });


        /*
           Select room buttons
        */

        const selectButtons =
            document.querySelectorAll(
                ".select-room-button"
            );


        selectButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const roomId =
                        Number(button.dataset.roomId);

                    const selectedRoom =
                        rooms.find(
                            room => room.id === roomId
                        );


                    if (!selectedRoom) {
                        return;
                    }


                    localStorage.setItem(
                        "grandVistaSelectedRoom",
                        JSON.stringify(selectedRoom)
                    );


                    window.location.href =
                        "booking.html";

                }
            );

        });

    }

});