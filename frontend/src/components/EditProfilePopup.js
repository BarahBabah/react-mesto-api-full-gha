import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from './../context/CurrentUserContext'
function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(``);
  const [description, setDescription] = useState(``);

  React.useEffect(() => {
    handleNameChange(`${currentUser.name}`);
    handleDescriptionChange(`${currentUser.about}`);
  }, [currentUser, props.isOpen]);

  function handleNameChange(value) {
    setName(value);
  }

  function handleDescriptionChange(value) {
    setDescription(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm title={`Редактировать профиль`} name={'about-me'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.buttonText}>
      <label className="popup__label">
        <input value={name} placeholder="Имя" name="username" id="popup-name" onChange={e => handleNameChange(e.target.value)} type="text" minLength="2" maxLength="40"
          className="popup__input" required />
        <span className="popup__form-input-error popup-name-input-error"></span>
      </label>
      <label className="popup__label">
        <input value={description} placeholder="О себе" name="job" id="popup-job" onChange={e => handleDescriptionChange(e.target.value)} type="text" minLength="2" maxLength="200"
          className="popup__input" required />
        <span className="popup__form-input-error popup-job-input-error"></span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup;