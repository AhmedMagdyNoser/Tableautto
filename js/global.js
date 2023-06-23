// Prevent the context menu
document.addEventListener("contextmenu", e => {
    e.preventDefault();
})

// Header
let toggleButton = document.getElementById("toggle-menu");
toggleButton.onclick = () => {
    document.querySelector("header .container nav").classList.toggle("opened");
}

// Hide the header when scrolling down & Showing it when scrolling up
let lastScrollTop = 0;
let header = document.getElementById("header");
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset;
    if (scrollTop > lastScrollTop) {
        header.style.top = `-65px`;
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
})
