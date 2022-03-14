import api from '../utils/api.js';
import React, { useEffect, useState, useContext } from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked) // меняем статус лайка на противоположный
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  useEffect(() => {
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
          <img src={currentUser?.avatar} alt="Фото пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button">
          </button>
          <p className="profile__occupation">{currentUser?.about}</p>
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
            onCardLike={handleCardLike}
          />

        ))}
      </section>

    </main>

  )
}
export default Main;