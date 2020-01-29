import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function AppNavbar({ user }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/">Togramynie</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {user && (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Strona Główna</Nav.Link>
            <Nav.Link href="/profile">Profil</Nav.Link>
            <NavDropdown title="Pokój" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/create-room">Stwórz</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="/join-room">Dołącz</NavDropdown.Item>
              <NavDropdown.Item href="/to-room">Wejdź</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/logout">Wyloguj</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
      {!user && (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Strona Główna</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/signup">Zarejestruj</Nav.Link>
            <Nav.Link href="/login">Zaloguj</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
      </Container>
    </Navbar>
  );
}
