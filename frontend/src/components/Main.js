import React, { useContext } from 'react';
import api from './../utils/Api'
import Card from './Card';
import CurrentUserContext from './../context/CurrentUserContext'
function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-background">
          <img className="profile__avatar" onClick={props.onEditAvatar} src={currentUser.avatar} alt="аватар" />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" onClick={props.onEditProfile} className="profile__edit-button"></button>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="profile__add-button"></button>

      </section>
      <section className="gallary">
        <div className="popup popup_view-card">
          <div className="popup__container popup__container_view-card">
            <button type="button" className="popup__close"></button>
            <img src="#" alt="name" className="popup__view-card-image" />
            <h2 className="popup__view-card-title"></h2>
          </div>
        </div>
        <ul className="gallary__list">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}
export default Main;