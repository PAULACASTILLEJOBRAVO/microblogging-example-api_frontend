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

    const [signupMessage, setSignupMessage] = useState('');
    const [messageColor, setMessageColor] = useState('danger');
    
    const getPost = () => {
        getMyPost(sessionStorage.getItem('iduser'))
        .then(data => {
            if (data && data.posts) {
                setPost(data.posts);
            } else {
                setPost([]); // evita error en renderizado
            }
        })
        .catch(() => {
          setPost([]); // si hay error, tratamos como sin posts
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
                {signupMessage && <Alert color={messageColor}>{signupMessage}</Alert>}
                <ModalFooter>
                    <Button color='danger' onClick={() => deletePosts(post)}>Eliminar</Button>
                    <Button color='secondary' onClick={() => setShowDeleteModal(null)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }

    const deletePosts = post => {
        deletePost(post._id)
        .then(result => checkDELETEPost(result))
        .catch(error => checkDELETEPost(error));
    }

    const checkDELETEPost = data => {
        if(data.message === "Blog eliminado correctamente"){
            setSignupMessage(data.message);
            setMessageColor("success");

            setTimeout(() => {
                setShowDeleteModal(null);
                handleUpdateMyPosts();
            }, 1500);
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

    return (
        <div>
            {showDeleteModal}
            <Row>
                <Col>
                    <CardTitle tag="center"><Alert color='info'><strong>Mis Posts publicados</strong><Badge pill>{post.length}</Badge></Alert></CardTitle>
                    
                    {post.length === 0 ? (
                        <Alert color="secondary">Aún no has creado ningún post.</Alert>
                        ) : (
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
                        )
                    }
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