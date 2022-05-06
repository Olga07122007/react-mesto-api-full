import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup({ isOpen, onPopupClose, onAddCard, isLoading }) {
	//переменные состояния названия и адреса новой карточки
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	
	function handleChangeTitle(e) {
    setTitle(e.target.value);
	}
	
	function handleChangeUrl(e) {
    setUrl(e.target.value);
  }
	
	//добавление новой карточки
	function handleSubmit(e) {
		e.preventDefault();
		onAddCard(title, url);
		setTitle('');
		setUrl('');
	}
  
	return (
		<PopupWithForm 
			title="Новое место"
			name="add"
			buttonSave="Создать"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
		>	
			<input type="text" value={title} onChange={handleChangeTitle} name="titleInput" id="title-input" className="popup__text popup__text_type_name" placeholder="Название" required minLength="2" maxLength="30" />
			<span className="popup__error title-input-error"></span>
			<input type="url" value={url} onChange={handleChangeUrl} name="urlInput" id="url-input" className="popup__text popup__text_type_about" placeholder="Ссылка на картинку" required />
			<span className="popup__error url-input-error"></span>
		</PopupWithForm>
	);
}

export default AddPlacePopup;