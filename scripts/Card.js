export class Card {

    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._elementImage = this._placeCard.querySelector('.element__img');
        this._elementLike = this._placeCard.querySelector('.element__like');
        this._elementDelete = this._placeCard.querySelector('.element__delete');

        elementContent.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._setEventListeners();
        return this._placeCard;
    }

    _toggleLike() { 
        this._elementLike.classList.toggle('element__like_active');
    }

    _deleteLike() {
        this._placeCard.remove();
    }

    _closeImage() {
        const popupFullImage = document.querySelector('#popup-open-overlay-full-image');
        const closeFullImage = popupFullImage.querySelector('#popup-overlay-close');
        closeFullImage.remove('popup_opened');
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {
            this._toggleLike();
        });

        this._elementDelete.addEventListener('click', () => {
            this._deleteLike();
        });

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick({name: this._name, link: this._link});
        });
    }
}