/* =========================================
   GRANDVISTA HOTEL
   Gallery JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    if (!galleryItems.length) {
        return;
    }


    galleryItems.forEach((item) => {

        item.addEventListener("click", () => {

            const image =
                item.querySelector("img");

            if (!image) {
                return;
            }


            const overlay =
                document.createElement("div");

            overlay.className = "gallery-overlay";


            overlay.innerHTML = `
                <button
                    class="gallery-close"
                    type="button"
                    aria-label="Close image preview">
                    &times;
                </button>

                <img
                    src="${image.src}"
                    alt="${image.alt}">
            `;


            document.body.appendChild(overlay);


            const closeButton =
                overlay.querySelector(".gallery-close");


            const closeOverlay = () => {
                overlay.remove();
            };


            closeButton.addEventListener(
                "click",
                closeOverlay
            );


            overlay.addEventListener("click", (event) => {

                if (event.target === overlay) {
                    closeOverlay();
                }

            });

        });

    });

});