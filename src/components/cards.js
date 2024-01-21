import { cardTemplate, placesList, popUpTypeImage } from '../index.js';
import { openModal } from './modal.js';

export const initialCards = [
  {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export function cardAddition(cardName, cardLink, cardDelete, cardLike, cardOpen) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;

  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    cardDelete(evt);
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
    cardLike(evt);
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    cardOpen(cardLink, cardName);
  });

  return cardElement;
}

export function cardDeletion(deleteButton) {
  deleteButton.target.closest('.places__item').remove();
}

export function cardLiking(likeButton) {
  likeButton.target.classList.toggle('card__like-button_is-active');
}

export function cardOpening (imageSrc, imageAlt) {
  popUpTypeImage.querySelector('.popup__image').src = imageSrc;
  popUpTypeImage.querySelector('.popup__image').alt = imageAlt;
  popUpTypeImage.querySelector('.popup__caption').textContent = imageAlt;
  openModal(popUpTypeImage);
}

export function cardCreation(card) {
  return placesList.prepend(card);
}
