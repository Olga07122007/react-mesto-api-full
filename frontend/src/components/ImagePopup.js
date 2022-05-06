function ImagePopup({ card, onPopupClose }) {
	return (
		<div className={`popup popup_type_image ${card && 'popup_opened'}`}>
			<div className="popup__container popup__container_type_image">
				<img className="popup__image" src={card && card.link} alt={card && card.name} />
				<p className="popup__description">{card && card.name}</p>
				<button type="button" className="popup__close-icon" onClick={onPopupClose} />
			</div>
		</div>
	);
}

export default ImagePopup;