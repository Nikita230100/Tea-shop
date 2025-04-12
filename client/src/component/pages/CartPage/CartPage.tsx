import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import { Button, ListGroup, Badge, Form, Alert } from 'react-bootstrap';
import './CartPage.css';

export default function CartPage({ user }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get('/cart');
      setCart(data);
    } catch (error) {
      setError('Ошибка загрузки корзины');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (teaId, newQuantity) => {
    try {
      setError('');
      
      if (newQuantity < 1) {
        // Полное удаление товара
        await removeItem(teaId);
      } else {
        // Обновление количества через PUT запрос
        await axiosInstance.put(`/cart/tea/${teaId}`, {
          quantity: newQuantity
        });
      }
      fetchCart();
    } catch (error) {
      setError('Ошибка обновления количества');
      console.error('Update quantity error:', error.response?.data || error);
    }
  };


  const removeItem = async (teaId) => {
    try {
      await axiosInstance.delete(`/cart/tea/${teaId}`, { 
        data: { completeRemoval: true } 
      });
      fetchCart();
    } catch (error) {
      setError('Ошибка удаления товара');
      console.error('Remove item error:', error.response?.data || error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axiosInstance.post('/cart/checkout', { address });
      setSuccess('Заказ успешно оформлен!');
      setCart({ items: [], total: 0 });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Ошибка оформления заказа');
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  if (loading) return <div className="loading">Загрузка корзины...</div>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Корзина</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {cart.items.length === 0 ? (
        <p className="empty-cart">Ваша корзина пуста</p>
      ) : (
        <>
            <ListGroup className="cart-items">
        {cart.items.map(item => (
          <ListGroup.Item key={item.id} className="cart-item">
            {/* ... (остальные элементы товара) */}
            
            <div className="item-details">
              <h5 className="item-name">{item.Tea.name}</h5>
              <div className="item-price">{item.sum} ₽ (за шт.)</div>
              
             <div className="quantity-controls">
  <Button 
    variant="outline-secondary" 
    size="sm"
    onClick={() => updateQuantity(item.teaId, item.quantity - 1)}
    disabled={item.quantity <= 1} // Блокируем кнопку при количестве 1
  >
    -
  </Button>
  <span className="quantity">{item.quantity}</span>
  <Button 
    variant="outline-secondary" 
    size="sm"
    onClick={() => updateQuantity(item.teaId, item.quantity + 1)}
  >
    +
  </Button>
</div>
            </div>
            
            <div className="item-subtotal">
              {item.sum * item.quantity} ₽
              <Button 
                variant="link" 
                className="remove-btn"
                onClick={() => removeItem(item.teaId)}
              >
                ×
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

          <div className="delivery-section">
            <h4>Адрес доставки</h4>
            <Form.Control
              type="text"
              placeholder="Введите адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="summary">
            <div className="total">
              <span>Итого:</span>
              <span className="total-amount">{cart.total} ₽</span>
            </div>
            <Button 
              variant="primary" 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={!address || cart.items.length === 0}
            >
              Заказать
            </Button>
          </div>
        </>
      )}
    </div>
  );
}