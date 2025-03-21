import React from "react";
import { Card } from "react-bootstrap";
import "./RobotList.css";
import { FormattedMessage } from "react-intl";  

const RobotDetails = ({ selectedRobot, getRawImageUrl }) => {
    if (!selectedRobot) return null;

    return (
        <Card style={{ border: "1px solid black", borderRadius: "0px", backgroundColor: "#f5f5f5", padding: "8px", textAlign: "left", alignItems: "center" }}>

            <Card.Title style={{ fontSize: "14px",  textAlign: "center", marginTop: "14px" }}>
            <strong>{selectedRobot.nombre}</strong>
            </Card.Title>
            <Card.Img 
                variant="top" 
                src={getRawImageUrl(selectedRobot.imagen)} 
                alt={selectedRobot.nombre} 
                onError={(e) => (e.target.src = "/images/default.png")} 
                style={{ width: "55%", borderRadius: "0px", border: "1px solid black" }}
            />
            <Card.Body>
                <Card.Text style={{ fontFamily: "Inter, sans-serif", fontSize: "95%", letterSpacing: "0%", lineHeight: "1.1" }}>
                    <strong>➜ <FormattedMessage id="manufactureYear" defaultMessage="Manufacture Year" />:</strong> {selectedRobot.añoFabricacion}
                    <br />
                    <strong>➜ <FormattedMessage id="processingPower" defaultMessage="Processing Power" />:</strong> {selectedRobot.capacidadProcesamiento}
                    <br />
                    <strong>➜ <FormattedMessage id="humor" defaultMessage="Humor" />:</strong> {selectedRobot.humor}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RobotDetails;
