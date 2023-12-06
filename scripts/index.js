// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function cardAddition(cardName, cardLink, cardDelete) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;

    cardElement.querySelector('.card__delete-button').addEventListener('click',  function(evt) {
        cardDelete(evt);
    });

    return cardElement;

}

function cardDeletion(deleteButton) {
    return deleteButton.target.closest('.places__item').remove();
}

function cardCreation(card) {
    return placesList.prepend(card);
}

initialCards.forEach(element => {
    cardCreation (cardAddition(element.name, element.link, cardDeletion));
});