const personalToken = '0815645e-4c6d-496b-93b9-13a4f9927067';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7/',
    headers: {
        authorization: personalToken,
        'Content-Type': 'application/json'
    }
}

const handleRequest = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserApi = () => {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers,
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const getCardsApi = () => {
    return fetch(`${config.baseUrl}cards`, {
        headers: config.headers,
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const editProfileApi = (name, job) => {
    return fetch(`${config.baseUrl}users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job,
        })
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const addCardApi = (name, link) => {
    return fetch(`${config.baseUrl}cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId,
        })
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const likeCardApi = (card) => {
    return fetch(`${config.baseUrl}cards/likes/${card}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const unlikeCardApi = (card) => {
    return fetch(`${config.baseUrl}cards/likes/${card}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then((res) => {
        return handleRequest(res);
    })
};

export const editProfileAvatarApi = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then((res) => {
        return handleRequest(res);
    })
}