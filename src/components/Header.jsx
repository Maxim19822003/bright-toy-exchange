import { useState, useEffect } from 'react'
import './Header.scss'
import { Link, useLocation } from 'react-router-dom';

// Упрощенная версия клешни с HTML и CSS
const ClawLogo = () => {
  return (
    <div className="logo-claw-icon">
      <div className="claw-container">
        <div className="claw-base"></div>
        <div className="claw-arm left"></div>
        <div className="claw-arm right"></div>
      </div>
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <ClawLogo />
          <span className="logo-text">
            <span className="gradient-text">МеняйКа!</span>
          </span>
        </div>

        // В Header.jsx найдите навигационное меню
<nav>
  <ul className="nav-list">
    <li className="nav-item">
      <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
        Главная
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/prizes" className={location.pathname === "/prizes" ? "nav-link active" : "nav-link"}>
        Призы
      </Link>
    </li>
    <li className="nav-item">
      {/* Изменить эту ссылку */}
      <Link 
        to="/#contacts" 
        className={location.pathname === "/contacts" ? "nav-link active" : "nav-link"}
        onClick={(e) => {
          e.preventDefault();
          
          // Если мы уже на главной странице, просто скроллим к контактам
          if (location.pathname === "/") {
            document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
          } else {
            // Если мы на другой странице, переходим на главную и затем скроллим
            window.location.href = "/bright-toy-exchange/#contacts";
          }
        }}
      >
        Контакты
      </Link>
    </li>
  </ul>
</nav>
      </div>
    </header>
  )
}

export default Header
