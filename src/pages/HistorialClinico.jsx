import React, { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Spinner,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const dummyPacienteData = {
  "paciente@correo.com": { 
    nombre: "Paciente Demo",
    documento: "123456789",
    edad: 30,
    telefono: "3001234567",
    citas: [
      {
        fecha: "2024-03-15",
        motivo: "Revisión general",
        estado: "Completada",
      },
      {
        fecha: "2024-06-20",
        motivo: "Limpieza dental",
        estado: "Completada",
      },
      {
        fecha: "2025-01-10",
        motivo: "Extracción de muela",
        estado: "Agendada",
      },
    ],
  },
  
};

const HistorialClinico = () => {
 
  const [pacienteEmail] = useState("paciente@correo.com"); 
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    setLoading(true);
    setError("");
    setPaciente(null);

    setTimeout(() => {
      const data = dummyPacienteData[pacienteEmail];
      if (data) {
        setPaciente(data);
      } else {
        setError("Historial no encontrado para este paciente. (Solo 'paciente@correo.com' tiene historial en demo)");
      }
      setLoading(false);
    }, 1000); 
  }, [pacienteEmail]); 

  return (
    <Container style={{ maxWidth: 700, marginTop: 40, marginBottom: 60 }}>
      <h2 className="mb-4 text-center fw-bold text-primary-odont">
        Mi Historial Clínico
      </h2>
      <Card className="shadow-lg mt-5">
        <Card.Header
          className="text-white fw-bold"
          style={{ backgroundColor: "#48C9B0" }}
        >
          Detalles del Paciente
        </Card.Header>
        <Card.Body>
          {loading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando historial...</span>
              </Spinner>
              <p className="mt-2">Cargando historial...</p>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {paciente && (
            <>
              <Card.Title className="text-primary-odont mb-3">
                {paciente.nombre}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Documento: {paciente.documento}
              </Card.Subtitle>
              <Card.Text>
                <strong>Edad:</strong> {paciente.edad} años <br />
                <strong>Teléfono:</strong> {paciente.telefono}
              </Card.Text>
            </>
          )}
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item
            className="fw-bold bg-light-green-odont"
          >
            Citas Agendadas y Historial
          </ListGroup.Item>
          {paciente && paciente.citas && paciente.citas.length > 0 ? (
            paciente.citas.map((cita, idx) => (
              <ListGroup.Item key={idx}>
                <div>
                  <strong>Fecha:</strong> {cita.fecha}
                </div>
                <div>
                  <strong>Motivo:</strong> {cita.motivo}
                </div>
                <div>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`badge ${
                      cita.estado === "Completada"
                        ? "bg-success"
                        : cita.estado === "Agendada"
                        ? "bg-info"
                        : "bg-warning"
                    }`}
                  >
                    {cita.estado}
                  </span>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-muted">
              {loading ? "Cargando citas..." : "No hay citas registradas para este paciente."}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default HistorialClinico;