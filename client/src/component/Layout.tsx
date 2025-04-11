
import NavBar from "./ui/NavBar";
import { Outlet } from "react-router-dom"; // Используем react-router-dom
import Container from "react-bootstrap/esm/Container";

interface LayoutProps {
  handleLogout: () => void;
}

export default function Layout({ handleLogout }: LayoutProps) {
  return (
    <>
      <Container>
        <NavBar handleLogout={handleLogout} />
        <Outlet />
      </Container>
    </>
  );
}
