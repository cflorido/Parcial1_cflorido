// src/components/RobotDetails.js
import React from "react";
import { Card } from "react-bootstrap";

const RobotDetails = ({ selectedRobot, getRawImageUrl }) => {
    if (!selectedRobot) return null;

    return (
        <Card style={{ border: "1px solid black", borderRadius: "0px", backgroundColor: "#f5f5f5", padding: "10px", textAlign: "left", alignItems: "center" }}>
            <Card.Title style={{ fontSize: "14px", fontWeight: "bold", textAlign: "center" }}>
                <strong>{selectedRobot.nombre}</strong>
            </Card.Title>
            <Card.Img 
                variant="top" 
                src={getRawImageUrl(selectedRobot.imagen)} 
                alt={selectedRobot.nombre} 
                onError={(e) => (e.target.src = "/images/default.png")} 
                style={{ width: "60%", borderRadius: "0px", border: "1px solid black" }}
            />
            <Card.Body>
                <Card.Text>
                    <strong>➜ Año de Fabricación:</strong> {selectedRobot.añoFabricacion}
                    <br />
                    <strong>➜ Capacidad de Procesamiento:</strong> {selectedRobot.capacidadProcesamiento}
                    <br />
                    <strong>➜ Humor:</strong> {selectedRobot.humor}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RobotDetails;
