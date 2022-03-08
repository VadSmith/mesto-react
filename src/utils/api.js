class Api {
  constructor({ address, token }) {
    this._address = address;
    // this._cohortId = cohortId;
    this._token = token;
    this._headers = {
      'Content-Type': 'application/json',
      authorization: this._token
    };

  }
  _checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getMyUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfo(userObject) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userObject.name,
        about: userObject.about
      })
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  editAvatar(avatarObject) {
    return fetch(`${this._address}/users/me/avatar/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarObject.avatar
      })
    })
      .then(this._checkResponse)
  }

  addCard(cardObject) {
    return fetch(`${this._address}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardObject.name,
        link: cardObject.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  putLike(cardJSON) {
    return fetch(`${this._address}/cards/${cardJSON._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteLike(cardJSON) {
    return fetch(`${this._address}/cards/${cardJSON._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);

  }
}
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '0dd0d459-95f6-44a8-af29-6effe65b34b3'
})



export default api;

