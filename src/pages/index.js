import { Card } from "../components/Card.js";
import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { 
  config, 
  initialCards, 
  formEdit, 
  formAdd,
  buttonEdit,
  nameInput,
  jobInput,
  nameTitle,
  jobTitle,
  buttonAdd
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// подключаем валидаторы
const formEditValidation = new FormValidator(config, formEdit);
const formAddValidation = new FormValidator(config, formAdd);

// класс для карточек
const cardSection = new Section({
  renderer: (item) => { 
    const newCard = renderCard(item); 
    cardSection.addItem(newCard); 
  }}, '.elements' ); 

// создание дефолтных карточек
cardSection.render(initialCards);

// класс для профиля
const userInfo = new UserInfo( {
  userNameElement: nameTitle,
  userJobElement: jobTitle
});

// заполнение профиля по умолчанию
userInfo.setUserInfo({title: 'Жак-Ив Кусто', job: 'Исследователь океана'});
userInfo.updateUserInfo();

// попап для добавления новой карточки
const popupWithFormAdd = new PopupWithForm('#popup-add', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
    const newCard = renderCard(data); 
    cardSection.addItem(newCard); 
    // popupWithFormAdd.close();
  }
});

// попап для редактирования профиля
const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();
    // popupWithFormEdit.close();
  }
});

// попап для оверлея
const popupWithImage = new PopupWithImage('.popup_overlay-full-image');
popupWithImage.setEventListeners();

// функция редактирования профиля
function openEditForm() {
  popupWithFormEdit.open();
  const dataUser = userInfo.getUserInfo();
  setPopupInputsFromProfile(dataUser);
  // formEditValidation.errorCleaner();
};

// функция добавления карточки
function openAddForm() {
  popupWithFormAdd.open();
  formAddValidation.disableButton();
  // formAddValidation.errorCleaner();
};

// функция, которая устанавливает значения инпутов из профиля
function setPopupInputsFromProfile() {
  const infoObject = userInfo.getUserInfo();
  console.log(infoObject);
  nameInput.value = infoObject.title;
  jobInput.value = infoObject.job;
};

// функция создания карточки
function renderCard(data, elements) {
const card = new Card(data.name, data.link, '#element-cards', handleCardClick).createCard();
return card;
};

// функция раскрытия карточки на весь экран
function handleCardClick(data) {
popupWithImage.open(data.link, data.name);
};

// обработчики событий
buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditForm);

popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();

formEditValidation.enableValidation();
formAddValidation.enableValidation();