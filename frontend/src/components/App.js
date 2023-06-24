// новое
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import api from './../utils/Api'
import * as auth from './../utils/auth';
import CurrentUserContext from './../context/CurrentUserContext'
// новое
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import AddPlacePopup from './AddPlacePopup';
import Register from './Register'
import Login from './Login'
import InfoTooltip from './InfoTooltip'
function App() {
  // новое
  const [currentUser, setCurrentUser] = useState(``);
  const [isLoggedIn, setloggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [profileEmail, setProfileEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [])
  useEffect(() => {
    
    if (isLoggedIn) {
      Promise.all([api.getCurrentUser(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [isLoggedIn]);

  // новое
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(response => {
          if (response) {
            setloggedIn(true)
            navigate('/');
            setProfileEmail(response.email);
          }
        })
    }
  }

  // Регистрация и авторизация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(response => {
        if (response) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          navigate('./sign-in');
        }
      }).catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }
  function handleAuthorize(email, password) {
    auth.authorize(email, password)
      .then(response => {
        if (response) {
          setloggedIn(true);
          localStorage.setItem('jwt', response.token);
          setProfileEmail(email);
          navigate('./');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }

  function handlGoOut() {
    setloggedIn(false);
    localStorage.removeItem('jwt');
    navigate('./sign-in');
    setProfileEmail('');
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);

  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then(
        (res) => {
          setCurrentUser(res);
          closeAllPopups();
        }
      ).catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editProfileAvatar(avatar)
      .then(
        (res) => {
          setCurrentUser(res);
          closeAllPopups();
        }).catch((err) => {
          console.log(err);
        })
  }

  const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   api.getInitialCards()
  //     .then((data) => {
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    (isLiked ? api.deleteLike(card._id, !isLiked) : api.addLike(card._id, !isLiked)).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      })
  }


  function handleCardDelete(card) {
    api.deleteCard(card._id).then(
      () => {
        const filteredCards = cards.filter((newCard) => newCard !== card);
        setCards(filteredCards);
      }
    ).catch((err) => {
      console.log(err);
    })
  }


  function handleAddPlaceSubmit(item) {
    api.createCard(item)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>

      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onSignOut={handlGoOut}
          Email={profileEmail}
        />
        <Routes>
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
          <Route path='/sign-in' element={<Login onAuthorize={handleAuthorize} />} />
          <Route path="/" element={<ProtectedRoute
            loggedIn={isLoggedIn}
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />} />
        </Routes>

        {isLoggedIn && <Footer />}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={`Создать`}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={`Создать`}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText='Сохранить'
        />

        <PopupWithForm
          title={'confirmation'}
          name={`confirmation`}
          buttonText='Да'
        >
          <h3 className="popup__title popup__title_confirmation">Вы уверены?</h3>
          <button className="popup__submit" type="submit">Да</button>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          name={'infoTooltip'}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
