
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

interface NavBarProps {
  handleLogout: () => void;
}

export default function NavBar({ handleLogout }: NavBarProps) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/signup">Регистрация</Nav.Link>
          <Nav.Link href="/signin">Вход</Nav.Link>
          <Button onClick={handleLogout}> Выход</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}