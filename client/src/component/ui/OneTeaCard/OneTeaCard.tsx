import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import Button from 'react-bootstrap/Button';
import './OneTeaCard.css';

export default function OneTeaCard({ user }) {
  const [tea, setTea] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const isAdmin = user?.data?.id === 1;

  useEffect(() => {
    const getTea = async () => {
      try {
        const response = await axiosInstance.get(`/teas/${id}`);
        setTea(response.data);
      } catch (error) {
        console.error('Ошибка загрузки чая:', error);
      }
    };
    getTea();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/teas/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении чая:', error);
    }
  };

  const addToCart = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await axiosInstance.post(`/cart/tea/${id}`);
      
      setSuccess(`Чай "${tea.name}" добавлен в корзину! (Количество: ${response.data.quantity})`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      setError(error.response?.data?.message || 'Не удалось добавить товар в корзину');
    } finally {
      setLoading(false);
    }
  };

  if (!tea) {
    return <div className="loading-container">Загрузка продукта...</div>;
  }

  return (
    <div className="one-tea-container">
      <div className="tea-image-container">
        <img 
          src={tea.image.startsWith('http') ? tea.image : `/images/tea/${tea.image}`} 
          alt={tea.name}
          className="tea-image"
          onError={(e) => {
            e.target.src = '/images/tea/default.jpg';
          }}
        />
      </div>
      
      <div className="tea-details">
        <h1 className="tea-title">{tea.name}</h1>
        
        <div className="tea-meta">
          {tea.type && <span className="tea-type">{tea.type}</span>}
          {tea.price && <span className="tea-price">{tea.price} ₽</span>}
        </div>
        
        {tea.description && (
          <div className="tea-section">
            <h3>Описание</h3>
            <p className="tea-description">{tea.description}</p>
          </div>
        )}
        
        {tea.compound && (
          <div className="tea-section">
            <h3>Состав</h3>
            <ul className="tea-compound">
              {tea.compound.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="tea-actions">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate(-1)} 
            className="action-button"
          >
            Назад
          </Button>
          
          {user && !isAdmin && (
            <Button 
              variant="success" 
              onClick={addToCart}
              className="action-button"
            >
              В корзину
            </Button>
          )}
          
          {isAdmin && (
            <Button 
              variant="danger" 
              onClick={handleDelete}
              className="action-button"
            >
              Удалить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}