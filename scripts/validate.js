// Валидация форм

const config = { 
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

  // функция, которая показывает ошибку, если форма НЕ валидна (то есть добавляет класс popup__input_type_error)
function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// функция, которая скрывает ошибку, если форма снова стала валидна (то есть удаляет класс popup__input_type_error)
function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;    
}

// функция, которая проверяет валидность формы
function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if(!isInputValid) {
        showError(inputElement, errorElement, config);
    }   else {
        hideError(inputElement, errorElement, config);
    }
}

// функция, которая блокирует кнопку Сохранить, если форма не валидна
function disableButton(buttonElement, config) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);   
};

// функция, которая разблокирует кнопку Сохранить, если форма стала валидна
function enableButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);  
};

// функция, которая переключает кнопку между состояниями заблокирована/разблокирована в зависимости от того, валидна форма или нет
function toggleButtonState (buttonElement, isActive, config) {
    if(!isActive) {
        disableButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    };
};

// функция ищет инпуты внутри каждой формы, перебирает список инпутов и вешает обработчик событий input на каждый инпут
function setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector); // 3 Внутри каждой формы ищем инпуты
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState (submitButtonElement, formElement.checkValidity(), config);
    // 4 Перебираем список инпутов конкретной формы и вешаем на каждый инпут обработчик событий input
    [...inputList].forEach(function (inputElement) {
        inputElement.addEventListener('input', function() {
            toggleButtonState (submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        })
    })
    // 2 Вешаем обработчик события submit на каждую форму в переборе
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log("Форма отправлена!");
    });
}

// функция, которая включает валидацию
function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector); // 1 Находим все формы и перебираем их
    [...formsList].forEach(function (formElement) {
        setEventListener(formElement, config);
    });
};

enableValidation(config);