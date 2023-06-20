// Create a Slide Show to Landing
let landing = document.querySelector(".home-landing");
let landingImageNum = 2;

setInterval(() => {
    landing.style.backgroundImage = `url(imgs/landing${landingImageNum}.jpg)`;
    landing.style.backgroundSize = "cover";
    (landingImageNum < 3) ? landingImageNum++ : landingImageNum = 1;
}, 5000);

// ------------------------------------------------------------

// Create an Animation on Scrolling to Best Selling Section
let bestSellingSection = document.querySelector(".best-selling");
let salesValuesProgress = document.querySelectorAll(".best-selling .container .text-box .service .progress-bar .progress-value");
let salesValuesLabels = document.querySelectorAll(".best-selling .container .text-box .service  .service-name span");
let isBestSellingReached = false;
window.addEventListener("scroll", () => {
    if (!isBestSellingReached) {
        if (window.pageYOffset + window.innerHeight * (2 / 3) > bestSellingSection.offsetTop) { // when scrolling into the section
            for (let i = 0; i < salesValuesLabels.length; i++) {
                salesValuesProgress[i].style.width = `${salesValuesProgress[i].dataset.progress}%`;
                salesValuesLabelsAnimation(salesValuesLabels[i], salesValuesProgress[i].dataset.progress * 75, 150);
                document.querySelector(".best-selling .container .img-box img").style.opacity = "1"; //transition of the image
                document.querySelector(".best-selling .container .img-box img").style.transform = "translateY(0px)"; //transition of the image
            }
            isBestSellingReached = true; // to stop checking for it again
        }
    }
});
    
function salesValuesLabelsAnimation(changingItem, target, speed) {
        const updateCount = () => {
            const count = parseInt(changingItem.innerText);
            const increment = Math.trunc(target / speed);
            if (count < target) {
                changingItem.innerText = (count + increment) + "$";
                setTimeout(updateCount, 1);
            } else {
                changingItem.innerText = target + "$";
            }
        };
        updateCount();
}

// ------------------------------------------------------------

// (element).offsetTop ... The position of that element in the page (in pixels from top).
// (element).offsetHeight ... The Height of that element (in pixels).
// window.pageYoffset ... The position of the scrolling in the page (in pixels from top).
// window.innerHeight ... The height of the window (in pixels).

// You can also use this condition instead : if (window.pageYOffset > (bestSellingSection.offsetTop +  bestSellingSection.offsetHeight - window.innerHeight) && !reached )
// Da lw 3ayez el section kolh ykon zahr ... laken el fo2 just awel el section ywsal telt el 4a4h men t7t.

// Dy Gamila brdo:
// document.querySelector(".size-selection").scrollIntoView();

// ------------------------------------------------------------

let timelineSection = document.querySelector(".timeline");
let timelineContent = document.querySelectorAll(".timeline .content");

window.addEventListener("scroll", () => {
    if (window.pageYOffset + window.innerHeight * (2 / 3) > timelineSection.offsetTop) { // when scrolling into the section
        timelineContent.forEach(element => {
            element.style.transform = "translateY(0)";
            element.style.opacity = "1";
        });
    }
});