import { openPopup } from "./index.js";
export class Card {
    _name;
    _link;
    _templateSelector;
    _placeCard;

    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
    }

    createCard() {
        this._placeCard = this._getTemplate();
        elementContent = this._placeCard.querySelector('.element__title');
        elementImage = this._placeCard.querySelector('.element__img');

        elementContent.textContent = this._name;
        elementImage.src = this._link;
        elementLike.alt = this._name;
        this._setEventListeners();
        return this._placeCard;
    }

    _toggleLike() {
        elementLike = this._placeCard.querySelector('.element__like'); 
        elementLike.classList.toggle('.element__like_active');
    }

    _deleteLike() {
        elementDelete = this._placeCard.querySelector('.element__delete');
        this._placeCard.remove();
    }

    _openImage() {
        popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        fullImage = popupFullImage.querySelector('.popup__full-image');
        titleFullImage = popupFullImage.querySelector('.popup__full-image-title');

        openPopup(popupFullImage);
        fullImage.src = this._link;
        fullImage.alt = this._name;
        titleFullImage.textContent = this._name;
    }

    _closeImage() {
        popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        closeFullImage = popupFullImage.querySelector('#popup-overlay-close');
        closeFullImage.remove('popup_opened');
    }

    _setEventListeners() {
        elementLike = this._placeCard.querySelector('.element__like');
        elementLike.addEventListener('click', function() {
            this._toggleLike();
        });

        elementDelete = this._placeCard.querySelector('.element__delete');
        elementDelete.addEventListener('click', function() {
            this._deleteLike();
        });

        elementImage = this._placeCard.querySelector('.element__img');
        elementImage.addEventListener('click', function () {
            this._openImage();
        });

        popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        closeFullImage = popupFullImage.querySelector('#popup-overlay-close');
        closeFullImage.addEventListener('click', function() {
            this._closeImage();
        });
    }
}