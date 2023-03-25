//
const form = document.querySelector("form");
const formFields = document.querySelectorAll("form input");
const submitButton = document.querySelector('button[type="submit"]');

const reservedEmails = ["aaa@bbb", "ccc@ddd", "eee@fff"];

window.onload = () => {
  //autofill button
  const fillButton = document.querySelector(".fill-form");
  fillButton.addEventListener("click", fillForm);

  //autosave mechanism
  restoreForm();

  form.addEventListener("input", (event) => {
    const field = event.target;
    validateInput(field);
    autoSaveInput(event);
  });

  form.addEventListener("submit", (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      alert("Success!!");
    }
  });

  formFields.forEach((field) => {
    field.addEventListener("focus", reportInput);
  });

  validateForm();
};

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
    formFields.forEach((field) => {
      const key = field.id;
      localStorage.removeItem(key);
    });
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
    /* if (field.type === "checkbox") {
      // field.checked =
    } */
  });
}

function autoSaveInput(event) {
  const value =
    event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
  localStorage.setItem(event.target.id, value);
}

function restoreForm() {
  formFields.forEach((field) => {
    const key = field.id;
    const isCheckbox = field.type === "checkbox";
    if (isCheckbox) {
      field.checked = JSON.parse(localStorage.getItem(key));
    } else {
      field.value = localStorage.getItem(key);
    }
  });
  //form.reportValidity();
}

function validateInput(field) {
  console.log("instant validation");
  const inputField = field;
  const inputId = field.id;
  //const fieldIsValid = inputField.validity.valid;
  //console.log({ inputField });
  //console.log({ inputId });
  inputField.setCustomValidity("");

  switch (inputId) {
    case "name":
      if (inputField.validity.tooLong) {
        inputField.setCustomValidity(
          "Sorry, this seems to be unreasonably long."
        );
        inputField.reportValidity();
      } else if (inputField.value.match(/[^A-Za-z\s]/)) {
        inputField.setCustomValidity(
          "Sorry, no punctuation or numbers please."
        );
        inputField.reportValidity();
      }
      console.log("validating name");
      console.log(inputField.validity.valid);
      break;

    case "email":
      if (inputField.validity.tooLong) {
        inputField.setCustomValidity(
          "Sorry, this seems to be unreasonably long."
        );
        inputField.reportValidity();
      } else if (reservedEmails.includes(inputField.value)) {
        inputField.setCustomValidity(
          "Sorry, this email is already used by someone."
        );
        inputField.reportValidity();
      }
      console.log("validating email");
      console.log(inputField.validity.valid);
      break;

    case "phone":
      if (inputField.validity.tooLong) {
        inputField.setCustomValidity(
          "Sorry, this seems to be unreasonably long."
        );
        inputField.reportValidity();
      } else if (inputField.value.match(/[^\s\d\(\)\-]/)) {
        inputField.setCustomValidity(
          "Sorry, digits, brackets and dashes only."
        );
        inputField.reportValidity();
      }
      console.log("validating phone");
      console.log(inputField.validity.valid);
      break;

    case "password":
      if (inputField.validity.tooLong) {
        inputField.setCustomValidity(
          "Sorry, this seems to be unreasonably long."
        );
        inputField.reportValidity();
      } else if (inputField.validity.tooShort) {
        inputField.setCustomValidity("At least 8 characters please.");
        inputField.reportValidity();
      } else if (!inputField.value.match(/[A-Z]/)) {
        inputField.setCustomValidity("Please include some uppercase letters.");
        inputField.reportValidity();
      } else if (!inputField.value.match(/[a-z]/)) {
        inputField.setCustomValidity("Please include some lowercase letters.");
        inputField.reportValidity();
      } else if (!inputField.value.match(/[0-9]/)) {
        inputField.setCustomValidity("Please include some digits.");
        inputField.reportValidity();
      }
      console.log("validating password");
      console.log(inputField.validity.valid);
      break;

    case "password2":
      const password1 = document.querySelector("#password");
      if (inputField.value !== password1.value && inputField.required) {
        inputField.setCustomValidity("Passwords do not match.");
        inputField.reportValidity();
      }
      console.log("validating password");
      console.log(inputField.validity.valid);
      break;

    case "hide-password":
      const password1Input = document.querySelector("#password");
      const password2Input = document.querySelector("#password2");
      const password2Block = document
        .querySelector("#password2")
        .closest("li.form-field");
      if (inputField.checked) {
        password1Input.type = "password";
        password2Block.style = "display: grid";
        password2Input.required = true;
        validateInput(password2Input);
      } else {
        password1Input.type = "text";
        password2Block.style = "display: none";
        password2Input.required = false;
        password2Input.value = "";
        password2Input.setCustomValidity("");
      }
      console.log("hiding or showing password");
      break;

    default:
      break;
  }
  submitButtonIndication();
}

function submitButtonIndication() {
  if (form.checkValidity()) {
    submitButton.classList.add("ready-to-submit");
  } else {
    submitButton.classList.remove("ready-to-submit");
  }
}

function validateForm() {
  formFields.forEach((field) => {
    if (field.value) {
      validateInput(field);
    }
  });
}

function reportInput(event) {
  console.log("report input");
  const field = event.target;
  if (!field.validity.valid && field.value !== "") {
    field.reportValidity();
  }
}
