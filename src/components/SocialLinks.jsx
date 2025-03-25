import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faVk } from '@fortawesome/free-brands-svg-icons'
import './SocialLinks.scss'

const SocialLinks = () => {
  return (
    <section className="social-links" id="socials">
      <div className="container">
        <div className="social-links-content">
          <h2 className="social-links-title">
            Где нас найти и как обменять игрушки
          </h2>

          <p className="social-links-description">
            Присоединяйся к нашим группам в социальных сетях, чтобы узнавать о новых призах,
            акциях и местах где можно найти наши автоматы!
          </p>

          <div className="social-links-buttons">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link telegram-link"
            >
              <div className="social-icon">
                <FontAwesomeIcon icon={faTelegram} />
              </div>
              <div className="social-link-content">
                <h3>Телеграм канал</h3>
                <p>Самые свежие новости и игрушки для обмена</p>
              </div>
              <div className="social-link-chevron">
                <div className="chevron"></div>
              </div>
            </a>

            <a
              href="https://vk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link vk-link"
            >
              <div className="social-icon">
                <FontAwesomeIcon icon={faVk} />
              </div>
              <div className="social-link-content">
                <h3>Группа ВКонтакте</h3>
                <p>Общение с другими любителями автоматов</p>
              </div>
              <div className="social-link-chevron">
                <div className="chevron"></div>
              </div>
            </a>
          </div>

          <div className="toy-exchange-info">
            <div className="exchange-icon">
              <div className="exchange-icon-left"></div>
              <div className="exchange-icon-right"></div>
            </div>

            <div className="exchange-content">
              <h3>Как происходит обмен</h3>
              <ol>
                <li>Выиграй игрушки в наших автоматах</li>
                <li>Свяжись с оператором по обмену</li>
                <li>Выбери приз</li>
                <li>Приходи к аппарату с игрушками для обмена</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="social-links-background">
        <div className="social-bg-circle circle-1"></div>
        <div className="social-bg-circle circle-2"></div>
        <div className="social-bg-circle circle-3"></div>
      </div>
    </section>
  )
}

export default SocialLinks
