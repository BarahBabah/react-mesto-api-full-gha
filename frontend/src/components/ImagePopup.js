function ImagePopup(props) {
  return (
    <div className={`popup popup_view-card ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_view-card">
        <button type="button" onClick={props.onClose} className="popup__close"></button>
        <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} className="popup__view-card-image" />
        <h2 className="popup__view-card-title">{props.card ? props.card.name : ''}</h2>
      </div>
    </div>
  )
}
export default ImagePopup;