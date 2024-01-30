export function openModal(element) {
    element.classList.add('popup_is-animated');

    setTimeout(() => {
        element.classList.add('popup_is-opened');
    }, 0);

    element.addEventListener('click', closeModalOnOverlay);
    document.addEventListener('keydown', closeModalOnEsc);
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');

    element.removeEventListener('click', closeModalOnOverlay);
    document.removeEventListener('keydown', closeModalOnEsc);

    setTimeout(() => {
        element.classList.remove('popup_is-animated');
    }, 600);
};

function closeModalOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}

function closeModalOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopUp = document.querySelector('.popup_is-opened');
        closeModal(openedPopUp);
    }
}
