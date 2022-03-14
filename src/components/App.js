import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });
  // const [currentUser, setCurrentUser] = useState(); // так не работает 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getMyUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => `ОШИБКА! Не удалось получить данные пользователя: ${err}`)
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(cardJSON) {
    setSelectedCard(cardJSON);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userObject) {
    api.setUserInfo(userObject)
      .then(response => {
        setCurrentUser({ ...response });
      })
      .catch(error => console.log('Ошибка сохранения даных юзера', error))
      .finally(
        closeAllPopups()
      )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <Footer />

        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          buttonText="Сохранить"
          onCLose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        >
          <input
            required
            type="url"
            name="avatar"
            id="avatar"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
          />
          <span
            id="avatar-error"
            className="popup__error"
          >
          </span>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="add"
          buttonText="Сохранить"
          onCLose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        >
          <input
            required
            type="text"
            name="place"
            id="place"
            className="popup__input popup__input_type_place"
            placeholder="Название"
            autoFocus
            minLength="2"
            maxLength="30"
          />
          <span
            id="place-error"
            className="popup__error">
          </span>
          <input
            required
            type="url"
            name="link"
            id="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
          />
          <span
            id="link-error"
            className="popup__error"
          >
          </span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />


      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
