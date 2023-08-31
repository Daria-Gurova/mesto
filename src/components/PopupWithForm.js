import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popupSelector, { selectorForm, submitHandler = null }){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector(selectorForm);
    }
    _getInputValues(){
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        [...this._inputList].forEach(input => {
            this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._getInputValues());

            super.close();
        
          });
        
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', super._handleEscClose);
        this._formElement.reset();
    }
}