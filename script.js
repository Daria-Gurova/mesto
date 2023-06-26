// берем весь popup
const popup = document.querySelector(".popup");

// кнопка Редактировать
const editButton = document.querySelector(".profile__edit-button");

// кнока Закрыть (крестик в правом верхем углу)
const closeButton = document.querySelector(".popup__button-close");

// кнопка Сохранить (и отправить?)
const submitPopup = document.querySelector(".popup__button-save")

const formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");

let nameTitle = document.querySelector(".profile__title");
let jobTitle = document.querySelector(".profile__subtitle");

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
function openPopup() {
    popup.classList.add('popup__opened');
    setNodeTextValue();
    console.log(formElement);
};

// функция, которая удаляет модификатор popup__opened, чтобы закрыть форму
function closePopup() {
    popup.classList.remove('popup__opened');
};

// функция, которая переносит занчения инпутов в profile, то есть сохраняет изменения, написанные в инпутах, и закрывает форму
function handleFormSubmit (evt) {
    evt.preventDefault();
    setPopupInputValue();
    closePopup();
};

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

submitPopup.addEventListener('click', handleFormSubmit);