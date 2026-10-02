const roomDetailsContainer = document.getElementById("roomDetailsContainer");

const selectedRoom = JSON.parse(
    localStorage.getItem("grandVistaSelectedRoom")
);

if (!selectedRoom) {

    roomDetailsContainer.innerHTML = `
        <div class="room-details-empty">
            <h2>No Room Selected</h2>
            <p>Please select a room to view its details.</p>
            <a href="rooms.html" class="primary-button">
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

                <h2>${selectedRoom.name}</h2>

                <p class="room-details-description">
                    ${selectedRoom.description}
                </p>

                <div class="room-details-info">

                    <div>
                        <span>Room Size</span>
                        <strong>${selectedRoom.size}</strong>
                    </div>

                    <div>
                        <span>Guests</span>
                        <strong>Up to ${selectedRoom.guests}</strong>
                    </div>

                    <div>
                        <span>Bed</span>
                        <strong>${selectedRoom.bed}</strong>
                    </div>

                    <div>
                        <span>View</span>
                        <strong>${selectedRoom.view}</strong>
                    </div>

                </div>

                <div class="room-details-bottom">

                    <div>
                        <span>Starting from</span>
                        <strong>₹${selectedRoom.price.toLocaleString("en-IN")}</strong>
                        <small>per night</small>
                    </div>

                    <a href="booking.html" class="primary-button">
                        Book This Room
                    </a>

                </div>

            </div>

        </div>
    `;
}


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