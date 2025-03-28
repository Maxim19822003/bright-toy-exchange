import './Footer.scss'

// Упрощенная версия клешни с HTML и CSS
const FooterClawLogo = () => {
  return (
    <div className="footer-logo-claw">
      <div className="claw-container">
        <div className="claw-base"></div>
        <div className="claw-arm left"></div>
        <div className="claw-arm right"></div>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <FooterClawLogo />
            <span className="footer-logo-text">МеняйКа!</span>
          </div>

          <div className="footer-info">
            <p className="footer-tagline">Играй с друзьями, выигрывай призы!</p>
            <p className="footer-copyright">
              &copy; {currentYear} МеняйКа!. Все права защищены.
            </p>
          </div>

          <div className="footer-contact">
            <h3>Контакты</h3>
            <p>WhatsApp: <a href="https://api.whatsapp.com/send?phone=79105489295" target="_blank" rel="noopener noreferrer">+7 910 548-92-95</a></p>
            <p>Телефон: +7 910 548-92-95</p>
            <p className="made-by">Made by <a href="#" target="_blank" rel="noopener noreferrer">Waronin</a></p>
          </div>
        </div>
      </div>

      <div className="footer-toys">
        {Array(10).fill().map((_, index) => (
          <div
            key={index}
            className="footer-toy"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 65%)`
            }}
          >
            <div className="toy-face"></div>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer
