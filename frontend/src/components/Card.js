import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onConfirm }) {
	//подписка
	const currentUser = useContext(CurrentUserContext);
	//определяем добавлена ли карточка текущим пользователем
	const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
		`element__delete ${isOwn ? 'element__delete_visible' : ''}`
	); 
	
	//определяем есть ли на карточке лайк текущего пользователя
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__like ${isLiked ? 'element__like_active' : ''}`
	);  
	
	//клик по картинке
	function handleCardClick() {
		onCardClick(card);
	}
	
	//открытие попапа перед удалением карточки
	function handleConfirmClick() {
		onConfirm(card);
	}
	
	//поставить лайк
	function handleLikeClick() {
		onCardLike(card);
	}
  
	return(
		<article className="element">
			<img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
			<div className="element__title-container">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-container">
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
					<p className="element__counter">{card.likes.length}</p>
				</div>
			</div>
<button type="button" className={cardDeleteButtonClassName} onClick={handleConfirmClick} />
		</article>
	)
}

export default Card;	