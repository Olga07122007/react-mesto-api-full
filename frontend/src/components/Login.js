import { useState } from 'react';

function Login({ handleLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	//управляемые инпуты
	function handleChangeEmail(e) {
    setEmail(e.target.value);
	}
	
	function handleChangePassword(e) {
    setPassword(e.target.value);
  }
	
	//авторизация
	function handleSubmit(e) {
		e.preventDefault();
		handleLogin(password, email);
	} 
	
	return (
		<div className="register">
				<div className="register__container">
					<h3 className="register__title">Вход</h3>
						<form name="formlogin" className="register__input" noValidate onSubmit={handleSubmit}>
							<input type="email" value={email} onChange={handleChangeEmail} className="register__text" placeholder="E-mail" required minLength="2" maxLength="40" />
							<input type="password" value={password} onChange={handleChangePassword} className="register__text" placeholder="Пароль" required minLength="2" maxLength="200" />
							<button type="submit" className="register__save-btn" >Войти</button>
						</form>
				</div>
			</div>
	);
}

export default Login;