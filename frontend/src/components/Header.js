import headerLogo from '../images/header/header-logo.svg';
import headerCloseIcon from '../images/header/header-closeIcon.svg';
import headerBurger from '../images/header/header-burger.svg';
import { Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header({ email, signOut, loggedIn, headerStatus, showHeaderMenu }) {
	const [headerIcon, setHeaderIcon] = useState('');
	
	//изменение иконки хедера
	useEffect(() => {
		!headerStatus ? setHeaderIcon(headerBurger) : setHeaderIcon(headerCloseIcon);
	}, [headerStatus]); 
	
	function chengeHeaderMenu() {
		showHeaderMenu();
	}		
	
	return (
		<header className={`header ${loggedIn ? 'header_mobile' : ''}`}>
			<div className={`${loggedIn ? 'header__logo-container' : ''}`}>
				<img className={`header__logo ${loggedIn ? 'header__logo_mobile' : ''}`} src={headerLogo} alt="Место" />
				<img className={`${loggedIn ? 'header__icon' : ''}`} src={`${loggedIn ? headerIcon : ''}`} onClick={chengeHeaderMenu} />
			</div>	
			<div className={`header__links ${loggedIn ? 'header__links_mobile' : ''} ${headerStatus ? 'header__links_visible' : ''}`}>
				<p className={`header__link ${loggedIn ? 'header__link_mobile' : ''}`}>{email||''}</p>
				
				<Route exact path="/">
					<button className={`header__link ${loggedIn ? 'header__link_mobile' : ''} header__button ${loggedIn ? 'header__button_mobile' : ''}`} onClick={signOut}>Выйти</button>
				</Route>
				<Route path="/sign-up">
					<Link className={`header__link ${loggedIn ? 'header__link_mobile' : ''} header__button ${loggedIn ? 'header__button_mobile' : ''}`} to="sign-in">Войти</Link>
				</Route>
				<Route path="/sign-in">
					<Link className={`header__link ${loggedIn ? 'header__link_mobile' : ''} header__button ${loggedIn ? 'header__button_mobile' : ''}`} to="sign-up">Регистрация</Link>
				</Route>
			</div>
		</header>
	);
}

export default Header;