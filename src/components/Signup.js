import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postNewUser } from '../utils/apicalls.js';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('suscriptor');

    const [signupMessage, setSignupMessage] = useState('');
    const [messageColor, setMessageColor] = useState('danger');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleFullnameChange = event => {
        setFullname(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handleRoleChange = event => {
        setRole(event.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const onSignup = () => {
        if (!username && !password && !email) {
            setSignupMessage("Completa todos los campos");
            setMessageColor("danger");
            return;
        }

        if(!username){
            setSignupMessage("Completa el campo username");
            setMessageColor("danger");
            return;
        } 
        
        if(!password){
            setSignupMessage("Completa el campo password");
            setMessageColor("danger");
            return;
        }

        if(!email){
            setSignupMessage("Completa el campo username");
            setMessageColor("danger");
            return;
        } 

        if (!emailRegex.test(email)) {
            setSignupMessage("Introduce un email válido");
            setMessageColor("danger");
            return;
        }

        postNewUser(username, password, fullname, email, role)
        .then(data => checkPOSTNewUser(data))
        .catch(error => checkPOSTNewUser(error));
    }

    const checkPOSTNewUser = (data) => {
        
        if(data.message === 'Usuario creado correctamente'){

            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('iduser', data.id);
            
            navigate("/");
        }else{
            if (data.response) {
                const errorMessage = data.response.data.message || "Ha ocurrido un error desconocido. Inténtalo nuevamente.";
                const detailedError = data.response.data.error || "";
                setSignupMessage(errorMessage, detailedError);
                setMessageColor("danger");
            } else {
                setSignupMessage("¡Error en la solicitud, intenta más tarde!");
                setMessageColor("danger");
            }
        }

    }

    return(
        <Container>
            <Row>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <Card body>
                        <CardTitle tag="h4">Registro de un nuevo usuario</CardTitle>
                        <Form>
                            <FormGroup>
                                <Label for="aUsername">Username</Label>
                                <Input type="text" name="username" id="aUsername" placeholder="Introduce tu username" onChange={handleUsernameChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aPassword">Password</Label>
                                <div className="d-flex align-items-center position-relative">
                                    <Input type={showPassword ? "text" : "password"} name="password" id="aPassword" placeholder="Introduce tu password" onChange={handlePasswordChange} required style={{ marginRight: "0-5rem" }}/>    
                                    <button type="button" onClick={togglePasswordVisibility} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "4px", marginLeft: "5px" }}>                       
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>    
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aFullname">Fullname</Label>
                                <Input type="text" name="fullname" id="aFullname" placeholder="Introduce tu nombre completo" onChange={handleFullnameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aEmail">Email</Label>
                                <Input type="text" name="email" id="aEmail" placeholder="Introduce tu email" onChange={handleEmailChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aRole">Role</Label>
                                <Input type="select" name="role" id="aRole" value={role} onChange={handleRoleChange} >
                                    <option value="subscriber">Suscriptor</option>
                                    <option value="publisher">Publicador</option>
                                </Input> 
                            </FormGroup>
                            {signupMessage && <Alert color={messageColor}>{signupMessage}</Alert>}
                            <Button onClick={onSignup}>Registro</Button>
                        </Form>
                    </Card>
                    <Row>
                        <Col tag="center">
                            <Link to="/"><strong className="text-muted">Login</strong></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}