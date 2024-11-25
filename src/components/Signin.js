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
        .then(res => checkLogin(res))
        .catch(err => console.error(err));
    }

    const checkLogin = (res) => { 
        
        if(res.message === 'ok'){
            sessionStorage.setItem('role', res.role);
            sessionStorage.setItem('iduser', res.id);
            sessionStorage.setItem('email', res.email);
            sessionStorage.setItem('username', username);
            navigate("/home");
        }else{
            setLoginMessage(<Alert color="danger">{res.message}</Alert>);
        }
    }

    return(
        <Container>
            <Row>
                <Col md="9" sm="6" xs="12" >
                    <PostList/>
                </Col>
                <Col md="3" sm="6" xs="12">
                    <Card body>
                    <CardTitle tag="h4">Login</CardTitle>
                    {loginMessage}
                    <Form>
                        <FormGroup>
                            <Label for="aUsername">Username</Label>
                            <Input type="text" name="username" id="aUsername" placeholder="Introduce tu nombre:" onChange={handleUsernameChange} required/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="aPassword">Password</Label>
                            <Input type="text" name="password" id="aPassword" placeholder="Introduce tu contraseña:" onChange={handlePasswordChange} required/>
                        </FormGroup>
                        <Button onClick={onSignin}>Entrar</Button>
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