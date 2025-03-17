
import React from "react";
import "./RobotList.css";
import { FormattedMessage } from "react-intl";
const RobotTable = ({ robots, fetchRobotDetails }) => {
    return (
        <table className="StandardTable">
            <thead>
                <tr>
                <th><FormattedMessage id="idColumn" defaultMessage="ID" /></th>
                    <th><FormattedMessage id="nameColumn" defaultMessage="Name" /></th>
                    <th><FormattedMessage id="modelColumn" defaultMessage="Model" /></th>
                    <th><FormattedMessage id="manufacturerColumn" defaultMessage="Manufacturer Company" /></th>
                </tr>
            </thead>
            <tbody>
                {robots.map((robot) => (
                    <tr key={robot.id} onClick={() => fetchRobotDetails(robot.id)}>
                        <td><strong>{robot.id}</strong></td> 
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
