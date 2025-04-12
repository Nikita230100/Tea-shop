import React from 'react';
import { axiosInstance } from '../shared/lib/axiosInstance'; // Исправленный импорт
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Container } from 'react-bootstrap';

interface User {
  status: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}

interface SignUpFormProps {
  setUser: (user: User) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setUser }) => {
  const navigate = useNavigate();
  
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    const formData = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value
    };

    

    if (!formData.email || !formData.password || !formData.name) {
      alert("Заполните все поля");
      return;
    }

    try {
     
      const response = await axiosInstance.post("/auth/signup", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      
      setUser({ status: "logged", data: response.data.user });
      navigate("/");
    } catch (error) {
      console.error('Ошибка запроса:', error); // Логирование
      const axiosError = error as AxiosError<{ message?: string }>;
      
      if (axiosError.response) {
        
        if (axiosError.response.status === 400) {
          alert(axiosError.response.data?.message || "Пользователь с таким email уже существует");
        } else if (axiosError.response.status === 500) {
          alert("Ошибка сервера. Пожалуйста, попробуйте позже");
        } else {
          alert(`Ошибка: ${axiosError.response.status}`);
        }
      } else if (axiosError.request) {
        alert("Не удалось подключиться к серверу");
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
    <Form onSubmit={signUpHandler} style={{width:'500px', marginTop: '90px'}}>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control 
          name='name' 
          placeholder='login'
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          name='email' 
          placeholder='email'
          type='email'
          required
          autoComplete="username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          name='password' 
          placeholder='password'
          type='password'
          required
          autoComplete="on"
        />
        <Form.Text className="text-muted">
        Требования: минимум 8 символов, заглавные и строчные латинские буквы
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Зарегистрироваться
      </Button>
    </Form>
    </Container>
  );
};

export default SignUpForm;