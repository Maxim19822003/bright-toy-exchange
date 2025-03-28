import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.scss'

// Компонент висячей клешни
const HangingClaw = ({ position, color = '#ff00e5', animationDelay = 0 }) => {
  const clawRef = useRef(null)

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
  }, [animationDelay])

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

// Компонент машины с игрушками
const ToyMachine = ({ side }) => {
  return (
    <div className={`toy-machine toy-machine-${side}`}>
      <div className="machine-top">
        <div className="machine-light"></div>
      </div>
      <div className="machine-body">
        <div className="machine-glass">
          <div className="machine-toys">
            {Array(6).fill().map((_, index) => (
              <div
                key={index}
                className="toy"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 65%)`,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 70}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                <div className="toy-face"></div>
              </div>
            ))}
          </div>
          <div className="machine-claw">
            <div className="claw-rope"></div>
            <div className="claw-base"></div>
            <div className="claw-arm left"></div>
            <div className="claw-arm right"></div>
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

// Компонент автомата внизу
const BottomMachine = () => (
  <div className="bottom-machine">
    <div className="machine-body">
      <div className="machine-glass">
        <div className="claw-rope"></div>
        <div className="machine-toy toy-1"></div>
        <div className="machine-toy toy-2"></div>
        <div className="machine-toy toy-3"></div>
        <div className="machine-toy toy-4"></div>
      </div>
      <div className="machine-control">
        <div className="control-button"></div>
      </div>
    </div>
  </div>
)

const Hero = () => {
  const clawRef = useRef(null)

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
          <ToyMachine side="left" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title gradient-title">
            ИГРАЙ, СОБИРАЙ И МЕНЯЙ!
          </h1>

          <p className="hero-description">
            Выиграл игрушку в автомате? Меняй её на крутые призы!
          </p>

          <div className="hero-claw-image" ref={clawRef}>
            <div className="claw-machine-wrapper">
              <div className="claw-head"></div>
              <div className="claw-arm left"></div>
              <div className="claw-arm right"></div>
              <div className="grabbed-toy"></div>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#socials" className="neon-button neon-button-primary">
              ОБМЕН ИГРУШЕК
            </a>
          </div>
        </div>

        <div className="right-machine-wrapper">
          <ToyMachine side="right" />
        </div>

        {/* Боковые висящие клешни */}
        <HangingClaw position={{ left: '2%', top: '100px' }} color="#ff00e5" animationDelay={0.3} />
        <HangingClaw position={{ right: '2%', top: '150px' }} color="#00ffff" animationDelay={0.9} />
        <HangingClaw position={{ left: '5%', top: '400px' }} color="#00ffff" animationDelay={1.5} />
        <HangingClaw position={{ right: '5%', top: '350px' }} color="#ff00e5" animationDelay={0.1} />

        {/* Автомат внизу */}
        <BottomMachine />
      </div>
    </section>
  )
}

export default Hero
