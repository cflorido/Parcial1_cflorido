
import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import RobotTable from "./RobotTable";
import RobotDetails from "./RobotDetails";
import "./RobotList.css";

const RobotList = () => {
    const [robots, setRobots] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRawImageUrl = (url) => {
        return url.includes("github.com") 
            ? url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
            : url;
    };

    useEffect(() => {
        const fetchRobots = async () => {
            try {
                const response = await fetch("http://localhost:3001/robots");
                if (!response.ok) throw new Error("Error al obtener los datos de los robots");
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
            if (!response.ok) throw new Error("Error al obtener los detalles del robot");
            const data = await response.json();
            setSelectedRobot(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container style={{ textAlign: "center", marginTop: "20px", marginLeft: "35px"}}>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <div 
                    style={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        gap: "20px", 
                        justifyContent: "center", 
                        
                    }}
                >
                  
                    <div style={{ flex: "1 1 60%", minWidth: "600px" }}>
                        <RobotTable robots={robots} fetchRobotDetails={fetchRobotDetails} />
                    </div>
    
                   
                    {selectedRobot && (
                        <div style={{ flex: "1 1 30%", minWidth: "250px", marginRight: "55px" }}>
                            <RobotDetails selectedRobot={selectedRobot} getRawImageUrl={getRawImageUrl} />
                        </div>
                    )}
                </div>
            )}
                        <footer className="loginn-footer">
                Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
            </footer>
        </Container>
    );
    
};

export default RobotList;
