import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router";

import HeaderDashboard from "./HeaderDashboard.js";
import MyPostList from "./posts/MyPostList";
import PostList from "./posts/PostList";
import Profile from "./users/Profile.js";

function Home (){
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
            setShow(<Profile iduser={sessionStorage.getItem('iduser')}/>);
        }
    }
    
    if(sessionStorage.getItem('username') === null){
        navigate("/");
    }else{
        return(
            <Container>
                <Row>
                    <Col xs="12"><HeaderDashboard onLogout={handleLogout} onShow={handleOnShow}/></Col>
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