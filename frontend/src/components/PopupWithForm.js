function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, buttonText }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className="popup__close"></button>
        <h3 className="popup__title">{title}</h3>
        <form name={`popup__${name}`} onSubmit={onSubmit} className={`popup__form popup__form_${name}`} noValidate>
          {children}
          <button className="popup__submit" type="submit">{`${buttonText}`}</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;