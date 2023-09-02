// элементы картинок
export const popupFullImage = document.querySelector(
  "#popup-open-overlay-full-image"
);
export const fullImage = popupFullImage.querySelector(".popup__full-image");
export const titleFullImage = popupFullImage.querySelector(
  ".popup__full-image-title"
);

// конфиг валидаторов
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// формы Редактировать и Добавить
export const formEdit = document.querySelector("#form-edit");
export const formAdd = document.querySelector("#form-add");
export const formAvatar = document.querySelector("#form-avatar");

// кнопка Редактировать
export const buttonEdit = document.querySelector(".profile__edit-button"); // кнопка

// Находим поля формы в DOM для формы Редактировать
export const nameInput = document.querySelector(".popup__name");
export const jobInput = document.querySelector(".popup__job");
export const avatarInput = document.querySelector(".popup__img");

export const nameTitle = document.querySelector(".profile__title");
export const jobTitle = document.querySelector(".profile__subtitle");
export const avatar = document.querySelector(".profile__avatar");
export const avatarImg = document.querySelector(".profile__avatar-container");
export const avatarBtn = document.querySelector(".profile__edit-button");

// кнопка Добавить
export const buttonAdd = document.querySelector(".profile__add-button");

// конфиг API
export const configApi = {
  url: "https://nomoreparties.co/v1/cohort-20",
  headers: {
    "content-type": "application/json",
    authorization: "3fc4f6b9-45df-4038-9051-0622872bffaf",
  },
};
