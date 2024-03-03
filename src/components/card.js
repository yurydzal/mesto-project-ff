import { cardTemplate, placesList } from '../index.js';

export function createCard(cardData, personalId, cardDelete, cardLike, cardOpen) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikes = cardElement.querySelector('.card__like-number');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    if(cardData.likes.some(element => element._id === personalId)){
        likeCard(cardLikeButton);
    }

    if(cardData.owner._id !== personalId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', cardDelete);
    }

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikes.textContent = cardData.likes.length;

    cardLikeButton.addEventListener('click', cardLike);
    cardImage.addEventListener('click', () => {
        cardOpen(cardData.link, cardData.name);
    });

    cardElement.setAttribute("id", cardData._id);
    return cardElement;
}

export function deleteCard(deleteButton) {
    deleteButton.closest('.places__item').remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function addCard(card) {
    return placesList.prepend(card);
}