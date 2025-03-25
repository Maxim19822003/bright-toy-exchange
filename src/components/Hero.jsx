import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.scss'

// Компонент висячей клешни
const HangingClaw = ({ position, color = '#ff00e5', animationDelay = 0 }) => {
  const clawRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false) // Добавлено состояние для отслеживания открытия/закрытия
  
  useEffect(() => {
    const element = clawRef.current
    if (!element) return

    // Анимация плавного покачивания
    gsap.to(element, {
      rotation: "5deg",
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: animationDelay,
      transformOrigin: "top center"
    })
    
    // Добавляем интервал для открытия/закрытия клешни
    const interval = setInterval(() => {
      setIsOpen(prev => !prev)
    }, 3000 + Math.random() * 1000) // Интервал 3-4 секунды
    
    return () => {
      clearInterval(interval)
    }
  }, [animationDelay])
  
  // Анимация открытия/закрытия клешни с помощью GSAP
  useEffect(() => {
    const leftArm = clawRef.current?.querySelector('.claw-arm-left')
    const rightArm = clawRef.current?.querySelector('.claw-arm-right')
    
    if (!leftArm || !rightArm) return
    
    if (isOpen) {
      // Открываем клешню
      gsap.to(leftArm, {
        rotation: 5, // Увеличиваем угол для более заметной анимации
        duration: 1.5,
        ease: "power2.out"
      })
      
      gsap.to(rightArm, {
        rotation: -5, // Увеличиваем угол для более заметной анимации
        duration: 1.5,
        ease: "power2.out"
      })
    } else {
      // Закрываем клешню
      gsap.to(leftArm, {
        rotation: -10, // Возвращаем к исходному углу
        duration: 1.5,
        ease: "power2.in"
      })
      
      gsap.to(rightArm, {
        rotation: 10, // Возвращаем к исходному углу
        duration: 1.5,
        ease: "power2.in"
      })
    }
  }, [isOpen])

  return (
    <div
      className="hanging-claw-element"
      ref={clawRef}
      style={{
        left: `${position.left || 'auto'}`,
        right: `${position.right || 'auto'}`,
        top: `${position.top || '0px'}`
      }}
    >
      <div className="claw-rope"></div>
      <div className="claw-head" style={{ borderColor: color }}></div>
      <div className="claw-arm claw-arm-left" style={{ borderColor: color }}></div>
      <div className="claw-arm claw-arm-right" style={{ borderColor: color }}></div>
    </div>
  )
}

// Компонент с видео аппарата
const VideoMachine = ({ side, videoSrc }) => {
  const [isClawOpen, setIsClawOpen] = useState(false) // Состояние для клешни
  
  // Эффект для анимации клешни
  useEffect(() => {
    const interval = setInterval(() => {
      setIsClawOpen(prev => !prev)
    }, 3500 + Math.random() * 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className={`video-machine video-machine-${side}`}>
      <div className="machine-top">
        <div className="machine-light"></div>
      </div>
      <div className="machine-body">
        <div className="machine-glass">
          <video 
            className="machine-video" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          
          {/* Добавляем анимированную клешню поверх видео */}
          <div className={`machine-claw ${isClawOpen ? 'open' : 'closed'}`}>
            <div className="claw-rope"></div>
            <div className="claw-head"></div>
            <div className="claw-arm claw-arm-left"></div>
            <div className="claw-arm claw-arm-right"></div>
          </div>
        </div>
      </div>
      <div className="machine-bottom">
        <div className="control-panel">
          <div className="joystick"></div>
          <div className="button"></div>
        </div>
        <div className="prize-slot"></div>
      </div>
    </div>
  )
}

const Hero = () => {
  const clawRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Определяем, мобильное устройство или нет
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 992)
    }
    
    // Проверяем при загрузке
    checkIsMobile()
    
    // Проверяем при изменении размера окна
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    // Анимация парящего эффекта
    const element = clawRef.current
    if (!element) return

    gsap.to(element, {
      y: -15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }, [])

  // Пути к видео
const video1 = '/bright-toy-exchange/videos/video1.mp4'; // Для левого и центрального (мобильного) аппарата
const video2 = '/bright-toy-exchange/videos/video2.mp4'; // Для правого аппарата

  return (
    <section className="hero" id="glavnaya">
      {/* Висящие клешни сверху */}
      <div className="hanging-claws-container">
        <HangingClaw position={{ left: '10%', top: '-20px' }} color="#00ffff" animationDelay={0.2} />
        <HangingClaw position={{ left: '25%', top: '-40px' }} color="#ff00e5" animationDelay={0.7} />
        <HangingClaw position={{ right: '25%', top: '-30px' }} color="#00ffff" animationDelay={1.1} />
        <HangingClaw position={{ right: '10%', top: '-50px' }} color="#ff00e5" animationDelay={0.5} />
      </div>
      
      <div className="container hero-container">
        <div className="left-machine-wrapper">
          <VideoMachine side="left" videoSrc={video1} />
        </div>

        <div className="hero-content">
          <h1 className="hero-title gradient-title">
            ИГРАЙ
            СОБИРАЙ
            МЕНЯЙ!
          </h1>

          <p className="hero-description">
            Выиграл игрушки в автомате? Меняй их на крутые призы!
          </p>

          {/* Центральная клешня/видео - показываем только на мобильных */}
          {isMobile && (
            <div className="hero-video-center">
              <VideoMachine side="center" videoSrc={video1} />
            </div>
          )}

          <div className="hero-actions">
            <a href="#socials" className="neon-button neon-button-primary">
              ОБМЕН ИГРУШЕК
            </a>
          </div>
        </div>

        <div className="right-machine-wrapper">
          <VideoMachine side="right" videoSrc={video2} />
        </div>

        {/* Боковые висящие клешни */}
        <HangingClaw position={{ left: '2%', top: '100px' }} color="#ff00e5" animationDelay={0.3} />
        <HangingClaw position={{ right: '2%', top: '150px' }} color="#00ffff" animationDelay={0.9} />
        <HangingClaw position={{ left: '5%', top: '400px' }} color="#00ffff" animationDelay={1.5} />
        <HangingClaw position={{ right: '5%', top: '350px' }} color="#ff00e5" animationDelay={0.1} />
      </div>
    </section>
  )
}

export default Hero
