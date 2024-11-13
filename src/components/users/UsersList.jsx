import React, { Component } from 'react';
import { Row, Col, CardTitle, Badge, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { getAllUsers } from '../../utils/apicalls';

class UserList extends Component{
    state = {
        users: []
    };

    getUser(){
        getAllUsers().then(users => {
            this.setState({
                users
            });
        });
    }
    componentDidMount(){
        this.getUser();
    }
    render(){
        return(
            <div>
                <CardTitle tag="center"><Alert color='info'><strong>Usuarios registrados</strong><Badge pill>{this.state.users.length}</Badge></Alert></CardTitle>
                <Alert color='dark'>
                    <Row>
                        <Col>
                            <ListGroup>
                                {this.state.users.map((users) => <ListGroupItem>{users.username}</ListGroupItem>)}
                            </ListGroup>
                        </Col>
                    </Row>
                </Alert>
            </div>
        );
    }
}

export default UserList;