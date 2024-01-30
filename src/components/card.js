import { cardTemplate, placesList } from '../index.js';

export function createCard(cardName, cardLink, cardDelete, cardLike, cardOpen) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;

    cardElement.querySelector('.card__delete-button').addEventListener('click', cardDelete);
    cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
    cardElement.querySelector('.card__image').addEventListener('click', () => {
        cardOpen(cardLink, cardName);
    });

    return cardElement;
}

export function deleteCard(deleteButton) {
    deleteButton.target.closest('.places__item').remove();
}

export function likeCard(likeButton) {
    likeButton.target.classList.toggle('card__like-button_is-active');
}

export function addCard(card) {
    return placesList.prepend(card);
}