import { Card } from "../components/Card.js";
import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import {
  config,
  formEdit,
  formAdd,
  formAvatar,
  buttonEdit,
  nameInput,
  jobInput,
  nameTitle,
  avatar,
  jobTitle,
  buttonAdd,
  configApi,
  avatarImg,
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDelConfirm } from "../components/PopupDelConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// подключаем валидаторы
const formEditValidation = new FormValidator(config, formEdit);
const formAddValidation = new FormValidator(config, formAdd);
const formAvatarValidation = new FormValidator(config, formAvatar);

// айди пользователя для лайков и удаления карточек
let userId = null;

// инициализация апи
const api = new Api(configApi);

// класс для карточек
const cardSection = new Section(
  {
    renderer: (item) => {
      const newCard = renderCard(item);
      cardSection.addItem(newCard);
    },
  },
  ".elements"
);

// класс для профиля
const userInfo = new UserInfo({
  userNameElement: nameTitle,
  userJobElement: jobTitle,
  userImgElement: avatar,
});

// создание дефолтных карточек и профиля
api
  .getAll()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      title: userData.name,
      job: userData.about,
      image: userData.avatar,
    });
    userId = userData._id;
    cardSection.render(cardsData);
  })
  .catch((err) => console.log(err));

// попап для добавления новой карточки
const popupWithFormAdd = new PopupWithForm("#popup-add", {
  selectorForm: ".popup__form",
  submitHandler: (data) => {
    popupWithFormAdd.loading(true);
    api
      .addCard(data)
      .then((serverData) => {
        const newCard = renderCard(serverData);
        cardSection.addItem(newCard);
        popupWithFormAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithFormAdd.loading(false);
      });
  },
});

// попап для подтверждения удаления карточки
const popupWithFormDel = new PopupDelConfirm("#popup-confirm", {
  selectorForm: ".popup__form"
});

// попап для редактирования профиля
const popupWithFormEdit = new PopupWithForm("#popup-edit", {
  selectorForm: ".popup__form",
  submitHandler: (data) => {
    popupWithFormEdit.loading(true);
    api
      .editUser(data)
      .then((sreverData) => {
        userInfo.setUserInfo({
          title: sreverData.name,
          job: sreverData.about,
          image: sreverData.image ? sreverData.image : avatar.src,
          id: sreverData._id,
        });
        popupWithFormEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithFormEdit.loading(false);
      });
  },
});

// попап для аватарки
const popupWithFormAvatar = new PopupWithForm("#popup-avatar", {
  selectorForm: ".popup__form",
  submitHandler: (data) => {
    popupWithFormAvatar.loading(true);
    api
      .editUserPic(data)
      .then((serverData) => {
        userInfo.setUserInfo({
          title: serverData.name ? serverData.name : nameTitle.textContent,
          job: serverData.about ? serverData.about : jobTitle.textContent,
          image: serverData.avatar,
          id: serverData._id,
        });
        popupWithFormAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithFormAvatar.loading(false);
      });
  },
});

// попап для оверлея
const popupWithImage = new PopupWithImage(".popup_overlay-full-image");

// функция редактирования профиля
function openEditForm() {
  popupWithFormEdit.open();
  const dataUser = userInfo.getUserInfo();
  setPopupInputsFromProfile(dataUser);
}

// функция добавления карточки
function openAddForm() {
  popupWithFormAdd.open();
  formAddValidation.disableButton();
}

// функция обновления аватарки
function openAvatarForm() {
  popupWithFormAvatar.open();
  formAvatarValidation.disableButton();
}

// функция, которая устанавливает значения инпутов из профиля
function setPopupInputsFromProfile() {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.title;
  jobInput.value = infoObject.job;
}

// функция создания карточки
function renderCard(data) {
  const card = new Card(
    data,
    userId,
    "#element-cards",
    handleCardClick,
    handleCardDelete,
    handleCardLike
  );
  return card.createCard();
}

// фукция удвления карточки
function handleCardDelete(cardSection) {
  popupWithFormDel.open();
  popupWithFormDel.setActionSubmit(() => {
    api
      .deleteCard(cardSection.getId())
      .then(() => {
        cardSection.remove();
        popupWithFormDel.close();
      })
      .catch((err) => console.log(err));
  });
}

// функция раскрытия карточки на весь экран
function handleCardClick(data) {
  popupWithImage.open(data.link, data.name);
}

// функция простановки лайков на карточке
function handleCardLike(card) {
  api
    .chgLike(card.getId(), card.isLiked())
    .then((cardData) => {
      card.setLikes(cardData);
    })
    .catch((err) => console.log(err));
}

// обработчики событий
buttonAdd.addEventListener("click", openAddForm);
buttonEdit.addEventListener("click", openEditForm);
avatarImg.addEventListener("click", openAvatarForm);

// листенеры
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormDel.setEventListeners();

// активация валидаторов
formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();
