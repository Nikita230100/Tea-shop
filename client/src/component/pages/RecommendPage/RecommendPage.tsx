import React, { useState } from 'react';
import './RecommendPage.css';
import { axiosInstance } from '../../shared/lib/axiosInstance';

const RecommendPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Добавляем вопрос пользователя в историю
    setConversation(prev => [...prev, { content: question, role: 'user' }]);
    
    try {
      // Здесь нужно заменить URL на ваш реальный эндпоинт API
      const response = await axiosInstance.post('/ai', {
        text: question
      });
      
      // Предполагаем, что ответ приходит в формате, который вы показали
      if (response.data && response.data[0] && response.data[0].message) {
        const aiResponse = response.data[0].message.content;
        setAnswer(aiResponse);
        // Добавляем ответ AI в историю
        setConversation(prev => [...prev, { content: aiResponse, role: 'assistant' }]);
      } else {
        setError('Не удалось получить ответ от AI');
      }
    } catch (err) {
      setError('Произошла ошибка при запросе к серверу');
      console.error('Error fetching AI response:', err);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="recommend-container">
      <h1 className="recommend-title">AI Помощник</h1>
      <p className="recommend-subtitle">Задайте вопрос и получите рекомендацию</p>
      
      <div className="conversation-area">
        {conversation.map((item, index) => (
          <div key={index} className={`message ${item.role}`}>
            <div className="message-content">
              {item.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Введите ваш вопрос здесь..."
            rows={3}
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading || !question.trim()}
          className={`submit-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RecommendPage;