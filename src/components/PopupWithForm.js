import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { selectorForm, submitHandler = null }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._formElement = this._popupElement.querySelector(selectorForm);
    this._submitButton = this._formElement.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._formValues = {};
    [...this._inputList].forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  loading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
