/* =========================================
   GRANDVISTA HOTEL
   Room Details Page
   ========================================= */

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
        image: "../images/rooms/deluxe-room.jpg",
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
        image: "../images/rooms/premium-room.jpg",
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
        image: "../images/rooms/executive-suite.jpg",
        description:
            "A spacious suite with separate living space and premium amenities."
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
   Display room
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
                class="primary-button"
            >
                Browse Rooms
            </a>

        </div>
    `;

} else {

    roomDetailsContainer.innerHTML = `

        <div class="room-details-card">

            <div class="room-details-image">

                <img
                    src="${selectedRoom.image}"
                    alt="${selectedRoom.name}"
                >

            </div>


            <div class="room-details-content">

                <p class="room-type">
                    ${formatRoomType(selectedRoom.type)}
                </p>

                <h2>
                    ${selectedRoom.name}
                </h2>

                <p class="room-details-description">
                    ${selectedRoom.description}
                </p>


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


                <div class="room-details-bottom">

                    <div>

                        <span>Starting from</span>

                        <strong>
                            ₹${selectedRoom.price.toLocaleString("en-IN")}
                        </strong>

                        <small>
                            per night
                        </small>

                    </div>


                    <a
                        href="booking.html"
                        class="primary-button"
                        onclick="saveRoomForBooking()"
                    >
                        Book This Room
                    </a>

                </div>

            </div>

        </div>

    `;

}


/*
   Save selected room for booking
*/

function saveRoomForBooking() {

    if (!selectedRoom) {
        return;
    }

    localStorage.setItem(
        "grandVistaSelectedRoom",
        JSON.stringify(selectedRoom)
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