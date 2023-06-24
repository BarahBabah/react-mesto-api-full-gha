import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
  }

  function handleChange(e) {
    const input = e.target;
    setFormValue({
      ...formValue,
      [input.name]: input.value
    });
  }
  return (
    <div className="auth">
      <div className="auth__container">
        <form name="register" className="auth__form" noValidate onSubmit={handleSubmit}>
          <h2 className="auth__title">Регистрация</h2>
          <input name="email" className="auth__input" type="text" placeholder="Email" value={formValue.email} onChange={handleChange} />
          <input name="password" className="auth__input" type="password" autoComplete="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
          <button type="submit" className="auth__button">Зарегистрироваться</button>
          <Link to="/sign-in" className="auth__button-link">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </div>
  )
}

export default Register;