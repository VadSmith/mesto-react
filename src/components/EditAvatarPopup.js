import React, { useEffect, useState, useContext, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditAvatarPopup(props) {
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef();
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // обработка поля имени
  function handleAvatarUrlChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }


  // // После загрузки текущего пользователя из API
  // // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);


  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      onCLose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        required
        onChange={handleAvatarUrlChange}
        ref={avatarRef}
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


  )
}