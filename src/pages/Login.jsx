import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (email === "prueba@correo.com" && password === "123") {
      login({ email, name: "Paciente Demo" }); 
    } else {
      setError(
        "Credenciales incorrectas. Intenta con 'prueba@correo.com' y '123'"
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card className="shadow-lg p-3" style={{ width: "25rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary-odont fw-bold">
            Iniciar Sesión
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>

            <Button
              className="w-100"
              type="submit"
              style={{ backgroundColor: "#48C9B0", border: "none" }}
            >
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;