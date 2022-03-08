import api from '../utils/api.js';
import React, { useEffect, useState } from 'react';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('useEffect() called');
    api.getMyUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(err => `ОШИБКА! Не удалось получить данные пользователя: ${err}`)

    api.getInitialCards()
      .then((cardsJSON) => {
        setCards(cardsJSON);
      })
      .catch(err => `ОШИБКА! Не удалось получить карточки: ${err}`)
  }, [])

  return (
    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-overlay">
          <img src={userAvatar} alt="Фото пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button">
          </button>
          <p className="profile__occupation">{userDescription}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button">
        </button>
      </section>

      <section className="elements">
        {cards.map(cardJSON => (
          <Card
            card={cardJSON}
            key={cardJSON._id}
            onCardClick={onCardClick}
          />

        ))}
      </section>

    </main>

  )
}
export default Main;