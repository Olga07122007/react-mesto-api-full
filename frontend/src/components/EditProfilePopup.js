import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onPopupClose, onUpdateUser, isLoading }) {
	//подписка
	const currentUser = useContext(CurrentUserContext);
	//переменные состояния имени и профессии
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	
	//запись значений в инпуты
	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);
	
	function handleChangeName(e) {
    setName(e.target.value);
	}
	
	function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
	
	//изменение профиля пользователя
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	} 
	
	return (
		<PopupWithForm 
			title="Редактировать профиль" 
			name="edit"
			buttonSave="Сохранить"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
		>
			<input type="text" value={name||''} onChange={handleChangeName} name="nameinput" id="name-input" className="popup__text popup__text_type_name" placeholder="Имя" required minLength="2" maxLength="40" />
			<span className="popup__error name-input-error"></span>
			<input type="text" value={description||''} onChange={handleChangeAbout} name="jobinput" id="job-input" className="popup__text popup__text_type_about" placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" />
			<span className="popup__error job-input-error"></span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;