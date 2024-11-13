import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { postNewUser } from '../utils/apicalls.js';

export default function Signup(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('subscriber');

    const [loginMessage, setLoginMessage] = useState('');

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

    const onSignup = () => {
        postNewUser(username, password, fullname, email, role)
        .then(res => checkPOSTNewUser(res))
        .catch(err => checkPOSTNewUser(err));
    }

    const checkPOSTNewUser = (res) => {

        if(res.message === 'OK'){

            sessionStorage.setItem('username', username);
            sessionStorage.setItem('iduser', res.id);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('email', email);
            
            navigate("/home");
        }else{
            setLoginMessage(<Alert color="danger">¡Error!</Alert>);
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
                                <Input type="password" name="password" id="aPassword" placeholder="Introduce tu password" onChange={handlePasswordChange} required/>
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
                                    <option value="subscriber">Subscriptor</option>
                                    <option value="admin">Administrador</option>
                                </Input> 
                            </FormGroup>
                            {loginMessage}
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