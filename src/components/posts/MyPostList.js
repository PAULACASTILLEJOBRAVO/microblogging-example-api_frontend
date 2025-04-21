import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Row, Col, Card, CardTitle, Badge, UncontrolledCollapse, CardBody, Table, Alert, Button, Nav, NavItem, NavLink, Navbar, NavbarBrand, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, TabContent } from 'reactstrap';
import { FaEdit, FaFeatherAlt, FaTrashAlt } from 'react-icons/fa';
import { getMyPost, deletePost } from '../../utils/apicalls';
import { getDateInStrFormat } from '../../utils/utils';
import AddPost from './AddPost.js';
import EditPost from './EditPost.js';

function MyPostList (){
    const [post, setPost] = useState([]);
    const [edit, setEdit] = useState(<Alert color='warning'>Seleccione editar un post de la lista</Alert>);
    const [activeTab, setActiveTab] = useState('1');
    const [showDeleteModal, setShowDeleteModal] = useState(null);
  
    
    const getPost = () => {
        getMyPost(sessionStorage.getItem('iduser')).then(data => {
            setPost(data.posts);
        });
    }

    useEffect(() => {
        getPost();
    }, []);

    const toggleTab = tab => {
        if(activeTab !== tab){
            setActiveTab(tab);
        }
    }

    const handleShowEdit = posts => {
        setEdit(<EditPost post={posts} updateMyPost={handleUpdateMyPosts}></EditPost>);
    }

    const handleUpdateMyPosts = () => {
        getPost();
    };

    const askForDelete = post => {
   
        setShowDeleteModal(
            <Modal isOpen="true">
                <ModalHeader>Eliminar post</ModalHeader>
                <ModalBody>
                    ¿Estás seguro de desear eliminar el post <strong>{post.title}</strong>?
                </ModalBody>
                <ModalFooter>
                    <Button color='warning' onClick={() => deletePosts(post)}>Eliminar</Button>
                    <Button color='secondary' onClick={() => setShowDeleteModal(null)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }

    const deletePosts = post => {
        deletePost(post._id).then(res => checkDELETEPost(res));
    }

    const checkDELETEPost = res => {
        if(res === "OK"){
            setShowDeleteModal(null);
            handleUpdateMyPosts();
        }else{
            console.error("ERROR");
        }
    }

    return (
        <div>
            {showDeleteModal}
            <Row>
                <Col>
                    <CardTitle tag="center"><Alert color='info'><strong>Mis Posts publicados</strong><Badge pill>{post.length}</Badge></Alert></CardTitle>
                    <Table>
                        <tbody>
                            {post.map((posts, index) => {
                                return(
                                    <div>
                                        <Row>
                                            <Col>
                                                <Navbar expand="md">
                                                    <NavbarBrand href='#' id={"toggler"+index}>
                                                        <h5>
                                                            <FaFeatherAlt/>
                                                            {posts.title}
                                                        </h5>
                                                    </NavbarBrand>
                                                    <Nav className='ml-auto' navbar>
                                                        <NavItem>
                                                            <NavLink>
                                                                <Button outline onClick={() => handleShowEdit(posts)}><FaEdit/></Button>
                                                                <Button outline onClick={() => askForDelete(posts)}><FaTrashAlt/></Button>  
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </Navbar>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <UncontrolledCollapse toggler={"#toggler"+index}>
                                                    <Card>
                                                        <CardBody>
                                                            <Row><Col>{posts.description}</Col></Row>
                                                            <Row><Col align="right"><small>{() => getDateInStrFormat(new Date(posts.publicationdate))}</small></Col></Row>
                                                        </CardBody>
                                                    </Card>
                                                </UncontrolledCollapse>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col XS="5">
                    <Nav tabs>
                        <NavItem>
                            <NavLink href='#' className={() => classnames({active: activeTab === '1'})} onClick={() => toggleTab('1') }>
                                Añadir
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='#' className={() => classnames({active: activeTab === '2'})} onClick={() => toggleTab('2') }>
                                Editar
                            </NavLink>
                        </NavItem>
                    </Nav>  
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col>
                                    <AddPost updateMyPost = {handleUpdateMyPosts}/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    {edit}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent> 
                </Col>
            </Row>  
        </div>
    ); 
} 

export default MyPostList;