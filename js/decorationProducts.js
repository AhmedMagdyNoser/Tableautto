// Create a Slide Show to Landing
let landing = document.querySelector(".decoration-landing");
let landingImageNum = 2;

setInterval(() => {
  landing.style.backgroundImage = `url(imgs/decoration/landing${landingImageNum}.jpg)`;
  (landingImageNum < 3) ? landingImageNum++ : landingImageNum = 1;
}, 5000); 

let cards = document.querySelectorAll(".products .container .card");

// change background (overlay div) for each card
cards.forEach(element => {
  element.firstElementChild.style.backgroundImage = `url(${element.firstElementChild.nextElementSibling.getAttribute("src")})`;
})

// show cards on scroll 
showObjectsIfOnScreen(cards)
window.addEventListener("scroll", () => {
  showObjectsIfOnScreen(cards)
});

function showObjectsIfOnScreen(objects) { // objects is an array of HTML elements
  objects.forEach(element => {
    if (window.pageYOffset + window.innerHeight > element.offsetTop) { // when scrolling into an element
      element.style.opacity = "1";
    }
  });
}