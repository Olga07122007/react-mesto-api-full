function InfoTooltip({ isOpen, onPopupClose, title, url }) {
	
	return (
		<div className={`popup ${isOpen ? 'popup_opened': ''}`}>
			<div className="popup__container">
				<img className="popup__success-icon" src={url} />
				<h3 className="popup__title popup__title_type_register">{title}</h3>
				<button type="button" className="popup__close-icon" onClick={onPopupClose} />
			</div>
		</div>
	);
}

export default InfoTooltip;