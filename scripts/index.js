// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template');
const places = document.querySelector('.places__list');

function cardAddition(cardName, cardLink) {

    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });

    return places.append(cardElement);
}

initialCards.forEach(element => {
    cardAddition(element.name, element.link);
});