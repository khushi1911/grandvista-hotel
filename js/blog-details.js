/* =========================================
   GRANDVISTA HOTEL
   Blog Details
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("blogDetailsContainer");

    if (!container) {
        return;
    }


    const posts = {

        1: {
            category: "Travel",
            title: "Planning a Relaxing Hotel Stay",
            image: "../images/hotel/intro.jpg",
            content: `
                <p>
                    A comfortable hotel stay starts with a little
                    planning. Choosing the right room, checking the
                    available facilities and planning your activities
                    can make your visit more enjoyable.
                </p>

                <p>
                    Take some time to explore the hotel's dining,
                    wellness and recreational facilities. A balanced
                    plan can help you enjoy your stay without feeling
                    rushed.
                </p>

                <p>
                    Most importantly, leave some time to relax and
                    enjoy the surroundings at your own pace.
                </p>
            `
        },


        2: {
            category: "Dining",
            title: "Making the Most of Hotel Dining",
            image: "../images/dining/food.jpg",
            content: `
                <p>
                    Hotel dining can be an easy and enjoyable part
                    of your stay. Exploring the restaurant menu gives
                    you an opportunity to discover different dishes
                    in a comfortable setting.
                </p>

                <p>
                    Whether you prefer a relaxed lunch or an elegant
                    dinner, taking time to enjoy your meal can make
                    the overall hotel experience more memorable.
                </p>

                <p>
                    You can also explore the hotel's dining options
                    and choose an experience that suits your plans.
                </p>
            `
        },


        3: {
            category: "Wellness",
            title: "Creating Time to Unwind",
            image: "../images/gallery/pool.jpg",
            content: `
                <p>
                    A hotel stay can be a good opportunity to slow
                    down and take a break from a busy routine.
                </p>

                <p>
                    Spending time in relaxing spaces such as a pool,
                    spa or comfortable lounge can help create a more
                    enjoyable travel experience.
                </p>

                <p>
                    Even a short period of quiet time can make your
                    stay feel more balanced and refreshing.
                </p>
            `
        },


        4: {
            category: "Events",
            title: "Planning a Memorable Celebration",
            image: "../images/events/banquet.jpg",
            content: `
                <p>
                    Choosing the right space is an important part of
                    planning a celebration. A comfortable setting can
                    help guests enjoy the occasion.
                </p>

                <p>
                    Consider the type of event, number of guests and
                    activities you want to include when planning your
                    gathering.
                </p>

                <p>
                    With thoughtful planning and suitable event
                    support, special occasions can become memorable
                    experiences for everyone involved.
                </p>
            `
        }

    };


    const params =
        new URLSearchParams(window.location.search);

    const postId =
        params.get("post");

    const selectedPost =
        posts[postId];


    if (!selectedPost) {

        container.innerHTML = `
            <div class="blog-details-empty">

                <h2>
                    Article Not Found
                </h2>

                <p>
                    The blog article you are looking for
                    could not be found.
                </p>

                <a
                    href="blog.html"
                    class="primary-button"
                >
                    Back to Blog
                </a>

            </div>
        `;

        return;
    }


    container.innerHTML = `

        <article class="blog-details-card">

            <div class="blog-details-image">

                <img
                    src="${selectedPost.image}"
                    alt="${selectedPost.title}"
                >

            </div>


            <div class="blog-details-content">

                <p class="section-label">
                    ${selectedPost.category}
                </p>

                <h2>
                    ${selectedPost.title}
                </h2>

                <div class="blog-details-text">
                    ${selectedPost.content}
                </div>

                <a
                    href="blog.html"
                    class="secondary-button"
                >
                    ← Back to Blog
                </a>

            </div>

        </article>

    `;

});