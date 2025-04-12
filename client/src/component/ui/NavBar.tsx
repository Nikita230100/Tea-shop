
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface UserData {
  id?: number;
  name?: string;
  email?: string;
}

interface NavigationPanelProps {
  handleLogout: () => void;
  user: {
    status: "logging" | "logged" | "guest";
    data: UserData | null;
  };
}

export default function NavigationPanel({ handleLogout, user }: NavigationPanelProps) {
  return (
    <Navbar bg="light" variant="light" expand="lg"className="shadow-sm" // Добавляем легкую тень для глубины
    style={{ 
      borderBottom: '2px solid #d4a762', // Золотистая граница снизу
      fontFamily: "'Merriweather', serif" // Шрифт с атмосферой чайной церемонии
    }}
  >
       <Container>
        {/* Логотип с чайной тематикой */}
        <Navbar.Brand 
          as={Link} 
          to="/"
          className="d-flex align-items-center"
          style={{ color: '#3a5a40' }} // Темно-зеленый цвет для текста
        >
          <img
            src="../../../public/tea-leaf-icon.jpg" // Добавляем иконку чайного листа
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Tea Shop Logo"
          />
          Магазин авторского чая
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Основные ссылки */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              style={{ color: '#588157' }} // Зеленый цвет ссылок
            >
              Главная
            </Nav.Link>
            
            {user.status === "logged" && (
              <>
                {user.data?.name && (
                  <Nav.Link 
                    as={Link} 
                    to="/lk"
                    style={{ color: '#588157' }}
                  >
                    <i className="bi bi-person-circle me-1"></i> {/* Иконка профиля */}
                    {user.data.name}
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>

          {/* Блок авторизации */}
          <Nav>
            {user.status !== "logged" ? (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="outline-success" // Зеленый вместо light
                  id="dropdown-auth"
                  style={{ borderColor: '#3a5a40' }} // Темно-зеленая граница
                >
                  <i className="bi bi-door-open me-1"></i> Вход
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item 
                    as={Link} 
                    to="/signin"
                    className="text-success" // Зеленый текст
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Войти
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as={Link} 
                    to="/signup"
                    className="text-success"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Регистрация
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button 
                variant="outline-success" // Зеленый вместо danger
                onClick={handleLogout}
                style={{ borderColor: '#3a5a40' }}
              >
                <i className="bi bi-box-arrow-left me-1"></i>
                Выход
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}