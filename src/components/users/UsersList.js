import React, { useState, useEffect } from 'react';
import { Row, Col, CardTitle, Badge, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { getAllUsers } from '../../utils/apicalls';

function UserList () {
    const [users, setUsers] = useState([]);

    const getUser = () => {
        getAllUsers().then(data => {    
            setUsers(data.users);
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return(
        <div>
            <CardTitle tag="center"><Alert color='info'><strong>Usuarios registrados</strong><Badge pill>{users.length}</Badge></Alert></CardTitle>
            <Alert color='dark'>
                <Row>
                    <Col>
                        <ListGroup>
                            {users.map((user) => <ListGroupItem>{user.username}</ListGroupItem>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Alert>
        </div>
    );
}

export default UserList;