import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "./../images/__logo.svg"
function Header(props) {
  const location = useLocation();
  function handleSignOut() {
    props.onSignOut();
  }

  return (
    <header className="header">
      <div className='header__container'>
        <img className="header__logo" src={logo} alt="Место" />
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">Войти</Link>
        )}
        {location.pathname === '/' && (
          <>
            {/* <button className={`header__nav-btn`} ></button> */}
            <nav className="header__nav">
              <span className="header__email">{props.Email}</span>
              <button className="header__signOut" onClick={handleSignOut}>Выйти</button>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}
export default Header;