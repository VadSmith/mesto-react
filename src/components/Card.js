function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button type="button" className="element__remove-button"></button>
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__photo"
      />
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-section">
          <button className="element__heart" type="button"></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}
export default Card;