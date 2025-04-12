import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import TeaCard from '../TeaCard/TeaCards';
import './LkPage.css';


export default function LkPage({user}) {
  const [favoriteTeas, setFavoriteTeas] = useState([]);


  const fetchFavorites = async () => {
    try {
      const { data } = await axiosInstance.get('/favorites/my');
      setFavoriteTeas(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const removeFromFavorites = async (teaId) => {
    try {
      await axiosInstance.post(`/favorites/tea/${teaId}/likes`);
      setFavoriteTeas(prev => prev.filter(tea => tea.id !== teaId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div className="lk-container">
      <h1 className="lk-greeting">
        Добро пожаловать, {user?.data?.name}!
      </h1>
      <h2 className="lk-subtitle">Ваши избранные товары</h2>
      
      {favoriteTeas.length > 0 ? (
        <div className="favorites-grid">
          {favoriteTeas.map(tea => (
            <TeaCard 
              key={tea.id} 
              tea={tea} 
              user={user}
              isFavorite={true}
              onToggleFavorite={removeFromFavorites}
            />
          ))}
        </div>
      ) : (
        <p className="no-favorites">У вас пока нет избранных чаев</p>
      )}
    </div>
  );
}