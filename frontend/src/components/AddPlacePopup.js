import React from "react";
import PopupWithForm from "./PopupWithForm"
function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    React.useEffect(() => {
        handleLinkChange('');
        handleNameChange('');
    }, [props.isOpen]);


    function handleLinkChange(value) {
        setLink(value);
    }
    function handleNameChange(value) {
        setName(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const item = { name, link }
        props.onAddPlace(item);
    }


    return (
        <PopupWithForm title={`Новое место`} name={'addcard'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.buttonText}>
            <label className="popup__label">
                <input placeholder="Название" value={name} onChange={e => handleNameChange(e.target.value)} name="name" id="popup-addcard-name" type="text" minLength="2" maxLength="30"
                    className="popup__input" required />
                <span className="popup__form-input-error popup-addcard-name-input-error"></span>
            </label>
            <label className="popup__label">
                <input placeholder="Ссылка на картинку" value={link} onChange={e => handleLinkChange(e.target.value)} name="link" id="popup-addcard-link" type="url"
                    className="popup__input" required />
                <span className="popup__form-input-error popup-addcard-link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup;