/* =========================================
   GRANDVISTA HOTEL
   Room Details Page
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const roomDetailsContainer =
        document.getElementById("roomDetailsContainer");


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
            rating: 4.5,
            availability: "Available",
            image: "../images/rooms/deluxe-room.jpg",
            description:
                "A comfortable room with modern amenities and a relaxing city view.",
            amenities: [
                "King Bed",
                "Air Conditioning",
                "Smart TV",
                "Free Wi-Fi",
                "Mini Refrigerator",
                "Tea & Coffee Maker",
                "Safety Locker",
                "Hair Dryer",
                "Work Desk",
                "Room Service"
            ]
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
            rating: 4.7,
            availability: "Limited",
            image: "../images/rooms/premium-room.jpg",
            description:
                "A spacious room designed for guests looking for extra comfort and space.",
            amenities: [
                "King Bed",
                "Air Conditioning",
                "Smart TV",
                "Free Wi-Fi",
                "Mini Refrigerator",
                "Tea & Coffee Maker",
                "Safety Locker",
                "Hair Dryer",
                "Work Desk",
                "Room Service"
            ]
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
            rating: 4.9,
            availability: "Available",
            image: "../images/rooms/executive-suite.jpg",
            description:
                "A spacious suite with separate living space and premium amenities.",
            amenities: [
                "King Bed",
                "Air Conditioning",
                "Smart TV",
                "Free Wi-Fi",
                "Mini Refrigerator",
                "Tea & Coffee Maker",
                "Safety Locker",
                "Hair Dryer",
                "Work Desk",
                "Room Service"
            ]
        }

    ];


    /*
       Get room ID from URL
    */

    const urlParams =
        new URLSearchParams(window.location.search);

    const roomId =
        Number(urlParams.get("room"));


    /*
       Find selected room
    */

    const selectedRoom =
        rooms.find(room => room.id === roomId);


    /*
       Handle invalid room
    */

    if (!selectedRoom) {

        roomDetailsContainer.innerHTML = `

            <div class="room-details-empty">

                <h2>No Room Selected</h2>

                <p>
                    Please select a room to view its details.
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
       Save selected room
    */

    localStorage.setItem(
        "grandVistaSelectedRoom",
        JSON.stringify(selectedRoom)
    );


    /*
       Display selected room
    */

    roomDetailsContainer.innerHTML = `

        <div class="room-details-card">


            <!-- ROOM IMAGE -->

            <div class="room-details-image">

                <img
                    id="mainRoomImage"
                    src="${selectedRoom.image}"
                    alt="${selectedRoom.name}"
                >

            </div>


            <!-- ROOM CONTENT -->

            <div class="room-details-content">

                <div class="room-details-heading">

                    <div>

                        <p class="room-type">
                            ${formatRoomType(selectedRoom.type)}
                        </p>

                        <h2>
                            ${selectedRoom.name}
                        </h2>

                    </div>

                    <div class="room-rating">

                        <strong>
                            ★ ${selectedRoom.rating}
                        </strong>

                        <span>
                            Guest Rating
                        </span>

                    </div>

                </div>


                <p class="room-details-description">
                    ${selectedRoom.description}
                </p>


                <!-- ROOM INFORMATION -->

                <div class="room-details-info">

                    <div>

                        <span>Room Size</span>

                        <strong>
                            ${selectedRoom.size}
                        </strong>

                    </div>

                    <div>

                        <span>Guests</span>

                        <strong>
                            Up to ${selectedRoom.guests}
                        </strong>

                    </div>

                    <div>

                        <span>Bed</span>

                        <strong>
                            ${selectedRoom.bed}
                        </strong>

                    </div>

                    <div>

                        <span>View</span>

                        <strong>
                            ${selectedRoom.view}
                        </strong>

                    </div>

                </div>


                <!-- AVAILABILITY -->

                <div class="room-availability">

                    <span>
                        Availability
                    </span>

                    <strong class="${selectedRoom.availability
                        .toLowerCase()
                        .replace(" ", "-")}">

                        ${selectedRoom.availability}

                    </strong>

                </div>


                <!-- PRICE -->

                <div class="room-details-bottom">

                    <div>

                        <span>
                            Starting from
                        </span>

                        <strong>
                            ₹${selectedRoom.price.toLocaleString("en-IN")}
                        </strong>

                        <small>
                            per night
                        </small>

                    </div>


                    <button
                        type="button"
                        class="primary-button"
                        id="bookRoomButton">

                        Book This Room

                    </button>

                </div>

            </div>

        </div>


        <!-- ================================
             AMENITIES
             ================================ -->

        <section class="room-info-section">

            <div class="section-heading">

                <p class="section-label">
                    ROOM FEATURES
                </p>

                <h2>
                    Room Amenities
                </h2>

                <p>
                    Everything you need for a comfortable stay.
                </p>

            </div>


            <div class="room-amenities-grid">

                ${selectedRoom.amenities.map(amenity => `

                    <div class="room-amenity">

                        <span>✓</span>

                        <p>
                            ${amenity}
                        </p>

                    </div>

                `).join("")}

            </div>

        </section>


        <!-- ================================
             POLICIES
             ================================ -->

        <section class="room-info-section room-policies">

            <div class="section-heading">

                <p class="section-label">
                    BEFORE YOU STAY
                </p>

                <h2>
                    Room Policies
                </h2>

            </div>


            <div class="policies-grid">

                <div>

                    <strong>
                        Check-in
                    </strong>

                    <p>
                        From 2:00 PM
                    </p>

                </div>

                <div>

                    <strong>
                        Check-out
                    </strong>

                    <p>
                        Until 12:00 PM
                    </p>

                </div>

                <div>

                    <strong>
                        Children
                    </strong>

                    <p>
                        Children are welcome.
                    </p>

                </div>

                <div>

                    <strong>
                        Smoking
                    </strong>

                    <p>
                        Smoking is not permitted in rooms.
                    </p>

                </div>

            </div>

            <p class="demo-note">
                Hotel policies and room information shown here
                are fictional demo content for this project.
            </p>

        </section>


        <!-- ================================
             BOOKING CTA
             ================================ -->

        <section class="room-booking-cta">

            <div>

                <p class="section-label">
                    PLAN YOUR STAY
                </p>

                <h2>
                    Ready to stay at GrandVista?
                </h2>

                <p>
                    Select your dates and complete your booking request.
                </p>

            </div>

            <button
                type="button"
                class="primary-button"
                id="bottomBookButton">

                Book This Room

            </button>

        </section>

    `;


    /*
       Booking buttons
    */

    const bookRoomButton =
        document.getElementById("bookRoomButton");

    const bottomBookButton =
        document.getElementById("bottomBookButton");


    function goToBooking() {

        localStorage.setItem(
            "grandVistaSelectedRoom",
            JSON.stringify(selectedRoom)
        );

        window.location.href = "booking.html";

    }


    if (bookRoomButton) {

        bookRoomButton.addEventListener(
            "click",
            goToBooking
        );

    }


    if (bottomBookButton) {

        bottomBookButton.addEventListener(
            "click",
            goToBooking
        );

    }


    /*
       Format room type
    */

    function formatRoomType(type) {

        if (type === "deluxe") {
            return "Deluxe Room";
        }

        if (type === "premium") {
            return "Premium Room";
        }

        if (type === "suite") {
            return "Executive Suite";
        }

        return "Hotel Room";

    }

});