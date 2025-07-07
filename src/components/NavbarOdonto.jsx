import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavbarOdonto = () => {
    return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#48C9B0" }}
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/" 
          className="fw-bold fs-4"
        >
          🦷 BELA SUNRISE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/"> 
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/agendar-cita">
              Agendar Cita
            </Nav.Link>
            <Nav.Link as={Link} to="/historial">
              Mi Historial
            </Nav.Link>
            <Nav.Link as={Link} to="/especialistas">
              Especialistas
            </Nav.Link>
          </Nav>
          <Nav>
                       
            <Button as={Link} to="/login" variant="outline-light">
              Iniciar Sesión
            </Button>
            <form className="d-flex ms-3">
                <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Buscar..."
                    aria-label="Search"
                />
                <Button variant="outline-light" type="submit">
                    🔎
                </Button>
            </form>
                      
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarOdonto;