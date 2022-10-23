const slider = document.querySelector(".slider");
const pages = slider.querySelector(".slider__pages");
const prevBtn = slider.querySelector(".slider__prev");
const nextBtn = slider.querySelector(".slider__next");
const dotContainer = slider.querySelector(".slider__dots");

pages.style.width = `${pages.childElementCount}00%`; // Adjust width by number of elems
slider.pages = pages.childElementCount; // Quantity of pages
slider.currentPage = 0;

// Create dots by number of pages
for (let i = 0; i < slider.pages; i++) {
    let dot = document.createElement("div");
    dot.classList.add("slider__dots__dot");
    dot.dataset.number = i;

    if (i == 0) {
        dot.classList.add("slider__dots__dot--active");
    }

    dotContainer.appendChild(dot);
}

// Event for dots
dotContainer.addEventListener("click", (e) => {
    let elem = e.target;
    if (elem.classList.contains("slider__dots__dot")) {
        goToPage(elem.dataset.number)
    }
})

// Next page
nextBtn.addEventListener("click", () => {
    slider.currentPage++;
    goToPage(slider.currentPage);
});

// Prev page
prevBtn.addEventListener("click", () => {
    slider.currentPage--;
    goToPage(slider.currentPage);
});

// Grab
let grab = {
    start: 0,
    end: 0,
}

pages.addEventListener("mousedown", (event) => {
    let isSliderPage = event.target.classList.contains("slider__pages__page");
    if (isSliderPage && event.buttons == 1) {
        grab.start = event.clientX;
    }
})

pages.addEventListener("click", (event) => {
    let isSliderPage = event.target.classList.contains("slider__pages__page");
    if (isSliderPage) {
        grab.end = event.clientX;
        let distance = grab.end - grab.start;
        let breakpoint = slider.clientWidth / 4; // 25% of elem

        if (distance > breakpoint) {
            slider.currentPage--;
        }

        if (distance < -(breakpoint)) {
            slider.currentPage++;
        }

        goToPage(slider.currentPage);
    }
})

// Go to desired page
function goToPage(page) {

    //Check page
    // Page underflow
    if (page < 0) {
        page = slider.pages - 1;
        slider.currentPage = page;
    }
    // Page overflow
    if (page >= slider.pages) {
        page = 0;
        slider.currentPage = page;
    }

    //Update dots
    let dots = dotContainer.querySelectorAll(".slider__dots__dot");

    dots.forEach((dot, index) => {
        if (index == page) {
            dot.classList.add("slider__dots__dot--active");
        } else {
            dot.classList.remove("slider__dots__dot--active");
        }
    });

    // Move slider
    pages.style.transform = `translateX(${-(100 / slider.pages * page)}%)`;
}