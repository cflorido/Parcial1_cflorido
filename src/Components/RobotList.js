// src/components/RobotList.js
import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import RobotTable from "./RobotTable";
import RobotDetails from "./RobotDetails";
import Footer from "./Footer";

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
        <Container style={{ textAlign: "center", marginTop: "20px" }}>
          
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    <RobotTable robots={robots} fetchRobotDetails={fetchRobotDetails} />
                    <RobotDetails selectedRobot={selectedRobot} getRawImageUrl={getRawImageUrl} />
                </div>
            )}
            <Footer />
        </Container>
    );
};

export default RobotList;
