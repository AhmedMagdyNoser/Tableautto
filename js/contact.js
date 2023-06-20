let contactLanding = document.querySelector("main.contact-landing .container ");
let cards = document.querySelectorAll(".cards .container .card");

showAndUp(contactLanding);
showAndUp(cards[0]);
showAndUp(cards[1]);

function showAndUp(element) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
}
