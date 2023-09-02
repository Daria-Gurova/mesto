import imgDefault from '../images/image.png';
export class Card {

    constructor(data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike) {
        
        this._data = data;
        this._cardId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._userId = userId;
        this._ownId = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;

        
    }

    
    getId(){
        return this._cardId;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
    }

    createCard() {

        this._placeCard = this._getTemplate();

        this._elementContent = this._placeCard.querySelector('.element__title');
        this._elementImage = this._placeCard.querySelector('.element__img');
        this._elementLike = this._placeCard.querySelector('.element__like');
        this._elementLikeCnt = this._placeCard.querySelector('.element__like-count');
        this._elementDelete = this._placeCard.querySelector('.element__delete');
        // console.log(this._elementLikeCnt.textContent);
        this._updateLikes();

        this._elementContent.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        if(this._userId !== this._ownId){
            this._elementDelete.remove();
        }
        
        this._setEventListeners();

        return this._placeCard;
    }


    isLiked(){
        return this._data.likes.some((item) => {
            return item._id === this._userId;
        })
    }

    setLikes(data){
        this._data.likes = data.likes;
        this._updateLikes();
    }

    _updateLikes(){
        this._elementLikeCnt.textContent = this._data.likes.length;
        // this._elementLike.classList.add('element__like_active');
        if(this.isLiked()){
            this._elementLike.classList.add('element__like_active');
        } else {
            this._elementLike.classList.remove('element__like_active');
        }
    }

    remove(){
        this._placeCard.remove();
        this._placeCard = null;
    }

    _setEventListeners() {
        this._elementImage.addEventListener('error', () => {
            // this._handleCardClick({name: 'placeholder', link: imgDefault});
            this._elementImage.src = imgDefault;
            this._elementImage.alt = 'placeholder';
        });

        this._elementLike.addEventListener('click', () => {
            this._handleCardLike(this);
        });

        this._elementDelete.addEventListener('click', () => {
            this._handleCardDelete(this)
        });

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick({name: this._name, link: this._link});
        });
    }
}