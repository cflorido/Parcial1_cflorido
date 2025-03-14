import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

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
            <h1  
                style={{  
                    textAlign: "center",  
                    fontFamily: "'Roboto', sans-serif",  
                    fontWeight: 900,  
                    fontSize: "35px",  
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",  
                    marginBottom: "1px"  
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

            <h3 style={{ textAlign: "center", fontWeight: 700 }}>Inicio de sesión</h3>

            {/* Formulario */}
            <Form 
                onSubmit={handleSubmit} 
                style={{ width: "45%", marginLeft: "auto", marginRight: "auto" }}
            >
                <Form.Group controlId="formUsername" style={{ marginBottom: "15px" }}>
                    <Form.Label style={{ fontWeight: 700 }}>Nombre de usuario</Form.Label>
                    <Form.Control
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    style={{
                        height: "45px", 
                        borderRadius: "0px",
                        backgroundColor: "#d9d9d9",
                        color: "black",
                        marginBottom: "0px",
                    }}
                />

                </Form.Group>

                <Form.Group controlId="formPassword" style={{ marginBottom: "15px" }}>
                    <Form.Label style={{ fontWeight: 700, marginTop: "0px" }}>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            height: "45px", 
                            borderRadius: "0px",
                            backgroundColor: "#d9d9d9",
                            color: "black"
                        }}
                    />
                </Form.Group>

                {/* Botones dentro del Form */}
                <Row>
                <Col>
                <Button 
                        type="submit" 
                        className="w-100"
                        style={{
                            borderRadius: "0px", 
                            backgroundColor: "#003b93",  
                            color: "white",  
                            fontWeight: 650,
                        }}
                    >
                        Ingresar
                    </Button>
                </Col>

                    <Col>
                        <Button variant="danger" className="w-100"                         style={{
                            borderRadius: "0px",  
                            backgroundColor: "#e75d5d",  
                            color: "black",  
                            fontWeight: 650,  
                        }}>Cancelar</Button>
                    </Col>
                </Row>
            </Form>

            {/* Mensaje de error */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Pie de página */}
            <footer className="text-center mt-4">
                <p style={{ marginTop: "60px" }}>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </footer>
        </Container>
    );
}

export default Login;
