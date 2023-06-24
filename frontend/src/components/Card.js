import React, { useContext } from 'react';
import CurrentUserContext from './../context/CurrentUserContext'
function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `gallary__trash ${isOwn ? 'gallary__trash_hidden' : 'gallary__trash_visible'}`
  );
  const cardLikeButtonClassName = (
    `gallary__like ${isLiked ? 'gallary__like_active' : ''}`
  );

  return (
    <li className="gallary__item">
      <figure className="gallary__figure">
        <button onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
        <img className="gallary__image" onClick={handleClick} src={props.card.link} alt={`${props.card.name}`} />
        <figcaption className="gallary__figcaption">
          <h3 className="gallary__figcaption-title">{props.card.name}</h3>
          <div className="gallary__like-counter">
            <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
            <p className="gallary__counter">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}
export default Card;