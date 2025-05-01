import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../utils/apicalls";
import PostList from "./posts/PostList";
import UserList from "./users/UsersList";

function Signin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginMessage, setLoginMessage] = useState('');
    const [messageColor, setMessageColor] = useState('danger');

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const onSignin = () => {
        if (!username && !password) {
            setLoginMessage("Completa todos los campos");
            setMessageColor("danger");
            return;
        }

        if(!username){
            setLoginMessage("Completa el campo username");
            setMessageColor("danger");
            return;
        } 
        
        if(!password){
            setLoginMessage("Completa el campo password");
            setMessageColor("danger");
            return;
        }

        login(username, password)
        .then(data => checkLogin(data))
        .catch(error => checkLogin(error));
    }

    const checkLogin = (data) => { 
        
        if(data.message === 'Login completado'){
            sessionStorage.setItem('iduser', data.id);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', data.username);

            navigate("/home");
        }else{
            if (data.response) {
                const errorMessage = data.response.data.message || "Ha ocurrido un error desconocido. Inténtalo nuevamente.";
                setLoginMessage(errorMessage);
                setMessageColor("danger");
            } else {
                setLoginMessage("¡Error en la solicitud, intenta más tarde!");
                setMessageColor("danger");
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
          navigate("/home");
        }
    }, [navigate]);

    return(
        <Container>
            <Row>
                <Col md="8" sm="6" xs="12" >
                    <PostList/>
                </Col>
                <Col md="4" sm="6" xs="12">
                    <Card body>
                    <CardTitle tag="h4">Login</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="aUsername">Username</Label>
                            <Input type="text" name="username" id="aUsername" placeholder="Introduce tu nombre:" onChange={handleUsernameChange} required/>
                        </FormGroup>
                        <FormGroup>    
                            <Label for="aPassword">Password</Label>
                            <div className="d-flex align-items-center position-relative">
                                <Input type={showPassword ? "text" : "password"} name="password" id="aPassword" placeholder="Introduce tu contraseña:" onChange={handlePasswordChange} required />
                                <button type="button" onClick={togglePasswordVisibility} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", marginLeft: "5px" }}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </FormGroup>
                        <Button onClick={onSignin}>Entrar</Button>
                        {loginMessage && <Alert color={messageColor}>{loginMessage}</Alert>}
                    </Form> 
                    </Card>
                    <Row>
                        <Col tag="center">
                            <Link to="/signup"><strong className="text-muted">Registrarse</strong></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <UserList/>
            </Row>
        </Container>
    );
}

export default Signin;