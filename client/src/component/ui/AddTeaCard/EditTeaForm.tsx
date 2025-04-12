import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import Alert from 'react-bootstrap/Alert';
import './AddTeaCardForm.css';

export default function EditTeaForm({ user, setTeas }) {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [teaForm, setTeaForm] = useState({
    name: '',
    type: '',
    description: '',
    compound: '',
    price: '',
    image: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  // Заполняем форму данными из location.state
  useEffect(() => {
    if (state?.teaData) {
      setTeaForm(state.teaData);
    } else {
      // Если данные не переданы, загружаем с сервера
      const fetchTea = async () => {
        try {
          const response = await axiosInstance.get(`/teas/${id}`);
          setTeaForm(response.data);
        } catch (error) {
          console.error('Ошибка загрузки чая:', error);
          setError('Не удалось загрузить данные чая');
        }
      };
      fetchTea();
    }
  }, [id, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeaForm({ ...teaForm, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const updatedTea = await axiosInstance.put(`/teas/${id}`, teaForm);
      setTeas(prev => prev.map(t => t.id === Number(id) ? updatedTea.data : t));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка обновления:', error);
      setError('Ошибка при обновлении товара');
    }
  };

  return (
    <div className="form-container">
      {showAlert && <Alert variant="success">Товар успешно обновлен</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <h2 className="mb-4">Редактирование товара</h2>
      
      <Form onSubmit={submitHandle}>
        {/* Поля формы аналогичны AddTeaForm, но с текущими значениями */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Название товара</InputGroup.Text>
          <Form.Control
            name="name"
            value={teaForm.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='type'>
           Тип
        </InputGroup.Text>
        <Form.Control
            name='type'
            value={teaForm.type}
            onChange={handleChange}
            value={teaForm.type}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='description'>
            Описание
        </InputGroup.Text>
        <Form.Control
            name='description'
            value={teaForm.description}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='compound'>
            Состав
        </InputGroup.Text>
        <Form.Control
            name='compound'
            value={teaForm.compound}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='price'>
            Цена
        </InputGroup.Text>
        <Form.Control
            name='price'
            value={teaForm.price}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='image'>
            Ссылка на изображение
        </InputGroup.Text>
        <Form.Control
            name='image'
            value={teaForm.image}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Сохранить изменения
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </div>
      </Form>
    </div>
  );
}