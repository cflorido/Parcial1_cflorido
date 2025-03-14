import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";

const RobotList = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getRawImageUrl = (url) => {
    if (url.includes("github.com")) {
      return url
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
    }
    return url; 
  };
  useEffect(() => {
      
    const fetchRobots = async () => {
      try {
        const response = await fetch("http://localhost:3001/robots");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de los robots");
        }
        const data = await response.json();
        setRobots(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  const fetchRobotDetails = async (robotId) => {
    try {
      const response = await fetch(`http://localhost:3001/robots/${robotId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del robot");
      }
      const data = await response.json();
      setSelectedRobot(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Título */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Adopta un Robot con Robot Lovers!
      </h1>
      <hr></hr>

        {/* Imagen del banner */}
        <div style={{ display: "flex", justifyContent: "center" }}>
        <img
            src="/robot-banner.png"
            alt="Robots"
            style={{
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "0px"
            }}
        />
        </div>

        <hr></hr>
      {/* Manejo de carga y errores */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" style={{ marginTop: "20px" }}>
          {error}
        </Alert>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: "20px" }}>
  {/* Tabla de robots */}
  <div style={{ flex: "1", minWidth: "60%" }}> 
    <Table
      hover
      responsive
      style={{
        width: "100%",
        borderCollapse: "collapse",
        cursor: "pointer",
      }}
    >
      <thead style={{ backgroundColor: "#333A40", color: "white" }}>
        <tr>
          <th style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>ID</th>
          <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Nombre</th>
          <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Modelo</th>
          <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Empresa Fabricante</th>
        </tr>
      </thead>
      <tbody>
        {robots.map((robot) => (
          <tr key={robot.id} onClick={() => fetchRobotDetails(robot.id)}>
            <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>{robot.id}</td>
            <td style={{ padding: "12px", textAlign: "left" }}>{robot.nombre}</td>
            <td style={{ padding: "12px", textAlign: "left" }}>{robot.modelo}</td>
            <td style={{ padding: "12px", textAlign: "left" }}>{robot.empresaFabricante}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>

  {/* Sección de detalles del robot :D*/}
  {selectedRobot && (
    <div style={{ flex: "1", minWidth: "30%" }}>
      <Card 
        style={{ 
          border: "1px solid black", 
          borderRadius: "0px", 
          backgroundColor: "#f5f5f5", 
          padding: "10px", 
          textAlign: "left",
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Card.Title 
          style={{ 
            fontSize: "14px", 
            fontWeight: "bold", 
            textAlign: "center", 
            marginBottom: "10px"
          }}
        >
          <strong>{selectedRobot.nombre}</strong>
        </Card.Title>

        <Card.Img 
          variant="top" 
          src={getRawImageUrl(selectedRobot.imagen)} 
          alt={selectedRobot.nombre} 
          onError={(e) => (e.target.src = "/images/default.png")} 
          style={{ 
            width: "60%", 
            borderRadius: "0px", 
            border: "1px solid black", 
            marginTop: "10px" 
          }}
        />

        <Card.Body style={{ width: "100%", padding: "10px" }}>
          <Card.Text style={{ fontSize: "12px", lineHeight: "1.5" }}>
            <strong>➜ Año de Fabricación:</strong> {selectedRobot.añoFabricacion}
            <br />
            <strong>➜ Capacidad de Procesamiento:</strong> {selectedRobot.capacidadProcesamiento}
            <br />
            <strong>➜ Humor:</strong> {selectedRobot.humor}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )}
</div>

      )}

      {/* Pie de página */}
      <footer style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
      </footer>
    </Container>
  );
};

export default RobotList;
