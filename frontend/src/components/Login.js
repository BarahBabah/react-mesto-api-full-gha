import React, { useState } from 'react';
const Login = ({ onAuthorize }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })
  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize(formValue.email, formValue.password);
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
        <form name="login" className="auth__form" id="login-form" noValidate onSubmit={handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <input name="email" className="auth__input" type="text" placeholder="Email" value={formValue.email} onChange={handleChange} />
          <input name="password" className="auth__input" type="password" autoComplete="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
          <button type="submit" className="auth__button" >Войти</button>
        </form>
      </div>
    </div>
  )
}
export default Login;