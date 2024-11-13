import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { FaFeather } from 'react-icons/fa';
import { getAllPosts } from '../../utils/apicalls';
import { getDateInStrFormat } from '../../utils/utils';

function PostList (props){
    const [posts, setPosts] = useState([]);

    const getPost = () => {
        getAllPosts().then(posts => {
            setPosts(posts);
        });
    }

    useEffect(() => {
        getPost();
    }, []);

    return(
        <div>
            <CardTitle tag="center"><Alert color='info'><strong>Posts publicados</strong><Badge pill>{posts.length}</Badge></Alert></CardTitle>
            <Table>
                <tbody>
                    {posts.map((post, index) => {
                        return(
                            <div>
                                <Alert color='dark'>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h5"><FaFeather/>{post.title}</CardTitle>
                                            <Card>
                                                <CardBody>
                                                    <Row>
                                                        <Col>
                                                            {post.description}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col align="right">
                                                            <small>{getDateInStrFormat(new Date(post.publicationdate))} - {post.user.username}</small>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Alert>
                            </div>);
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default PostList;