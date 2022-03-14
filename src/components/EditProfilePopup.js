import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // console.log(currentUser);

  // обработка поля имени
  function handleNameChange(event) {
    setName(event.target.value);
  }

  // обработка поля описания
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    // console.log('currentUser', currentUser);
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (

    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      onCLose={props.onClose}
      isOpen={props.isOpen}
    >
      <input
        onChange={handleNameChange}
        name="name"
        id="name-input"
        className="popup__input popup__input_type_name"
        // placeholder="Имя"
        placeholder={name}
        minLength="2"
        maxLength="40"
        type="text"
        required
        autoFocus
      />
      <span
        id="name-input-error"
        className="popup__error"
      >
      </span>
      <input
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
        type="text"
        name="about"
        id="occupation-input"
        className="popup__input popup__input_type_job"
        // placeholder="Работа"
        placeholder={description}
      />
      <span
        id="occupation-input-error"
        className="popup__error"
      >
      </span>
    </PopupWithForm>
  )
}
