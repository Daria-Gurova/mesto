import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__full-image");
    this._title = document.querySelector(".popup__full-image-title");
  }
  open(imageLink, title) {
    super.open();

    this._image.src = imageLink;
    this._title.textContent = title;
    this._image.alt = title;
  }
}
