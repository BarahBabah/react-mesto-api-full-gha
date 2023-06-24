import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const url = ref.current.value;
        props.onUpdateAvatar({
            avatar: url
        });
    }

    return (
        <PopupWithForm title={`Обновить аватар`} name={'avatar'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.buttonText}>
            <label className="popup__label">
                <input placeholder="Ссылка на картинку" ref={ref} name="link" id="popup-avatar-link" type="url" className="popup__input"
                    required />
                <span className="popup__form-input-error popup-avatar-link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;