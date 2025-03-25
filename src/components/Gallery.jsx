import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Gallery.scss';

// Импортируем все шесть изображений из assets
import toy1 from '../assets/toy1.jpg';
import toy2 from '../assets/toy2.jpg';
import toy3 from '../assets/toy3.jpg';
import toy4 from '../assets/toy4.jpg';
import toy5 from '../assets/toy5.jpg';
import toy6 from '../assets/toy6.jpg';

// Компонент рамки галереи с предустановленным изображением
const GalleryItem = ({ index, imageSrc, altText }) => {
  const itemRef = useRef(null);

  // Анимации при наведении
  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05, 
        duration: 0.3,
        ease: "power1.out",
        boxShadow: '0 0 25px rgba(255, 0, 229, 0.7), 0 0 40px rgba(0, 255, 136, 0.5) inset'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
        boxShadow: '0 0 15px rgba(255, 0, 229, 0.5), 0 0 30px rgba(0, 255, 136, 0.3) inset'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className={`gallery-item gallery-item-${index}`} 
      ref={itemRef}
    >
      <div className="frame-decoration top-left"></div>
      <div className="frame-decoration top-right"></div>
      <div className="frame-decoration bottom-left"></div>
      <div className="frame-decoration bottom-right"></div>
      
      {imageSrc ? (
        <div className="image-container">
          <img src={imageSrc} alt={altText || `Галерея изображение ${index}`} />
        </div>
      ) : (
        <div className="image-placeholder">
          <div className="placeholder-text">Изображение {index}</div>
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    // Animate gallery items on load
    gsap.fromTo(
      container.querySelectorAll('.gallery-item'),
      { 
        y: 50, 
        opacity: 0,
        rotateX: -10,
        rotateY: 0
      },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        rotateY: 0,
        stagger: 0.1, 
        duration: 0.8,
        ease: "power2.out" 
      }
    );

    // Одинаковая плавающая анимация для всех элементов
    container.querySelectorAll('.gallery-item').forEach((item) => {
      const randomDelay = Math.random() * 2;
      const fixedY = 8; // Фиксированная амплитуда для всех
      
      gsap.to(item, {
        y: fixedY,
        duration: 2, // Одинаковая длительность
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: randomDelay
      });
    });
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title gradient-title">Наша Галерея</h2>
        <p className="section-description">
          Смотрите, какие игрушки и призы можно выиграть и обменять в наших автоматах!
        </p>

        <div className="gallery-container" ref={galleryRef}>
          <GalleryItem index={1} imageSrc={toy1} altText="Игрушка 1" />
          <GalleryItem index={2} imageSrc={toy2} altText="Игрушка 2" />
          <GalleryItem index={3} imageSrc={toy3} altText="Игрушка 3" />
          <GalleryItem index={4} imageSrc={toy4} altText="Игрушка 4" />
          <GalleryItem index={5} imageSrc={toy5} altText="Игрушка 5" />
          <GalleryItem index={6} imageSrc={toy6} altText="Игрушка 6" />
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="hanging-claw left"></div>
      <div className="hanging-claw right"></div>
      <div className="floating-coin coin-1"></div>
      <div className="floating-coin coin-2"></div>
    </section>
  );
};

export default Gallery;