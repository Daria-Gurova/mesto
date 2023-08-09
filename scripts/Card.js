import { openPopup } from "./index.js";
export class Card {
    _name;
    _link;
    _templateSelector;
    _placeCard;

    constructor(name, link, templateSelector /*elementLike, elementDelete*/) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        //this._elementLike = elementLike;
        //this._elementDelete = elementDelete;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
    }

    createCard() {
        this._placeCard = this._getTemplate();
        const elementContent = this._placeCard.querySelector('.element__title');
        const elementImage = this._placeCard.querySelector('.element__img');
        

        elementContent.textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._setEventListeners();
        return this._placeCard;
    }

    _toggleLike() { 
        elementLike.classList.toggle('.element__like_active');
    }

    _deleteLike() {
        this._placeCard.remove();
    }

    _openImage() {
        const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        const fullImage = popupFullImage.querySelector('.popup__full-image');
        const titleFullImage = popupFullImage.querySelector('.popup__full-image-title');

        openPopup(popupFullImage);
        fullImage.src = this._link;
        fullImage.alt = this._name;
        titleFullImage.textContent = this._name;
    }

    _closeImage() {
        const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        const closeFullImage = popupFullImage.querySelector('#popup-overlay-close');
        closeFullImage.remove('popup_opened');
    }

    _setEventListeners() {
        const elementLike = this._placeCard.querySelector('.element__like');
        elementLike.addEventListener('click', function() {
            this._toggleLike();
        });

        const elementDelete = this._placeCard.querySelector('.element__delete');
        elementDelete.addEventListener('click', function() {
            this._deleteLike();
        });

        const elementImage = this._placeCard.querySelector('.element__img');
        elementImage.addEventListener('click', function () {
            this._openImage();
        });

        const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        const closeFullImage = popupFullImage.querySelector('#popup-overlay-close');
        closeFullImage.addEventListener('click', function() {
            this._closeImage();
        });
    }
}