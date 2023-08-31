export class UserInfo {
    constructor({ userNameElement, userInfoElement }) {
        this._name = null;
        this._job = null;
        this._nameElement = userNameElement;
        this._jobElement = userInfoElement;
    }

    getUesrInfo() {
        const userInfo = {
            name: this._name,
            job: this._job
        }
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._name = userInfo.name;
        this._job = userInfo.job;
    }

    updateUserInfo() {
        this._nameElement.textcontent = this._name;
        this._jobElement.textcontent = this._job
    }
}