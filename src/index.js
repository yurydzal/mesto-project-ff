import './pages/index.css';
import { initialCards, cardCreation, cardAddition, cardDeletion, cardLiking, cardOpening } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template');
export const placesList = document.querySelector('.places__list');
export const popUpTypeImage  = document.querySelector('.popup_type_image');
export const popUpTypeEdit = document.querySelector('.popup_type_edit');
export const PopUpTypeNewCard = document.querySelector('.popup_type_new-card');
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

initialCards.forEach(element => {
    cardCreation (cardAddition(element.name, element.link, cardDeletion, cardLiking, cardOpening));
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popUpTypeEdit);
}

function handleFormAdd(evt) {
    evt.preventDefault();
    const imageName = placeNameInput.value;
    const imageLink = linkInput.value;
    cardCreation(cardAddition(imageName, imageLink, cardDeletion, cardLiking, cardOpening));
    formElementNewPlace.reset();
    closeModal(PopUpTypeNewCard);
}

profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popUpTypeEdit);
});
profileAddButton.addEventListener('click', function() {
    openModal(PopUpTypeNewCard);
});

formElementProfile.addEventListener('submit', handleFormSubmit);
formElementNewPlace.addEventListener('submit', handleFormAdd);