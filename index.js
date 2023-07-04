// берем весь popup
const popup = document.querySelector(".popup");

// кнопка Редактировать
const editButton = document.querySelector(".profile__edit-button"); // кнопка
const popupEdit = document.querySelector('#popup-edit'); // попап 

// кнока Закрыть форму Редактировать (крестик в правом верхем углу)
const closeButtonEdit = document.querySelector("#popup-edit-close"); // кнопка
const popupEditClose = document.querySelector('#popup-edit'); // попап

// Находим поля формы в DOM для формы Редактировать
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");

let nameTitle = document.querySelector(".profile__title");
let jobTitle = document.querySelector(".profile__subtitle");


const formElement = document.querySelector(".popup__form");


// функция, которая присваивает значения инпутам (из profile)
function setPopupInputValue() {
    nameTitle.textContent = nameInput.value 
    jobTitle.textContent = jobInput.value;
};

// функция, которая присваивает значения profile (из инупта)
function setNodeTextValue() {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
};

// функция, которая добавляет модификатор popup__opened, чтобы открыть форму
function openPopup(popupForOpen) {
    popupForOpen.classList.add('popup_opened');
    setNodeTextValue();
};

//функция, которая удаляет модификатор popup__opened, чтобы закрыть форму
function closePopup(popupForClose) {
    popupForClose.classList.remove('popup_opened');
};

// функция, которая переносит занчения инпутов в profile, то есть сохраняет изменения, написанные в инпутах, и закрывает форму
function handleEditFormSubmit (evt) {
    evt.preventDefault();
    setPopupInputValue();
    closePopup(popupEditClose);
};

// открываем форму Редактировать
editButton.addEventListener('click', function() {
    openPopup(popupEdit);
});

// закрываем форму Редактировать
closeButtonEdit.addEventListener('click', function() {
    closePopup(popupEditClose);
});

// Сохраняем и закрываем форму Редактировать

form.addEventListener('submit', handleEditFormSubmit);

// кнопка Добавить

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup-add');

// кнопка Закрыть форму Добавить
const closeButtonAdd = document.querySelector('#popup-add-close');
const popupAddClose = document.querySelector('#popup-add');

// открываем форму Добавить
addButton.addEventListener('click', function() {
    openPopup(popupAdd);
});

// закрываем форму Добавить
closeButtonAdd.addEventListener('click', function() {
    closePopup(popupAddClose);
});


// Лайки и открытие фото на весь экран 

const elements = document.querySelector('.elements');
const element = document.querySelector('.element');
const templateElement = document.querySelector('#element-cards').content.querySelector('.element');

const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
const fullImage = popupFullImage.querySelector('.popup__full-image');
const titleFullImage = popupFullImage.querySelector('.popup__full-image-title');
const closeFullImage = popupFullImage.querySelector('#popup-overlay-close');

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

  function renderCard(data, container) {
    container.prepend(createPlaceCards(data));
}

// Добавляем данные из массива в template
initialCards.forEach(function(item) {
    renderCard(item, elements);
});

// Добавляем новое фото
const formNewCard = popupAdd.querySelector('#form-add'); // форма Добавить
const linkInput = popupAdd.querySelector('#link'); // ссылка на фото
const placeNameInput = popupAdd.querySelector('#place-name'); // название

function handleAddSubmit(evt) {
  evt.preventDefault();
  const linkNew = linkInput.value;
  const placeNameNew = placeNameInput.value;
  renderCard({name:placeNameNew, link:linkNew}, elements);
  formNewCard.reset();
  closePopup(popupAdd);
};

formNewCard.addEventListener('submit', handleAddSubmit);