/* =========================================
   GRANDVISTA HOTEL
   Gallery JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryItems =
        Array.from(document.querySelectorAll(".gallery-item"));

    const filterButtons =
        document.querySelectorAll(".gallery-filter");

    const emptyMessage =
        document.getElementById("galleryEmptyMessage");


    if (!galleryItems.length) {
        return;
    }


    let visibleItems = galleryItems;
    let currentIndex = 0;


    /*
       Gallery filtering
    */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;


            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            visibleItems = galleryItems.filter(item => {

                if (category === "all") {
                    return true;
                }

                return item.dataset.category === category;

            });


            galleryItems.forEach(item => {

                item.hidden =
                    !visibleItems.includes(item);

            });


            if (emptyMessage) {

                emptyMessage.hidden =
                    visibleItems.length !== 0;

            }

        });

    });


    /*
       Open lightbox
    */

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const index =
                visibleItems.indexOf(item);


            if (index === -1) {
                return;
            }


            currentIndex = index;

            openLightbox();

        });

    });


    /*
       Create lightbox
    */

    function openLightbox() {

        const item =
            visibleItems[currentIndex];


        if (!item) {
            return;
        }


        const image =
            item.querySelector("img");


        if (!image) {
            return;
        }


        const caption =
            item.querySelector(".gallery-caption");


        const overlay =
            document.createElement("div");

        overlay.className =
            "gallery-overlay";


        overlay.innerHTML = `

            <button
                type="button"
                class="gallery-close"
                aria-label="Close image preview">
                &times;
            </button>


            <button
                type="button"
                class="gallery-prev"
                aria-label="Previous image">
                &#10094;
            </button>


            <div class="gallery-lightbox-content">

                <img
                    src="${image.src}"
                    alt="${image.alt}">

                <div class="gallery-lightbox-caption">

                    <strong>
                        ${caption ? caption.textContent : ""}
                    </strong>

                    <span>
                        ${currentIndex + 1} / ${visibleItems.length}
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="gallery-next"
                aria-label="Next image">
                &#10095;
            </button>

        `;


        document.body.appendChild(overlay);


        const closeButton =
            overlay.querySelector(".gallery-close");

        const previousButton =
            overlay.querySelector(".gallery-prev");

        const nextButton =
            overlay.querySelector(".gallery-next");


        /*
           Close lightbox
        */

        function closeOverlay() {

            overlay.remove();

            document.removeEventListener(
                "keydown",
                handleKeyboard
            );

        }


        /*
           Previous image
        */

        previousButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                currentIndex--;

                if (currentIndex < 0) {
                    currentIndex =
                        visibleItems.length - 1;
                }

                updateLightbox();

            }
        );


        /*
           Next image
        */

        nextButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                currentIndex++;

                if (currentIndex >= visibleItems.length) {
                    currentIndex = 0;
                }

                updateLightbox();

            }
        );


        /*
           Close button
        */

        closeButton.addEventListener(
            "click",
            closeOverlay
        );


        /*
           Click outside image
        */

        overlay.addEventListener(
            "click",
            event => {

                if (event.target === overlay) {
                    closeOverlay();
                }

            }
        );


        /*
           Keyboard navigation
        */

        function handleKeyboard(event) {

            if (event.key === "Escape") {
                closeOverlay();
            }

            if (event.key === "ArrowLeft") {

                currentIndex--;

                if (currentIndex < 0) {
                    currentIndex =
                        visibleItems.length - 1;
                }

                updateLightbox();

            }

            if (event.key === "ArrowRight") {

                currentIndex++;

                if (currentIndex >= visibleItems.length) {
                    currentIndex = 0;
                }

                updateLightbox();

            }

        }


        document.addEventListener(
            "keydown",
            handleKeyboard
        );


        /*
           Update displayed image
        */

        function updateLightbox() {

            const currentItem =
                visibleItems[currentIndex];


            if (!currentItem) {
                return;
            }


            const currentImage =
                currentItem.querySelector("img");

            const currentCaption =
                currentItem.querySelector(".gallery-caption");


            const lightboxImage =
                overlay.querySelector(
                    ".gallery-lightbox-content img"
                );

            const lightboxCaption =
                overlay.querySelector(
                    ".gallery-lightbox-caption"
                );


            lightboxImage.src =
                currentImage.src;

            lightboxImage.alt =
                currentImage.alt;


            lightboxCaption.innerHTML = `

                <strong>
                    ${currentCaption
                        ? currentCaption.textContent
                        : ""}
                </strong>

                <span>
                    ${currentIndex + 1} / ${visibleItems.length}
                </span>

            `;

        }

    }

});