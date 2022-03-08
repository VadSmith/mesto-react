import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className="page">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonText="Сохранить"
        onCLose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
      >
        <input
          required
          minLength="2"
          maxLength="40"
          type="text"
          name="name"
          id="name-input"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          autoFocus
        />
        <span
          id="name-input-error"
          className="popup__error"
        >
        </span>
        <input
          required
          minLength="2"
          maxLength="200"
          type="text"
          name="about"
          id="occupation-input"
          className="popup__input popup__input_type_job"
          placeholder="Работа"
        />
        <span
          id="occupation-input-error"
          className="popup__error"
        >
        </span>
      </PopupWithForm>

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

  );
}

export default App;
