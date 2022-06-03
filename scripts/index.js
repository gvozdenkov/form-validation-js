const formElement = document.querySelector(".form");
const inputElement = formElement.querySelector(".form__input");

function getErrorElement(inputElement) {
  return inputElement
    .closest(".form__field")
    .querySelector(".form__input-error");
}

function fixPlaceholder(inputElement) {
  const textLength = inputElement.value.length;
  if (textLength != 0) {
    inputElement
      .closest(".form__field")
      .querySelector(".form__placeholder")
      .classList.add("form__placeholder_is-fixed");
  }
}

function checkInputValidity() {
  fixPlaceholder(inputElement);
  !inputElement.validity.valid
    ? showInputError(inputElement)
    : hideInputError(inputElement);
}

function showInputError(inputElement) {
  inputElement.classList.add("form__input_type_error");
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(inputElement) {
  inputElement.classList.remove("form__input_type_error");
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

// ===============================================

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

inputElement.addEventListener("input", () => checkInputValidity());
