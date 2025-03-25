import { useState, useEffect } from 'react'
import './Header.scss'

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

        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#glavnaya" className="nav-link">Главная</a>
            </li>
            <li className="nav-item">
              <a href="#socials" className="nav-link">Обмен</a>
            </li>
            <li className="nav-item">
              <a href="#contacts" className="nav-link">Контакты</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
