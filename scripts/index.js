import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { config, initialCards } from "./constants.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
// Массив фотографий и названий

// берем весь popup
const popup = document.querySelector(".popup");

// формы Редактировать и Добавить
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');

// кнопка Редактировать
const buttonEdit = document.querySelector(".profile__edit-button"); // кнопка
const popupEdit = document.querySelector('#popup-edit'); // попап 


// кнопка Закрыть форму Редактировать (крестик в правом верхнем углу)
const buttonClosePopupEdit = document.querySelector("#popup-edit-close"); // кнопка
const popupEditClose = document.querySelector('#popup-edit'); // попап

// Находим поля формы в DOM для формы Редактировать
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");

const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");

// кнопка Добавить

const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup-add');

// кнопка Закрыть форму Добавить
const buttonClosePopupAdd = document.querySelector('#popup-add-close');
const popupAddClose = document.querySelector('#popup-add');

// Лайки и открытие фото на весь экран 

const elements = document.querySelector('.elements');
const element = document.querySelector('.element');
const templateElement = document.querySelector('#element-cards').content.querySelector('.element');

const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
const fullImage = popupFullImage.querySelector('.popup__full-image');
const titleFullImage = popupFullImage.querySelector('.popup__full-image-title');
const closeFullImage = popupFullImage.querySelector('#popup-overlay-close');

// Добавляем новое фото
const formNewCard = popupAdd.querySelector('#form-add'); // форма Добавить
const linkInput = popupAdd.querySelector('#link'); // ссылка на фото
const placeNameInput = popupAdd.querySelector('#place-name'); // название
const buttonSubmitPopupAdd = popupAdd.querySelector('#save-add'); // кнопка Сохранить в форме Добавить


// функция, которая присваивает значения профилю из инпутов
function setProfileFieldsFromInputs() {
    nameTitle.textContent = nameInput.value 
    jobTitle.textContent = jobInput.value;
};

// функция, которая устанавливает значения инпутов из профиля
function setPopupInputsFromProfile() {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
};

// функция, которая добавляет модификатор popup__opened, чтобы открыть форму
// function openPopup(popupForOpen) {
//     popupForOpen.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEsc); 
// };

//функция, которая удаляет модификатор popup__opened, чтобы закрыть форму
// function closePopup(popupForClose) {
//     popupForClose.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEsc);
// };

// функция, которая переносит занчения инпутов в profile, то есть сохраняет изменения, написанные в инпутах, и закрывает форму
// function handleEditFormSubmit (evt) {
//     evt.preventDefault();
//     setProfileFieldsFromInputs();
//     closePopup(popupEditClose);
// };

function renderCard(data, elements) {
  const card = new Card(data.name, data.link, '#element-cards', handleCardClick).createCard();
  return card;
}


function handleCardClick(data) {
  openPopup(popupFullImage);
  fullImage.src = data.link;
  fullImage.alt = data.name;
  titleFullImage.textContent = data.name;
};


// // функция, которая заполняет форму Добавить, сохраняет и закрывает форму
// function handleAddSubmit(evt) {
//   evt.preventDefault();
//   const link = linkInput.value;
//   const name = placeNameInput.value;
//   renderCard({name, link}, elements);
//   formNewCard.reset();
//   //disableButton(evt.submitter, config);
//   formAddValidation.disableButton();
//   closePopup(popupAdd);
// };


// закрываем форму Редактировать
// buttonClosePopupEdit.addEventListener('click', function() {
//     closePopup(popupEditClose);
// });

// Сохраняем и закрываем форму Редактировать

// form.addEventListener('submit', handleEditFormSubmit);

// // закрываем форму Добавить
// buttonClosePopupAdd.addEventListener('click', function(event) {
//     closePopup(popupAddClose);
// });

// // Добавляем данные из массива в template
// initialCards.forEach(function(data) {
//   renderCard(data, elements);
// });

// // Сохраняем и закрываем форму Добавить
// formNewCard.addEventListener('submit', handleAddSubmit);

// Закрытие картинки на весь экран при нажатии на крестик

// closeFullImage.addEventListener('click', function() {
//   closePopup(popupFullImage);
// });

// Закрытие попап по нажатию Esc

// const closePopupByEsc = event => {
//   if (event.key === 'Escape') { 
//       const popupOpened = document.querySelector('.popup_opened'); 
//       closePopup(popupOpened); 
//  };
// };

// Закрытие попап по клику на overlay

// document.addEventListener('click', function(event) {
//   if (event.target.classList.contains('popup')) {
//       closePopup(event.target);
//     }
// });

const formEditValidation = new FormValidator(config, formEdit);
const formAddValidation = new FormValidator(config, formAdd);

formEditValidation.enableValidation();
formAddValidation.enableValidation();

const cardSection = new Section({
  renderer: (item) => { 
    const newCard = renderCard(item); 
    console.log(newCard);
    cardSection.addItem(newCard); 
  }, }, '.elements' ); 

cardSection.render(initialCards);

const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
      console.log(data);
  }
});

const popupWithFormAdd = new PopupWithForm('#popup-add', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
    const newCard = renderCard(data); 
    cardSection.addItem(newCard); 
    // cardSection.render(data);
    // popupWithFormAdd.close();
  }
});

const popupEditProfile = new PopupWithForm('#popup-edit', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
      console.log(data);
  }
});

const userInfo = new UserInfo( {
  userNameElement: nameTitle,
  userJobElement: jobTitle
});

const popupWithImage = new PopupWithImage('.popup__full-image');
popupWithImage.setEventListeners();

function openEditForm() {
  console.log(popupWithFormEdit);
  popupWithFormEdit.open();
  // formEditValidation.errorCleaner();
};

function openAddForm() {
  console.log(popupWithFormAdd);
  popupWithFormAdd.open();
  formAddValidation.disableButton();
  // formAddValidation.errorCleaner();
};

// открываем форму Редактировать
buttonEdit.addEventListener('click', openEditForm);

// открываем форму Добавить
buttonAdd.addEventListener('click', openAddForm);

popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();