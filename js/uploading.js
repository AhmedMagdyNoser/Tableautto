// Uploading Section Variables
let uploadingForm = document.querySelector(".uploading form");
let fileInput = document.querySelector(".uploading form input");
let qualityNote = document.querySelector(".uploading .quality-note");
let progressArea = document.querySelector(".uploading .progress-area");
let uploadedArea = document.querySelector(".uploading .uploaded-area");
let continueButton = document.querySelector(".uploading .container .continue-button");
let extentionPrompt = document.querySelector(".uploading .container .extention-prompt");
let replacementPrompt = document.querySelector(".uploading .container .replacement-prompt");
let replacementYes = document.querySelector(".uploading .container .replacement-prompt .options .yes-replace");
let replacementNo = document.querySelector(".uploading .container .replacement-prompt .options .no-replace");
let inBuffer = false;

// Make the form clickable to upload a file
uploadingForm.addEventListener("click", () => { // The same as uploadingForm.onclick = () => { ... }
  if (inBuffer) { // if another photo is uploaded show the prompt message
    replacementPrompt.style.display = "block"; // The prompt message will appeare
    replacementYes.onclick = () => {
      fileInput.click();
      replacementPrompt.style.display = "none"; // The prompt message will disappeare
    }
    replacementNo.onclick = () => {
      replacementPrompt.style.display = "none"; // The prompt message will disappeare
    }
  } else {
    fileInput.click();
  }
});

fileInput.onchange = event => {
  let file = event.target.files[0]; // [0] means that if user has selected multiples files then get first one only
  let fileName = file.name;
  let fileSize = 0;
  if (/jpg$|png$/i.test(fileName)) { // $ means that jpg (or png) is at the end of the file name.
    if (file) { // if file is selected
      // calculate fileSize from file.size
      if (file.size >= 1024 * 1024) {
        fileSize = `${Math.round((file.size / 1024 / 1024) * 100) / 100} MB`;
      } else if (file.size < 1024 * 1024 && file.size >= 1024) {
        fileSize = `${Math.round((file.size / 1024) * 100) / 100} KB`;
      } else {
        fileSize = `${file.size} B`;
      }
      // just as a flag that a photo is uploaded
      inBuffer = true;
      // upload the photo as a frontend on html
      uploadFile(fileName, fileSize);
    }
    if (extentionPrompt.style.display = "block") {
      extentionPrompt.style.display = "none"
    }
  } else { // if the photo is not jpg or png
    extentionPrompt.style.display = "block";
  }
  // at the end of the page:
  updateOrderDetails(selectedSize);
}

function uploadFile(fileName, fileSize) {
  qualityNote.innerHTML = `<div class="row">
                              <i class="fa-solid fa-circle-exclamation"></i>
                              <p>Ensure that the photo you upload is of excellent quality!</p>
                            </div>`;
  progressArea.innerHTML = `<div class="row">
                              <i class="fas fa-file-alt"></i>
                              <div class="content">
                                  <div class="details">
                                    <div class="name">${fileName} • Uploading</div>
                                    <div class="percent">0%</div>
                                  </div>
                                  <div class="progress-bar">
                                    <div id="progress" class="progress"></div>
                                  </div>
                              </div>
                            </div>`;
  progressPercent = progressArea.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.lastElementChild;
  progressPercentAnimation(progressPercent, 100, 50, fileName, fileSize);
  document.querySelector("#progress").style.width = "100%"; // uploading progress animation
}

function progressPercentAnimation(changingElement, target, speed, fileName, fileSize) {
  const updateCount = () => {
    const count = parseInt(changingElement.innerText);
    const increment = Math.trunc(target / speed);
    if (count < target) {
      changingElement.innerText = (count + increment) + "%";
      setTimeout(updateCount, 50);
    } else {
      // upload is completed
      changingElement.innerText = target + "%";
      makeItDone(fileName, fileSize);
    }
  };
  updateCount();
}

function makeItDone(fileName, fileSize) {
  progressArea.innerHTML = ` `;
  uploadedArea.innerHTML = `<div class="row">
                              <i class="fas fa-file-alt"></i>
                              <div class="content">
                                  <div class="name">${fileName} • Uploaded</div>
                                  <div class="size">${fileSize}</div>
                              </div>
                              <i class="fas fa-check uploaded-check"></i>
                            </div>`;
  continueButton.style.display = "block";
}


// ========================================================================================
// ========================================================================================
// Activate the selected tableau size
// ========================================================================================
// ========================================================================================


let isSizeSelected = false;
let selectedSize = undefined;
let allSizes = document.querySelectorAll(".size-selection .container .sizes .box");

allSizes.forEach(e => {
  e.onclick = () => {
    allSizes.forEach(e => {
      e.classList.remove("size-selected");
    });
    e.classList.add("size-selected");
    isSizeSelected = true;
    selectedSize = e.lastElementChild.innerHTML.replaceAll(" ", "");
    updateOrderDetails(selectedSize);
    // also we call this function with the same variable when uploading "fileInput.onchange"
  }
});


// ========================================================================================
// ========================================================================================
// Update "Order Now" Section
// ========================================================================================
// ========================================================================================


let orderDetails = document.getElementById("order-details");

function updateOrderDetails(sizeElement) {
  if (inBuffer && !isSizeSelected) {
    orderDetails.innerHTML = `you have uploaded a photo. please select the size of your tableau.`;
  } else if (!inBuffer && isSizeSelected) {
    orderDetails.innerHTML = `you have selected the size <b>${sizeElement}</b> for your tableau. please upload a photo.`;
  } else if (inBuffer && isSizeSelected) {
    document.getElementById("order-now-button").removeAttribute("disabled");
    orderDetails.innerHTML = `you have uploaded a photo and selected the size <b>${sizeElement}</b> for your tableau.`;
  }
}