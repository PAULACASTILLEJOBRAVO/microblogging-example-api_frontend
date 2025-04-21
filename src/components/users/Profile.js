import React, { useState, useEffect } from 'react';
import { Row, Col, CardTitle, Alert, Card, CardBody, Button, CardText } from 'reactstrap';
import { getOneUser } from '../../utils/apicalls';

import EditUser from './EditUser.js';

function Profile({iduser}){
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(null);

    const getUser = (iduser) => {
        getOneUser(iduser).then(data => {
            setUser(data.user);
        });
    }

    const handleUpdateProfile = (iduser) => {
        getUser(iduser);
    };

    const handleShowEdit = () => {
        setEdit(<EditUser user={user} updateProfile={handleUpdateProfile} setEdit={setEdit}></EditUser>);
    }

    useEffect(() => {
        getUser(iduser);
    }, [iduser]);

    return(
        <div>
            {edit}
            <CardTitle tag="center"><Alert color='info'><strong>Perfil de {user.username}</strong></Alert></CardTitle>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Card style={{ width: '20rem', height: 'auto'}}>
                        <CardBody>
                            <CardText>Nombre de usuario: {user.username}</CardText>
                            <CardText>Nombre completo: {user.fullname}</CardText>
                            <CardText>Email: {user.email}</CardText>
                            <Button color='warning' onClick={() => handleShowEdit(user)}>Editar</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;