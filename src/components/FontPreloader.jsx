import { useEffect } from 'react';

/**
 * Компонент для предзагрузки шрифтов перед отображением контента
 * Это поможет с проблемой FOUT (Flash of Unstyled Text)
 */
const FontPreloader = () => {
  useEffect(() => {
    // Создаем элемент для предзагрузки шрифта
    const preloadFont = (weight) => {
      const fontLoader = document.createElement('div');
      fontLoader.style.fontFamily = 'Baloo 2';
      fontLoader.style.fontWeight = weight;
      fontLoader.style.position = 'absolute';
      fontLoader.style.visibility = 'hidden';
      fontLoader.style.pointerEvents = 'none';
      fontLoader.style.width = '0';
      fontLoader.style.height = '0';
      fontLoader.textContent = 'Загрузка шрифта';
      document.body.appendChild(fontLoader);
    };

    // Предзагружаем все варианты весов шрифта
    [400, 500, 600, 700, 800].forEach(preloadFont);

    // Ставим специальный CSS-класс на body после загрузки шрифтов
    // Это может использоваться для плавного показа контента после загрузки шрифтов
    const timeout = setTimeout(() => {
      document.body.classList.add('fonts-loaded');
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null; // Этот компонент не рендерит ничего в DOM
};

export default FontPreloader;
