export const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
export const fullImage = popupFullImage.querySelector('.popup__full-image');
export const titleFullImage = popupFullImage.querySelector('.popup__full-image-title');

export const config = { 
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// формы Редактировать и Добавить
export const formEdit = document.querySelector('#form-edit');
export const formAdd = document.querySelector('#form-add');

// кнопка Редактировать
export const buttonEdit = document.querySelector(".profile__edit-button"); // кнопка


// Находим поля формы в DOM для формы Редактировать
export const nameInput = document.querySelector(".popup__name");
export const jobInput = document.querySelector(".popup__job");

export const nameTitle = document.querySelector('.profile__title');
export const jobTitle = document.querySelector('.profile__subtitle');

// кнопка Добавить

export const buttonAdd = document.querySelector('.profile__add-button');
