import { Popup } from "./Popup.js";
export class PopupDelConfirm extends Popup {
  constructor(popupSelector, { selectorForm, submitHandler = null }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(selectorForm);
    this._submitHandler = submitHandler;
    this._submitButton = this._formElement.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  setActionSubmit(callback) {
    this._submitHandler = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
