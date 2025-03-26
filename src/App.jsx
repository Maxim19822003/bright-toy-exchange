import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import Stars from './components/Stars'
import FontPreloader from './components/FontPreloader'
import './App.scss'
import PrizesPage from './pages/PrizesPage'
import { Link } from 'react-router-dom';

// Компонент боковой машины с игрушками
const SideMachine = ({ side }) => {
  return (
    <div className={`side-claw-machine ${side}`}>
      <div className="machine-glass">
        {Array(5).fill().map((_, index) => (
          <div
            key={index}
            className="toy"
            style={{
              position: 'absolute',
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 65%)`,
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 70}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
              zIndex: 1
            }}
          />
        ))}
      </div>
      <div className="machine-bottom">
        <div className="controls">
          <div className="control"></div>
          <div className="control"></div>
        </div>
        <div className="prize-slot"></div>
      </div>
    </div>
  )
}

// Компонент плавающей монеты
const FloatingCoin = ({ style }) => (
  <div
    className="floating-coin"
    style={{
      ...style,
      animationDelay: `${Math.random() * 3}s`
    }}
  />
)

// Компонент для отслеживания прокрутки при изменении маршрута
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Домашняя страница
const HomePage = () => {
  return (
    <>
      <Stars />

      {/* Декоративные элементы по всей странице */}
      <div className="decorative-elements">
        <FloatingCoin style={{ top: '15%', left: '8%' }} />
        <FloatingCoin style={{ top: '25%', right: '12%' }} />
        <FloatingCoin style={{ top: '65%', left: '5%' }} />
        <FloatingCoin style={{ top: '85%', right: '7%' }} />
        <FloatingCoin style={{ top: '45%', left: '15%' }} />
        <FloatingCoin style={{ top: '75%', right: '18%' }} />
      </div>

      {/* Боковые автоматы с игрушками */}
      <SideMachine side="left" />
      <SideMachine side="right" />

      <Header />
      <main>
        <Hero />
        <Gallery />
        <SocialLinks />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Проверка загрузки шрифтов
    const checkFontsLoaded = () => {
      if (document.body.classList.contains('fonts-loaded')) {
        setFontsLoaded(true)
      } else {
        setTimeout(checkFontsLoaded, 100)
      }
    }

    setTimeout(checkFontsLoaded, 200)
  }, [])

  return (
    <BrowserRouter basename="/bright-toy-exchange">
      {/* Компонент для предзагрузки шрифтов */}
      <FontPreloader />

      {isLoading ? (
        <div className="loading-screen">
          <div className="claw-loader">
            <div className="claw-base"></div>
            <div className="claw-arm"></div>
            <div className="claw-grip left"></div>
            <div className="claw-grip right"></div>
            <div className="toy-being-grabbed"></div>
          </div>
          <h2 className="loading-text">Загрузка...</h2>
        </div>
      ) : (
        <div className={`app-container ${fontsLoaded ? 'fonts-ready' : ''}`}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prizes" element={<PrizesPage />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App