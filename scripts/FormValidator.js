export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._inputSelector); // 3 Внутри каждой формы ищем инпуты
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    // метод, который включает валидацию
    enableValidation() {
        this._setEventListener();
    }

    // метод, который ищет инпуты внутри каждой формы, перебирает список инпутов и вешает обработчик событий input на каждый инпут
    _setEventListener() {
        this._toggleButtonState (this._submitButtonElement, this._formElement.checkValidity());
        // 4 Перебираем список инпутов конкретной формы и вешаем на каждый инпут обработчик событий input
        [...this._inputList].forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState (this._submitButtonElement, this._formElement.checkValidity());
                this._checkInputValidity(inputElement, this._formElement);
            })
        })
        // 2 Вешаем обработчик события submit на каждую форму в переборе
        this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log("Форма отправлена!");
    });
    }

    // метод, который переключает кнопку между состояниями заблокирована/разблокирована в зависимости от того, валидна форма или нет
    _toggleButtonState(isActive) {
        if(!isActive) {
            this.disableButton();
        } else {
            this.enableButton();
        };
    }

    // метод, который блокирует кнопку Сохранить, если форма не валидна
    disableButton() {
        this._submitButtonElement.disabled = true;
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }

    // метод, который разблокирует кнопку Сохранить, если форма стала валидна
    enableButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }

    // метод, который проверяет валидность формы
    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        if(!isInputValid) {
            this._showError(inputElement, errorElement);
        }   else {
            this._hideError(inputElement, errorElement);
        }  
    }

    // метод, который показывает ошибку, если форма НЕ валидна (то есть добавляет класс popup__input_type_error)
    _showError(inputElement, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // метод, который скрывает ошибку, если форма снова стала валидна (то есть удаляет класс popup__input_type_error)
    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }
}