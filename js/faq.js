/* =========================================
   GRANDVISTA HOTEL
   FAQ Accordion
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqQuestions =
        document.querySelectorAll(".faq-question");


    if (!faqQuestions.length) {
        return;
    }


    faqQuestions.forEach((question) => {

        question.addEventListener("click", () => {

            const faqItem =
                question.closest(".faq-item");

            const isOpen =
                faqItem.classList.contains("active");


            document.querySelectorAll(".faq-item").forEach((item) => {

                item.classList.remove("active");

                const button =
                    item.querySelector(".faq-question");

                if (button) {
                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });


            if (!isOpen) {

                faqItem.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});