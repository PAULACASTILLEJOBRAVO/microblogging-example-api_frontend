import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardTitle, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../utils/apicalls";
import PostList from "./posts/PostList";
import UserList from "./users/UsersList";

function Signin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const onSignin = event => {
        login(username, password)
        .then(data => checkLogin(data))
        .catch(error => setLoginMessage(<Alert color="danger">{error.message}</Alert>));
    }

    const checkLogin = (data) => { 
        
        if(data.message === 'ok'){
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('iduser', data.id);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', username);
            navigate("/home");
        }else{
            setLoginMessage(<Alert color="danger">{data.message}</Alert>);
        }
    }

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
                            <Input type="password" name="password" id="aPassword" placeholder="Introduce tu contraseña:" onChange={handlePasswordChange} required/>
                        </FormGroup>
                        <Button onClick={onSignin}>Entrar</Button>
                        {loginMessage}
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