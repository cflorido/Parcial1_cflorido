import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css"; 

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

        await response.json();
        if (response.ok) {
            setAuth(true);
            navigate("/robots"); 
        } else {
            setError("Error de autenticación. Revise sus credenciales");
        }
    };

    return (
        <Container className="login-container" style={{ maxWidth: "1020px" }}>
            <h3 className="login-subtitle" style={{ marginTop: "0px", fontWeight: "650" }}>Inicio de sesión</h3>

            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="formUsername">
                    <Form.Label style={{ marginTop: "6px", fontWeight: "650" }}>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        style={{ border: error ? "1px solid #6A0B0B"  : "1px solid #ced4da" }} 
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label style={{ marginTop: "6px", fontWeight: "650" }}>Contraseña</Form.Label>
                    <Form.Control
                        type="text" 
                        value={"*".repeat(password.length)} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                                setPassword(password.slice(0, -1));
                            } else if (e.key.length === 1) {
                                setPassword(password + e.key); 
                            }
                            e.preventDefault();
                        }}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Button type="submit" className="login-button" style={{ borderRadius: "0px", backgroundColor: "#003B93", fontWeight: "645", color: "white" }}>
                            Ingresar
                        </Button>
                    </Col>
                    <Col>
                        <Button className="cancel-button" style={{ borderRadius: "0px", backgroundColor: "#E75D5D", color: "black", fontWeight: "645" }}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Mensaje de error en azul */}
            {error && (
                <div style={{ width: "90%", textAlign: "left", paddingLeft: "225px" }}>
                <p style={{ color: "#CD3232", fontWeight: "bold", marginTop: "10px" }}>
                    {error}
                </p>
            </div>

        )}
            <footer className="login-footer">
                Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
            </footer>
        </Container>
    );
}

export default Login;
