class Api {
  constructor({basePath, headers}) {
    // this._token = token;
    this._basePath = basePath;
    this._headers = headers;
  }
  _getJson(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);

  }
  
  getCurrentUser() {
    const p = fetch(`${this._basePath}/users/me`, {
      method: "GET",
      headers: this._getHeaders()
    })
    return p.then(this._getJson);
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    }
  }

  getInitialCards() {
    const p = fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders()
    })
    return p.then(this._getJson);
  }

  createCard(item) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(item)
    }).then(this._getJson);
  }
  // другие методы работы с API

  deleteCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId} `, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  editProfile(username, aboutMe) {
    const p = fetch(`${this._basePath}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: username,
        about: aboutMe
      })
    }
    )
    return p.then(this._getJson);
  }

  editProfileAvatar(avatar) {
    const p = fetch(`${this._basePath}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar
      })
    }
    )
    return p.then(this._getJson);
  }

  deleteLike(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  addLike(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

}
const basePath = "http://novelthunderstorm.nomoreparties.sbs/api";
const api = new Api({basePath, headers: {
  'Accept': 'application/json',
  "Content-Type": "application/json",
},
});
export default api;