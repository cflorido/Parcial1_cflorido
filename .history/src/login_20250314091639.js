import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col, Image } from "react-bootstrap";

function Login({ setAuth }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setAuth(true);
            navigate("/robots"); 
        } else {
            setError("Error de autenticación. Revise sus credenciales");
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <h1 className="text-center">Adopta un Robot con Robot Lovers!</h1>
            
            {/* Imagen de rodw*/}
            <hr></hr>
            <img src="/robot-banner.png" alt="Banner de Robots" className="img-fluid" />
            <hr></hr>
        
            <h3 className="mt-3">Inicio de sesión</h3>

            <Form onSubmit={handleSubmit} className="w-50">
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Botones */}
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" className="w-100">Ingresar</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" className="w-100">Cancelar</Button>
                    </Col>
                </Row>
            </Form>

            {/* Mensaje de error */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Pie de página */}
            <footer className="text-center mt-4">
                <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </footer>
        </Container>
    );
}

export default Login;
