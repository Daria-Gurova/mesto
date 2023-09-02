import { Popup } from "./Popup.js";
export class PopupDelConfirm extends Popup {
  constructor(popupSelector, { selectorForm, submitHandler = null }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(selectorForm);
    this._submitHandler = submitHandler;
  }

  setActionSubmit(callback) {
    this._submitHandler = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
      super.close();
    });
  }
}
