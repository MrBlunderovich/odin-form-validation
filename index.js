//
window.onload = () => {
  //const qrButton = document.querySelector(".show-qrcode");
  const fillButton = document.querySelector(".fill-form");
  //qrButton.addEventListener("click", showQRCode);
  fillButton.addEventListener("click", fillForm);
};

/* function showQRCode() {
  console.log("that would need Webpack");
} */

function fillForm(event) {
  console.log(event);
  if (event.ctrlKey) {
    console.log("save form to localStorage");
  } else {
    console.log("fill form from localStorage");
  }
}
