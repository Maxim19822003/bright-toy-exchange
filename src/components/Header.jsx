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
      <Link to="/contacts" className={location.pathname === "/contacts" ? "nav-link active" : "nav-link"}>
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
