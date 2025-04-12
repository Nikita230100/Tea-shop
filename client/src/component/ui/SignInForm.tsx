import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';
import { AxiosError } from 'axios';
import { Container } from 'react-bootstrap';


interface UserData {
  id: number;
  name: string;
  email: string;
  // Добавьте другие необходимые поля пользователя
}

interface AuthResponse {
  user: UserData;
  accessToken: string;
}

interface SignInFormProps {
  setUser: (user: { status: string; data: UserData }) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as {
      email: string;
      password: string;
    };

    if (!formData.email || !formData.password) {
      alert("Missing required fields");
      return;
    }

    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/signin", formData);
      setUser({ status: "logged", data: response.data.user });
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
        let errorMessage = "Произошла ошибка при входе";
        
        if (error instanceof Error) {
          const axiosError = error as AxiosError<{ message?: string }>;
          
          if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          } else if (axiosError.response) {
            errorMessage = `Ошибка сервера: ${axiosError.response.status}`;
          } else if (axiosError.request) {
            errorMessage = "Не удалось подключиться к серверу";
          }
        }
        
        alert(errorMessage);
      }
    };
  return (
    <Container className="d-flex justify-content-center ">
    <Form onSubmit={loginHandler} style={{width:'500px', marginTop: '90px'}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          name='email' 
          placeholder='email'
          type='email'
          required
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
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
    </Container>
  );
};

export default SignInForm;