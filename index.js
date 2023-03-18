//
const form = document.querySelector("form");
const formFields = document.querySelectorAll("form input");

window.onload = () => {
  //const qrButton = document.querySelector(".show-qrcode");
  const fillButton = document.querySelector(".fill-form");
  //qrButton.addEventListener("click", showQRCode);
  fillButton.addEventListener("click", fillForm);
  form.addEventListener("input", handleInput);
  restoreForm();
};

/* function showQRCode() {
  console.log("that would need Webpack");
} */

function fillForm(event) {
  console.log(event);
  if (event.ctrlKey && event.shiftKey) {
    console.log("clearing form");
    formFields.forEach((field) => {
      field.value = "";
    });
  } else if (event.ctrlKey) {
    console.log("saving whole form to localStorage");
    saveToStorage();
  } else if (event.shiftKey) {
    console.log("clearing localStorage fields");
    const formData = localStorage.getItem("formData");
    localStorage.clear();
    localStorage.setItem("formData", formData);
  } else {
    console.log("filling form from localStorage");
    loadFromStorage();
  }
}

function saveToStorage() {
  const data = {};
  //const formFields = document.querySelectorAll("form input");
  formFields.forEach((field) => {
    data[field.id] = field.value;
  });
  console.log(data);
  localStorage.setItem("formData", JSON.stringify(data));
}

function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem("formData"));
  //const formFields = document.querySelectorAll("form input");
  formFields.forEach((field) => {
    const key = field.id;
    field.value = data[key];
  });
}

function handleInput(event) {
  console.log(event);
  console.log(event.target.value);
  localStorage.setItem(event.target.id, event.target.value);
}

function restoreForm() {
  formFields.forEach((field) => {
    const key = field.id;
    field.value = localStorage.getItem(key);
  });
}
