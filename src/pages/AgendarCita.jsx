import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Row, Col } from "react-bootstrap";

const dummySpecialties = [
  "Odontología General",
  "Ortodoncia",
  "Endodoncia",
  "Periodoncia",
  "Blanqueamiento Dental",
  "Implantes Dentales",
];

const dummyDoctors = {
  "Odontología General": [
    { id: 1, name: "Dr. Juan Pérez" },
    { id: 2, name: "Dra. Ana López" },
  ],
  "Ortodoncia": [
    { id: 3, name: "Dr. Carlos Ramírez" },
    { id: 4, name: "Dra. Laura Gómez" },
  ],
  "Endodoncia": [
    { id: 5, name: "Dra. Sofía Martínez" },
  ],
  "Periodoncia": [
    { id: 6, name: "Dr. David Torres" },
  ],
  "Blanqueamiento Dental": [
    { id: 1, name: "Dr. Juan Pérez" }, 
    { id: 7, name: "Dra. Valeria Castro" },
  ],
  "Implantes Dentales": [
    { id: 8, name: "Dr. Ricardo Sánchez" },
  ],
};

const AgendarCita = () => {
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const availableDoctors = specialty ? dummyDoctors[specialty] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!specialty || !doctor || !date || !time) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    
    setTimeout(() => {
      const newAppointment = {
        specialty,
        doctor,
        date,
        time,
        notes,
      };
      console.log("Cita Agendada:", newAppointment);
      setSuccessMessage("¡Tu cita ha sido agendada con éxito!");
      
      setSpecialty("");
      setDoctor("");
      setDate("");
      setTime("");
      setNotes("");
    }, 1000);
  };

  return (
    <Container className="my-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center mb-4 fw-bold text-primary-odont">
        Agendar Nueva Cita
      </h2>
      <Card className="shadow-lg p-4">
        <Card.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="specialty">
                <Form.Label>Especialidad</Form.Label>
                <Form.Select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    setDoctor(""); 
                  }}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  {dummySpecialties.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="doctor">
                <Form.Label>Médico</Form.Label>
                <Form.Select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  disabled={!specialty}
                  required
                >
                  <option value="">Selecciona un médico</option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} 
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="time">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-4" controlId="notes">
              <Form.Label>Notas Adicionales (Opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: Necesito un chequeo de rutina y limpieza."
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#48C9B0", border: "none" }}
            >
              Confirmar Cita
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AgendarCita;