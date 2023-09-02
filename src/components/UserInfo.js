export class UserInfo {
    constructor({ userNameElement, userJobElement, userImgElement, userIdElement }) {
        this._title = null;
        this._job = null;
        this._img = null;
        this._id = null;
        this._nameElement = userNameElement;
        this._jobElement = userJobElement;
        this._imgElement = userImgElement;
        this._idElement = userIdElement;
    }

    getUserInfo() {
        return {
            title: this._title,
            job: this._job,
            image: this._img
        };
    }

    setUserInfo(userInfo) {
        this._title = userInfo.title;
        this._job = userInfo.job;
        this._img = userInfo.image;
        this._id = userInfo.id;
        this.updateUserInfo();
    }

    updateUserInfo() {
        this._nameElement.textContent = this._title;
        this._jobElement.textContent = this._job;
        this._imgElement.src = this._img;
        this._idElement = this._id;
    }
}