
import NavBar from "./ui/NavBar";
import { Outlet } from "react-router-dom"; // Используем react-router-dom
import Container from "react-bootstrap/esm/Container";


interface LayoutProps {
  handleLogout: () => void;
  user: {
    status: "logging" | "logged" | "guest";
    data: {
      id?: number;
      name?: string;
      email?: string;
    } | null;
  };
}

  export default function Layout({ handleLogout, user }: LayoutProps) {
  return (
    <>
      <Container>
      <NavBar handleLogout={handleLogout} user={user} />
        <Outlet />
      </Container>
    </>
  );
}
