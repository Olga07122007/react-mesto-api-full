import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Register({ handleRegister }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	//управляемые инпуты
	function handleChangeEmail(e) {
    setEmail(e.target.value);
	}
	
	function handleChangePassword(e) {
    setPassword(e.target.value);
  }
	
	//регистрация
	function handleSubmit(e) {
		e.preventDefault();
		handleRegister(password, email);
	} 
	
	return (
		<div className="register">
				<div className="register__container">
					<h3 className="register__title">Регистрация</h3>
						<form name="formregister" className="register__input" noValidate onSubmit={handleSubmit}>
							<input type="email" value={email} onChange={handleChangeEmail} className="register__text" placeholder="E-mail" required minLength="2" maxLength="40" />
							<input type="password" value={password} onChange={handleChangePassword} className="register__text" placeholder="Пароль" required minLength="2" maxLength="200" />
							<button type="submit" className="register__save-btn" >Зарегистрироваться</button>
						</form>
						<NavLink to="/sign-in" className="register__link">Уже зарегистрированы? Войти</NavLink>
				</div>
			</div>
	);
}

export default Register;