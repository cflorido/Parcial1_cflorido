// src/components/RobotTable.js
import React from "react";
import "./RobotList.css";

const RobotTable = ({ robots, fetchRobotDetails }) => {
    return (
        <table className="StandardTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Modelo</th>
                    <th>Empresa Fabricante</th>
                </tr>
            </thead>
            <tbody>
                {robots.map((robot) => (
                    <tr key={robot.id} onClick={() => fetchRobotDetails(robot.id)}>
                        <td>{robot.id}</td>
                        <td>{robot.nombre}</td>
                        <td>{robot.modelo}</td>
                        <td>{robot.empresaFabricante}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RobotTable;
