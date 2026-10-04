/* =========================================
   GRANDVISTA HOTEL
   Contact Form
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
        document.getElementById("contactForm");

    const contactSuccess =
        document.getElementById("contactSuccess");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();


        if (name.length < 2) {

            contactSuccess.textContent =
                "Please enter a valid name.";

            return;
        }


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            contactSuccess.textContent =
                "Please enter a valid email address.";

            return;
        }


        if (!/^\d{10}$/.test(phone)) {

            contactSuccess.textContent =
                "Please enter a valid 10-digit phone number.";

            return;
        }


        if (subject.length < 3) {

            contactSuccess.textContent =
                "Please enter a valid subject.";

            return;
        }


        if (message.length < 10) {

            contactSuccess.textContent =
                "Please enter a message with at least 10 characters.";

            return;
        }


        contactSuccess.textContent =
            "Thank you! Your message has been received.";

        contactForm.reset();

    });

});