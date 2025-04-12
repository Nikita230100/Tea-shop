import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {axiosInstance} from '../../shared/lib/axiosInstance';
import Alert from 'react-bootstrap/Alert';
import './AddTeaCardForm.css';


export default function AddTeaForm({ user, setTeas }) {
    const [teaForm, setTeaForm] = useState({name:'', type:'',description:'',compound:'', price:'', userId: 1, image: ''})
    const [showAlert, setShowAlert] = useState(false);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTeaForm({ ...teaForm, [name]: value });
  };


const submitHandle = async (e) => {
  e.preventDefault();
  try {
    const newTea = await axiosInstance.post("/teas/", teaForm);
    setTeaForm({
      name: '',
      type: '',
      description: '',
      compound: '',
      price: '',
      userId: 1,
      image: '',
  });
  setTeas((per) => [...per, newTea.data])
  setShowAlert(true); 
            setTimeout(() => setShowAlert(false), 3000);
  } catch (error) {
    console.error('Ошибка сети', error);
  }

}

  return (
   
     <div className="form-container"> 
    {showAlert && <Alert variant="success">Товар успешно добавлен</Alert>} 

    <Form onSubmit={submitHandle}>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='name'>
            Название товара
        </InputGroup.Text>
        <Form.Control
            name='name'
            value={teaForm.name}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
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
    <Button variant="success" type="submit" size="lg">
    Добавить товар
            </Button>
        </Form>
        </div>

    )
}
