import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import HeaderDashboard from "./HeaderDashboard";
import MyPostList from "./posts/MyPostList.js";
import PostList from "./posts/PostList.js";
import { useNavigate } from "react-router";

function Home (props){
    const [show, setShow] = useState(<PostList/>);

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    }
    const handleOnShow = option => {
        if(option === 1){
            setShow(<PostList/>);
        }else if(option === 2){
            setShow(<MyPostList/>);
        }else if(option === 3){
            alert('Usuario: '+sessionStorage.getItem('username')+'\nRol: '+sessionStorage.getItem('role'));
        }
    }
    
    if(sessionStorage.getItem('username') === null){
        navigate("/");
    }else{
        return(
            <Container>
                <Row>
                    <Col><HeaderDashboard onLogout={handleLogout} onShow={handleOnShow}/></Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {show}
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default Home;