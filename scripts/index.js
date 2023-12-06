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

    return placesList.append(cardElement);
}

function cardDeletion(deleteButton) {
    return deleteButton.target.parentElement.remove();
}

initialCards.forEach(element => {
    cardAddition(element.name, element.link, cardDeletion);
});