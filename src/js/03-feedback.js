import throttle from "lodash.throttle";

const STORAGE_KEY = "best-nikolay-key";

const refs = {
  form: document.querySelector(".feedback-form"),
  textarea: document.querySelector(".feedback-form textarea"),
  input: document.querySelector("input"),
};

let formData = {
  email: "",
  message: "",
};

refs.form.addEventListener("input", throttle(onTextareaInput, 500));
refs.form.addEventListener("submit", handleSubmit);

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const stringifiedData = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function handleSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData) {
    return;
  }

  const { email, message } = savedData;
  refs.textarea.value = message || "";
  refs.input.value = email || "";
  formData = { email: email || "", message: message || "" };
}

populateTextarea();