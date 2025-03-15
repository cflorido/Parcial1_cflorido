import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";
import "./RobotList.css";

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
            <h1  
                style={{  
                    textAlign: "center",  
                    fontFamily: "'Roboto', sans-serif",  
                    fontWeight: 900,  
                    fontSize: "35px",  
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",  
                    marginBottom: "1px",  
                    marginTop: "15px"
                }}  
            >  
                Adopta un Robot con Robot Lovers!  
            </h1>  

            {/* Imagen de robots */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <hr style={{ width: "104%", marginLeft: "-2%", marginRight: "-2%", height: "1px", backgroundColor: "rgb(0, 0, 0.4)", border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 1)", marginBottom: "9px" }} />
                
                <img 
                    src="/robot-banner.png" 
                    alt="Banner de Robots" 
                    style={{
                        width: "960px",
                        height: "261px",
                        display: "block",
                        margin: "0 auto"
                    }} 
                />

                <hr style={{ width: "104%", marginLeft: "-2%", marginRight: "-2%", height: "1px", backgroundColor: "rgb(0, 0, 0.4)", border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 1)", marginTop: "11px" }} />
            </div>

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
  <table class="StandardTable">
    <thead>
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
      </table>
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
