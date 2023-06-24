import React from "react";
import successImg from './../../src/images/access.svg'
import unsuccesssImg from './../../src/images/unaccess.svg'
function InfoTooltip(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_infoTooltip">
                <button type="button" className="popup__close" onClick={props.onClose} />
                <img className="popup__signup-img" src={`${props.isSuccess
                    ? successImg
                    : unsuccesssImg
                    }`} alt={`${props.isSuccess ? 'Success' : `Unsuccess`}`} />
                <h2 className="popup__signup-title">{`${props.isSuccess
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."
                    }`}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip