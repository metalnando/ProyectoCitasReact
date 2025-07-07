import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Form } from "react-bootstrap";

const dummySpecialists = [
  {
    id: 1,
    name: { first: "Ana", last: "García" },
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
    specialty: "Odontología General",
    experience: "10 años",
    email: "ana.garcia@example.com",
  },
  {
    id: 2,
    name: { first: "Carlos", last: "Martínez" },
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
    specialty: "Ortodoncia",
    experience: "8 años",
    email: "carlos.martinez@example.com",
  },
  {
    id: 3,
    name: { first: "Laura", last: "Fernández" },
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
    specialty: "Endodoncia",
    experience: "12 años",
    email: "laura.fernandez@example.com",
  },
  {
    id: 4,
    name: { first: "Diego", last: "Ramírez" },
    picture: "https://randomuser.me/api/portraits/men/4.jpg",
    specialty: "Periodoncia",
    experience: "7 años",
    email: "diego.ramirez@example.com",
  },
  {
    id: 5,
    name: { first: "Sofía", last: "Martínez" },
    picture: "https://randomuser.me/api/portraits/women/10.jpg",
    specialty: "Odontología General",
    experience: "5 años",
    email: "sofia.martinez@example.com",
  },
  {
    id: 6,
    name: { first: "Andrés", last: "Castro" },
    picture: "https://randomuser.me/api/portraits/men/6.jpg",
    specialty: "Blanqueamiento Dental",
    experience: "9 años",
    email: "andres.castro@example.com",
  },
  {
    id: 7,
    name: { first: "Valentina", last: "Silva" },
    picture: "https://randomuser.me/api/portraits/women/7.jpg",
    specialty: "Implantes Dentales",
    experience: "15 años",
    email: "valentina.silva@example.com",
  },
];

const Especialistas = () => {
  const [specialists, setSpecialists] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Todas");


  const uniqueSpecialties = ["Todas", ...new Set(dummySpecialists.map(s => s.specialty))];

  useEffect(() => {
    setTimeout(() => {
      try {
        setSpecialists(dummySpecialists);
        setFilteredSpecialists(dummySpecialists); 
        setLoading(false);
      } catch {
        setError("Error al cargar los especialistas.");
        setLoading(false);
      }
    }, 1500);
  }, []);

  useEffect(() => {
    let currentFiltered = specialists;

    
    if (selectedSpecialty !== "Todas") {
      currentFiltered = currentFiltered.filter(s => s.specialty === selectedSpecialty);
    }

    
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(s =>
        s.name.first.toLowerCase().includes(lowerCaseSearchTerm) ||
        s.name.last.toLowerCase().includes(lowerCaseSearchTerm) ||
        s.specialty.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredSpecialists(currentFiltered);
  }, [searchTerm, selectedSpecialty, specialists]);


  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando especialistas...</span>
        </Spinner>
        <p className="mt-3">Cargando especialistas...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5 fw-bold text-primary-odont">
        Nuestros Especialistas
      </h1>

      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Form.Group controlId="searchSpecialist">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="filterSpecialty">
            <Form.Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {uniqueSpecialties.map((s, index) => (
                <option key={index} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((specialist) => (
            <Col key={specialist.id}>
              <Card className="h-100 shadow-sm specialist-card">
                <Card.Img
                  variant="top"
                  src={specialist.picture}
                  alt={`${specialist.name.first} ${specialist.name.last}`}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="mb-2 fs-5">
                    {specialist.name.first} {specialist.name.last}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {specialist.specialty}
                  </Card.Subtitle>
                  <Card.Text>
                    <p className="mb-1">
                      <strong>Experiencia:</strong> {specialist.experience}
                    </p>
                    <p className="mb-0"><strong>Email:</strong> {specialist.email}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center bg-light-green-odont">
                    <small className="text-muted">¡Reserva tu cita con este especialista!</small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="info" className="text-center">
              No se encontraron especialistas que coincidan con los criterios de búsqueda.
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Especialistas;