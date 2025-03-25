import { useEffect, useRef } from 'react'
import './Stars.scss'

const Stars = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const stars = []
    const starCount = 100
    const colors = ['#6eff00', '#ff00e5', '#ffee00', '#00ffff']

    // Установка размеров canvas по размеру окна
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Инициализация звезд
    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          blinking: Math.random() > 0.7, // Некоторые звезды будут мигать
          blinkSpeed: Math.random() * 0.02 + 0.005,
          blinkDirection: 1
        })
      }
    }

    // Отрисовка звезд
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = star.opacity
        ctx.shadowBlur = 10
        ctx.shadowColor = star.color
        ctx.fill()

        // Обновляем позицию звезды
        star.y += star.speed

        // Если звезда выходит за пределы экрана, возвращаем ее наверх
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Анимация мигания для некоторых звезд
        if (star.blinking) {
          star.opacity += star.blinkSpeed * star.blinkDirection

          if (star.opacity >= 1 || star.opacity <= 0.2) {
            star.blinkDirection *= -1
          }
        }
      })

      // Запрашиваем следующий кадр
      requestAnimationFrame(drawStars)
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
      resizeCanvas()
      initStars()
    })

    // Инициализация
    resizeCanvas()
    initStars()
    drawStars()

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="stars-canvas" />
}

export default Stars
