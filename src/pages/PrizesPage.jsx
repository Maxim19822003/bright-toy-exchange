import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stars from '../components/Stars';
import '../styles/PrizesPage.scss';
import prize1Image from '../assets/prizes/prize1.jpg';
import prize2Image from '../assets/prizes/prize2.jpg';
import prize3Image from '../assets/prizes/prize3.jpg';

// Данные о призах
const PRIZES_DATA = [
  {
    id: 1,
    name: 'Плюшевый медведь',
    description: 'Мягкий и уютный плюшевый медведь',
    imageUrl: prize1Image,
    price: 50, // Цена в маленьких игрушках
    featured: true
  },
  {
    id: 2,
    name: 'Конструктор',
    description: 'Набор для сборки бижютерии',
    imageUrl: prize2Image,
    price: 25,
    featured: false
  },
  {
    id: 3,
    name: 'Настольная игра',
    description: 'Имаджинариум',
    imageUrl: prize3Image,
    price: 35,
    featured: true
  },
  {
    id: 4,
    name: 'Плюшевый единорог',
    description: 'Мягкий единорог с радужной гривой',
    imageUrl: 'https://placehold.co/300x300/FF33A8/FFF?text=Единорог',
    price: 12,
    featured: false
  },
  {
    id: 5,
    name: 'Набор кукол',
    description: 'Комплект из 3-х кукол с аксессуарами',
    imageUrl: 'https://placehold.co/300x300/33A8FF/FFF?text=Куклы',
    price: 20,
    featured: false
  },
  {
    id: 6,
    name: 'Игровая консоль',
    description: 'Портативная игровая консоль с играми',
    imageUrl: 'https://placehold.co/300x300/A833FF/FFF?text=Консоль',
    price: 30,
    featured: true
  }
];

// Компонент карточки приза
const PrizeCard = ({ prize, onAddToCart }) => {
  return (
    <div className={`prize-card ${prize.featured ? 'featured' : ''}`}>
      {prize.featured && <div className="featured-badge">Хит</div>}
      <div className="prize-image-container">
        <img src={prize.imageUrl} alt={prize.name} className="prize-image" />
      </div>
      <div className="prize-card-content">
        <h3 className="prize-name">{prize.name}</h3>
        <p className="prize-description">{prize.description}</p>
        <div className="prize-price">
          <span className="price-value">{prize.price}</span>
          <span className="price-label">игрушек</span>
        </div>
        <button 
          className="add-to-cart-btn neon-button-primary"
          onClick={() => onAddToCart(prize)}
        >
          Обменять
        </button>
      </div>
    </div>
  );
};

// Основной компонент страницы
const PrizesPage = () => {
  const [cart, setCart] = useState([]);
  const [userToys, setUserToys] = useState(50); // Предполагаем, что у пользователя есть 50 игрушек
  const [showCart, setShowCart] = useState(false);
  
  // Добавление в корзину
  const addToCart = (prize) => {
    // Проверка, хватает ли игрушек
    if (userToys < prize.price) {
      alert('У вас недостаточно игрушек для обмена!');
      return;
    }
    
    // Добавляем приз в корзину
    const existingItem = cart.find(item => item.id === prize.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === prize.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...prize, quantity: 1 }]);
    }
    
    // Уменьшаем количество игрушек
    setUserToys(userToys - prize.price);
  };
  
  // Удаление из корзины
  const removeFromCart = (prizeId) => {
    const item = cart.find(item => item.id === prizeId);
    
    if (item) {
      // Возвращаем игрушки
      setUserToys(userToys + (item.price * item.quantity));
      
      // Удаляем из корзины
      setCart(cart.filter(item => item.id !== prizeId));
    }
  };
  
  // Оформление обмена
  const checkout = () => {
    if (cart.length === 0) {
      alert('Ваша корзина пуста!');
      return;
    }
    
    alert('Поздравляем! Вы успешно обменяли игрушки на призы. Заберите их в ближайшем автомате МеняйКа!');
    setCart([]);
  };
  
  // Вычисление общей стоимости корзины
  const totalCartCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="prizes-page">
      <Stars />
      
      <Header />
      
      <main className="prizes-content">
        <div className="container">
          <div className="prizes-header">
            <h1 className="gradient-title">Призы на обмен</h1>
            <p className="section-description">
              Обменивайте собранные игрушки из автоматов-хватаек на крутые призы!
              У вас есть <span className="user-toys-count">{userToys}</span> игрушек для обмена.
            </p>
            
            <div className="cart-controls">
              <button 
                className="view-cart-btn neon-button-secondary"
                onClick={() => setShowCart(!showCart)}
              >
                {showCart ? 'Скрыть корзину' : 'Показать корзину'} 
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </button>
            </div>
            
            {/* Корзина */}
            {showCart && (
              <div className="cart-container">
                <h2>Ваша корзина</h2>
                {cart.length === 0 ? (
                  <p>Корзина пуста</p>
                ) : (
                  <>
                    <ul className="cart-items">
                      {cart.map(item => (
                        <li key={item.id} className="cart-item">
                          <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                          <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Количество: {item.quantity}</p>
                            <p>Цена: {item.price * item.quantity} игрушек</p>
                          </div>
                          <button 
                            className="remove-item-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Удалить
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-summary">
                      <p className="cart-total">Всего: {totalCartCost} игрушек</p>
                      <button 
                        className="checkout-btn neon-button-primary"
                        onClick={checkout}
                      >
                        Оформить обмен
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="prizes-grid">
            {PRIZES_DATA.map(prize => (
              <PrizeCard key={prize.id} prize={prize} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrizesPage;