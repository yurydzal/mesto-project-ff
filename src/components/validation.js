export const enableValidation = (configObject) => {
    const formList = Array.from(document.querySelectorAll(configObject.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault;
        });
        setEventListeners(formElement, configObject);
    });
};

const disableSubmitButton = (element, inactiveClass) => {
    element.disabled = true;
    element.classList.add(inactiveClass);
}

export const clearValidation = (form, configObject) => {
    const inputList = form.querySelectorAll(configObject.inputSelector);
    const button = form.querySelector(configObject.submitButtonSelector);
    inputList.forEach((input) => {
        hideInputError(form, input, configObject.inputErrorClass, configObject.errorClass);
    });
    disableSubmitButton(button, configObject.inactiveButtonClass);
};

const setEventListeners = (formElement, configObject) => {
    const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
    const buttonElement = formElement.querySelector(configObject.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, configObject.inputErrorClass, configObject.errorClass);
            toggleButtonState(inputList, buttonElement, configObject.inactiveButtonClass);
        });
    });
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};