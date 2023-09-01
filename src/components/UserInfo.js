export class UserInfo {
    constructor({ userNameElement, userJobElement }) {
        this._title = null;
        this._job = null;
        this._nameElement = userNameElement;
        this._jobElement = userJobElement;
    }

    getUserInfo() {
        return {
            title: this._name,
            job: this._job
        };
    }

    setUserInfo(userInfo) {
        this._name = userInfo.title;
        this._job = userInfo.job;
    }

    updateUserInfo() {
        this._nameElement.textContent = this._name;
        this._jobElement.textContent = this._job;
    }
}