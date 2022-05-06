import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onPopupClose, onUpdateAvatar, isLoading }) {
	//реф
	const inputRef = useRef(null);
	
	//изменение аватара
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(
			inputRef.current.value
		);
		inputRef.current.value='';
	} 
	
	return (
		<PopupWithForm 
			title="Обновить аватар" 
			name="avatar"
			buttonSave="Сохранить"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
		>	
			<input ref={inputRef} type="url" name="urlAvatarInput" id="url-avatar-input" className="popup__text popup__text_type_about" placeholder="Ссылка на аватар" required />
			<span className="popup__error url-avatar-input-error"></span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;