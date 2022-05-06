import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect } from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onConfirm, headerStatus, showHeaderMenu }) {
	//подписка
	const currentUser = useContext(CurrentUserContext);
	//аватар
	const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
	
	//при загрузке, меню скрыто
	useEffect(() => {
		headerStatus && showHeaderMenu();
	}, []);
	
	return (
		<>
			<section className="profile">
				<div className="profile__avatar"  style={imageStyle}  onClick={onEditAvatar} />
				<div className="profile__info">
					<div className="profile__title-container">
						<h1 className="profile__title">{currentUser.name}</h1>
						<button type="button" className="profile__edit-button" onClick={onEditProfile} />
					</div>
					<p className="profile__subtitle">{currentUser.about}</p>
				</div>
				<button type="button" className="profile__add-button" onClick={onAddPlace} />
			</section>
			
			{/*Создание карточек*/}
			<section className="elements">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onCardClick={onCardClick}
						onCardLike={onCardLike}
						onConfirm={onConfirm}
					/>
				))}
			</section>
		</>	
		
	);
}

export default Main;