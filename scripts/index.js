const formElement = document.querySelector(".form");
const inputElement = formElement.querySelector(".form__input");

// ================= utils functions ========================
function getErrorElement(inputElement) {
  return inputElement
    .closest(".form__field")
    .querySelector(".form__input-error");
}

function fixPlaceholder(inputElement) {
  try {
    const textLength = inputElement.value.length;
    if (textLength != 0) {
      inputElement
        .closest(".form__field")
        .querySelector(".form__placeholder")
        .classList.add("form__placeholder_is-fixed");
    }
  } catch (err) {}
}

function hasInvalidInputs(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  hasInvalidInputs(inputList)
    ? buttonElement.classList.add("button_inactive")
    : buttonElement.classList.remove("button_inactive");
}

//   ====================================================

function checkInputValidity(inputElement) {
  console.log("inputElement: ", inputElement.name);
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

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);
  console.log("inputList: ", inputList);

  // add event listener for all inputs
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// ===============================================

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  console.log("formList: ", formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement);
  });
}

enableValidation();
