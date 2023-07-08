// Массив фотографий и названий

const initialCards = [
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

// берем весь popup
const popup = document.querySelector(".popup");

// кнопка Редактировать
const buttonEdit = document.querySelector(".profile__edit-button"); // кнопка
const popupEdit = document.querySelector('#popup-edit'); // попап 

// кнока Закрыть форму Редактировать (крестик в правом верхем углу)
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
function openPopup(popupForOpen) {
    popupForOpen.classList.add('popup_opened');
};

//функция, которая удаляет модификатор popup__opened, чтобы закрыть форму
function closePopup(popupForClose) {
    popupForClose.classList.remove('popup_opened');
};

// функция, которая переносит занчения инпутов в profile, то есть сохраняет изменения, написанные в инпутах, и закрывает форму
function handleEditFormSubmit (evt) {
    evt.preventDefault();
    setProfileFieldsFromInputs();
    closePopup(popupEditClose);
};

// функция, с помощью которой через template ставим/удаляем лайки и открываем/закрываем фото на весь экран
function createPlaceCards({name, link}) {
    const placeCard = templateElement.cloneNode(true);  
    const elementImage = placeCard.querySelector('.element__img');
    const elementContent = placeCard.querySelector('.element__title');
    const elementLike = placeCard.querySelector('.element__like');
    const elementDelete = placeCard.querySelector('.element__delete');
   
    elementImage.src = link;
    elementLike.alt = name;

    elementContent.textContent = name;
    
    // Поставить лайк
    elementLike.addEventListener('click', function() {
        elementLike.classList.toggle('element__like_active');
    });
    
    // Удалить лайк
    elementDelete.addEventListener('click', function() {
      placeCard.remove();
    });
  
    // Открыть фото на весь экран
    elementImage.addEventListener('click', function () {
      openPopup(popupFullImage);
      fullImage.src = link;
      fullImage.alt = name;
      titleFullImage.textContent = name;
    });

    // Закрыть фото
    closeFullImage.addEventListener('click', function() {
        closePopup(popupFullImage);
    });

    return placeCard;
}

function renderCard(data, container) {
    container.prepend(createPlaceCards(data));
}

/* функция, которая заполняет форму Добавить, сохраняет и закрывает форму
function handleAddSubmit(evt) {
    evt.preventDefault();
    const linkNew = linkInput.value;
    const placeNameNew = placeNameInput.value;
    renderCard({name:placeNameNew, link:linkNew}, elements);
    formNewCard.reset();
    closePopup(popupAdd);
  };*/

// функция, которая заполняет форму Добавить, сохраняет и закрывает форму
function handleAddSubmit(evt) {
  evt.preventDefault();
  const link = linkInput.value;
  const name = placeNameInput.value;
  renderCard({name, link}, elements);
  formNewCard.reset();
  closePopup(popupAdd);
};

// открываем форму Редактировать
buttonEdit.addEventListener('click', function() {
    openPopup(popupEdit);
    setPopupInputsFromProfile();
});

// закрываем форму Редактировать
buttonClosePopupEdit.addEventListener('click', function() {
    closePopup(popupEditClose);
});

// Сохраняем и закрываем форму Редактировать

form.addEventListener('submit', handleEditFormSubmit);


// открываем форму Добавить
buttonAdd.addEventListener('click', function() {
    openPopup(popupAdd);
});

// закрываем форму Добавить
buttonClosePopupAdd.addEventListener('click', function(event) {
    closePopup(popupAddClose);
});

// Добавляем данные из массива в template
initialCards.forEach(function(item) {
    renderCard(item, elements);
});

// Сохраняем и закрываем форму Добавить
formNewCard.addEventListener('submit', handleAddSubmit);

// Закрытие попап по нажатию Esc

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
      }
});

// Закрытие попап по клику на overlay

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
      }
});