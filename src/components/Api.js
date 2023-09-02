export class Api {
    constructor(config){
        this._url = config.url; 
        this._headers = config.headers;
    }

    _onResponse(res){
        return res.ok ? res.json(): res.json().then(errData => Promise.reject(errData));
    }
    
    getAll(){
        return Promise.all([this.getUser(), this.getAllCards()])
    }

    getUser(){
        return fetch (`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._onResponse)
    }

    editUser(data){
        return fetch (`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.title}`,
                about: `${data.job}`
            })
        })
        .then(this._onResponse)
    }

    editUserPic(data){
        return fetch (`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${data.photo}`
            })
        })
        .then(this._onResponse)
    }

    getAllCards(){
        return fetch (`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._onResponse)
    }

    addCard(data){
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.name}`,
                link: `${data.link}`
            })
        })
        .then(this._onResponse)
    }

    deleteCard(cardId){
        return fetch (`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._onResponse)
    }

    chgLike(cardId, isLiked){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
        .then(this._onResponse)
    }

}