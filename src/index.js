import './pages/index.css';
import { addCard, createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserApi, getCardsApi, editProfileApi, addCardApi, deleteCardApi, likeCardApi, unlikeCardApi, editProfileAvatarApi } from './components/api.js';

export const cardTemplate = document.querySelector('#card-template');
export const placesList = document.querySelector('.places__list');
export const popUpTypeImage  = document.querySelector('.popup_type_image');
export const popUpTypeEdit = document.querySelector('.popup_type_edit');
export const popUpTypeNewCard = document.querySelector('.popup_type_new-card');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');
export const nameInput = formElementProfile.querySelector('.popup__input_type_name');
export const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileAddButton = document.querySelector('.profile__add-button');
export const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
export const placeNameInput = formElementNewPlace.querySelector('.popup__input_type_card-name');
export const linkInput = formElementNewPlace.querySelector('.popup__input_type_url');
const closeButton = document.querySelectorAll('.popup__close');
const popUpTypeAvatar = document.querySelector('.popup_type_avatar');
const profileImageButton = document.querySelector('.profile__image');
const formElementAvatar = document.querySelector('.popup__form[name="new-avatar"]');
const avatarInput = formElementAvatar.querySelector('.popup__input_type_url');
let userId = "";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

closeButton.forEach(element => {
    element.addEventListener('click', () => {
        closeModal(element.closest('.popup_is-opened'));
    });
});

Promise.all([getUserApi(), getCardsApi()])
    .then(([user, cards]) => {
        userId = user._id;
        const userName = user.name;
        const userAbout = user.about;
        const userAvatar = user.avatar;

        profileTitle.textContent = userName;
        profileDescription.textContent = userAbout;
        profileImageButton.setAttribute("style", `background-image:url(${userAvatar})`);

        cards.forEach((card) => {
            addCard(createCard(card, userId, handleCardDelete, handleCardLike, openCard));
        })
    })
    .catch(err => console.log(err))

function handleCardDelete(evt) {
    evt.preventDefault();
    deleteCardApi(evt.target.closest(".places__item").id)
    .then(() => {
        deleteCard(evt.target.closest(".card__delete-button"));
    })
    .catch(err => console.log(err))
}

function handleCardLike(evt) {
    const card = evt.target.closest(".places__item");
    const likeNumber = card.querySelector(".card__like-number");
    const likeMethod = evt.target.closest(".card__like-button_is-active") ? unlikeCardApi : likeCardApi;
    likeMethod(card.id)
        .then((res) => {
            likeCard(evt.target.closest(".card__like-button"));
            likeNumber.textContent = res.likes.length;
        })
    .catch(err => console.log(err))
}

function openCard(imageSrc, imageAlt) {
    popUpTypeImage.querySelector('.popup__image').src = imageSrc;
    popUpTypeImage.querySelector('.popup__image').alt = imageAlt;
    popUpTypeImage.querySelector('.popup__caption').textContent = imageAlt;
    openModal(popUpTypeImage);
}

function handleFormEdit(evt) {
    evt.preventDefault();
    formElementProfile.querySelector('.popup__button').textContent = "Сохранение...";
    editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(popUpTypeEdit);
    })
    .catch(err => console.log(err))
    .finally(() => {
        formElementProfile.querySelector('.popup__button').textContent = "Сохранить";
    });
}

function handleFormAdd(evt) {
    evt.preventDefault();
    formElementNewPlace.querySelector('.popup__button').textContent = "Сохранение...";
    addCardApi(placeNameInput.value, linkInput.value)
    .then((res) => {
        addCard(createCard(res, userId, handleCardDelete, handleCardLike, openCard));
        closeModal(popUpTypeNewCard);
        formElementNewPlace.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
        formElementNewPlace.querySelector('.popup__button').textContent = "Сохранить";
    });
}

function handleFormAvatar(evt) {
    evt.preventDefault();
    formElementAvatar.querySelector('.popup__button').textContent = "Сохранение...";
    editProfileAvatarApi(avatarInput.value)
    .then((res) => {
        profileImageButton.setAttribute("style", `background-image:url(${res.avatar})`);
        closeModal(popUpTypeAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => {
        formElementAvatar.querySelector('.popup__button').textContent = "Сохранить";
    });
}

profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formElementProfile, validationConfig);
    openModal(popUpTypeEdit);
});

profileAddButton.addEventListener('click', function() {
    clearValidation(formElementNewPlace, validationConfig);
    openModal(popUpTypeNewCard);
});

profileImageButton.addEventListener('click', function() {
    clearValidation(formElementAvatar, validationConfig);
    openModal(popUpTypeAvatar);
});

formElementProfile.addEventListener('submit', handleFormEdit);
formElementNewPlace.addEventListener('submit', handleFormAdd);
formElementAvatar.addEventListener('submit', handleFormAvatar);