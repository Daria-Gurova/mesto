export class Api {
    constructor(config){
        this._url = config.url; 
        this._headers = config.headers;
    }

    #onResponse(res){
        return res.ok ? res.json(): res.json().then(errData => Promise.reject(errData));
    }
    
    getUser(){
        return fetch (`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this.#onResponse)
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
        .then(this.#onResponse)
    }

    editUserPic(data){
        return fetch (`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${data.name}`
            })
        })
        .then(this.#onResponse)
    }

    getAllCards(){
        return fetch (`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this.#onResponse)
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
        .then(this.#onResponse)
    }

    deleteCard(cardId){
        return fetch (`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    addLike(cardId){
        return fetch (`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    deleteLike(cardId){
        return fetch (`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }
}