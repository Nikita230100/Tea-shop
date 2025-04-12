import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../shared/lib/axiosInstance";
import "./TeaCard.css";

export default function TeaCard({ user, tea, setTeas, isFavorite, onToggleFavorite }) {
  const [ingredients, setIngredients] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite || false);

  // Проверяем, является ли текущий пользователь админом
  useEffect(() => {
    if (user && user.data && user.data.id === 1) {
      setIsAdmin(true);
    }
  }, [user]);

  // Синхронизируем локальное состояние с пропсом
  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    if (tea.compound) {
      setIngredients(tea.compound.split(","));
    }
  }, [tea.compound]);

  const deleteTeaHandle = async (id) => {
    try {
      await axiosInstance.delete(`/teas/${id}`);
      setTeas(prevTeas => prevTeas.filter(r => r.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleFavoriteClick = async () => {
    try {
      if (onToggleFavorite) {
        onToggleFavorite(tea.id);
      } else {
        await axiosInstance.post(`/favorites/tea/${tea.id}/likes`);
        setLocalIsFavorite(!localIsFavorite);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="tea-card h-100">
      <Card.Img 
        variant="top" 
        src={`/images/tea/${tea.image}`} 
        alt={tea.name}
        onError={(e) => {
          e.target.src = '/images/tea/default.jpg';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{tea.name}</Card.Title>
        <Card.Text className="fw-bold">{`${tea.price} ₽`}</Card.Text>
        <Card.Text className="text-muted">
          {tea.description && tea.description.length > 100
            ? `${tea.description.substring(0, 100)}...`
            : tea.description}
        </Card.Text>
        <div className="mt-auto d-flex flex-column">
          <Button as={Link} to={`/${tea.id}`} variant="outline-success">
            Подробнее
          </Button>
          
          {isAdmin && (
            <Button 
              variant="outline-danger" 
              onClick={() => deleteTeaHandle(tea.id)}
              className="mt-2"
            >
              Удалить
            </Button>
          )}
        </div>
      </Card.Body>
      
      {user && (
        <button
          onClick={handleFavoriteClick}
          className={`favorite-btn ${localIsFavorite ? 'active' : ''}`}
        >
          {localIsFavorite ? '❤️' :  '❤️'}
        </button>
      )}
    </Card>
  );
}