import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmPopup from './ConfirmPopup'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from '../utils/mestoAuth.js';
import successIcon from '../images/popup/popup-success-icon.svg';
import failIcon from '../images/popup/popup-fail-icon.svg';

function App() {
	const history = useHistory();
	//переменные состояния, отвечающие за видимость попапов
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
	//для ImagePopup
	const [selectedCard, setSelectedCard] = useState(null);
	//данные пользователя
	const [currentUser, setCurrentUser] = useState({});
	//переменная состояния для массива с карточками
	const [cards, setCards] = useState([]);
	//кнопка сохранения при загрузке данных на сервер
	const [isLoading, setIsLoading] = useState(false);
	//карточка для удаления
	const [selectedCardDelete, setSelectedCardDelete] = useState(null);
	//регистрация
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	//данные для InfoTooltip
	const [message, setMessage] = useState('');
	const [url, setUrl] = useState('');
	//меню мобильной версии
	const [headerStatus, setHeaderStatus] = useState(false);
  
  const [tok, setTok] = useState(localStorage.getItem('token'));
  
	//отображение начального профиля и загрузка элементов на страницу
	useEffect(() => {
    checkToken();
    if (loggedIn) {
      api._headers.authorization = `Bearer ${localStorage.getItem('token')}`
      api.getAppInfo()
			.then(([userData, cards]) => {
				setCurrentUser(userData);
        cards.reverse();
        setCards(cards);
			})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
    }
  }, [loggedIn]);
	
	//состояние для мобильной версии
	function showHeaderMenu() {
		setHeaderStatus(!headerStatus);
	}
	
	//функция открытия попапа редактирования профиля
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	
	//функция открытия попапа добавления карточки
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	
	//функция открытия попапа редактирования профиля
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	
	//функция открытия попапа перед удалением карточки
	function handleConfirmClick(card) {
		setIsConfirmPopupOpen(true);
		setSelectedCardDelete(card);
	}
	
	//функция открытия попапа успешной (не успешной) регистрации
	function handleSuccessClick() {
		setIsSuccessPopupOpen(true);
	}
	
	//функция закрытия для всех попапов
	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmPopupOpen(false);
		setIsSuccessPopupOpen(false);
		setSelectedCard(null);
		setSelectedCardDelete(null);
		setMessage('');
		setUrl('');
	}
	
	//клик по картинке
	function handleCardClick(card) {
		setSelectedCard(card);
	}
	
	//Лайк
	function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, isLiked)
				.then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
	}
	
	//Удаление карточки
	function handleCardDelete(card) {
    api.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
				closeAllPopups();
			})
		.catch(err => {
			console.log(`Ошибка: ${err}`);
		});
	}
	
	//Добавление карточки
	function handleAddPlaceSubmit(titleInput, urlInput) {
		setIsLoading(true);
		api.addCard(titleInput, urlInput)
			.then((newCard) => {
        setCards([newCard, ...cards]);
      })
			.catch(err => {
				console.log(`Ошибка1: ${err}`);
			})
			.finally(() => {
				setIsLoading(false);
				closeAllPopups();
			});
	}
	
	//обновление профиля
	function handleUpdateUser(data) {
		setIsLoading(true);
		api.editProfile(data)
		.then(result => {
			setCurrentUser(result);
		})
		.catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
		.finally(() => {
			setIsLoading(false);
			closeAllPopups();
		});
	}
	
	//обновление аватара
	function handleUpdateAvatar(data) {
		setIsLoading(true);
		api.editAvatar(data)
		.then(result => {
			setCurrentUser(result);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		})
		.finally(() => {
			setIsLoading(false);
			closeAllPopups();
		});
	}
	
	//авторизация
	function handleLogin(password, email) {
		mestoAuth.login(password, email)
			.then((res) => {
				if(res.token) {
          setLoggedIn(true);
					localStorage.setItem('token', res.token);
          setEmail(email);
					history.push('/');
				}
			})
      .catch((err) => {
				console.log(`Ошибка: ${err}`);
				setUrl(failIcon);
				setMessage('Что-то пошло не так! Попробуйте еще раз.');
				handleSuccessClick();
				history.push('/sign-in');
			});
	}
	
	//проверка токена
	function checkToken() {
		if (localStorage.getItem('token')) {
			const jwt = localStorage.getItem('token');
      mestoAuth.check(jwt)
				.then((res) => {
					setEmail(res.email);
          setLoggedIn(true);
					history.push('/');
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	}
	
	//регистрация
	function handleRegister(password, email) {
		mestoAuth.register(password, email)
			.then((res) => {
				if(res) {
					setUrl(successIcon);
					setMessage('Вы успешно зарегистрировались!');
					handleSuccessClick();
					history.push('/sign-in');
				}
			})	
			.then(() => {
				setTimeout(handleLogin, 300, password, email);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
				setUrl(failIcon);
				setMessage('Что-то пошло не так! Попробуйте еще раз.');
				handleSuccessClick();
			});
	}
	
	
	//выход
	function signOut() {
		localStorage.removeItem('token');
		setLoggedIn(false);
    setTok('nnn');
		setEmail('');
		history.push('/sign-in');
	}
	
	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header 
					email={email}
					signOut={signOut}
					loggedIn={loggedIn}
					headerStatus={headerStatus}
					showHeaderMenu={showHeaderMenu}
				/>
				
				<main className="main">
					<Switch>
						<ProtectedRoute
							exact path="/"
							loggedIn={loggedIn}
							component={Main}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onConfirm={handleConfirmClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							cards={cards}
							headerStatus={headerStatus}
							showHeaderMenu={showHeaderMenu}
						/>
					
						<Route path="/sign-up">
							<Register
								handleRegister={handleRegister}
							/>
						</Route>
						
						<Route path="/sign-in">
							<Login
								handleLogin={handleLogin}
							/>
						</Route>
						
						<Route path="*">
							<Redirect to="/sign-in" />
						</Route>
					</Switch>
				</main>
				
				{loggedIn && <Footer />}
				
				{/*попап редактирования профиля*/}
				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onPopupClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}	
				/>
				
				{/*попап добавления нового места*/}
				<AddPlacePopup 
					isOpen={isAddPlacePopupOpen} 
					onPopupClose={closeAllPopups}
					onAddCard={handleAddPlaceSubmit}
					isLoading={isLoading}
				/>
				
				{/*попап обновления аватара*/}
				<EditAvatarPopup 
					isOpen={isEditAvatarPopupOpen} 
					onPopupClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}	
				/> 
				
				{/*попап перед удалением карточки*/}
				<ConfirmPopup
					isOpen={isConfirmPopupOpen}
					onPopupClose={closeAllPopups}
					card={selectedCardDelete}
					onCardDelete={handleCardDelete}
				/>
				
				{/*попап с картинкой*/}
				<ImagePopup 
					card={selectedCard}
					onPopupClose={closeAllPopups}
				/>
				
				{/*попап удачной регистрации*/}
				<InfoTooltip
					isOpen={isSuccessPopupOpen}
					onPopupClose={closeAllPopups}
					title={message} 
					url={url}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
