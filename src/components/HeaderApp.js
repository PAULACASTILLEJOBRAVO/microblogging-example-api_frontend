import React from "react";
import { Navbar, NavbarBrand, Nav, Row, Col, Container } from "reactstrap";

export default function HeaderApp() {
    return(
        <Container>
            <Row>
                <Col>
                    <Navbar color="dark" light expand="md">
                        <NavbarBrand>
                            <h4 className="text-warning">
                                Mi aplicación de Microblogging
                            </h4>
                        </NavbarBrand>

                        <Nav className="ml-auto" navbar>
                            <NavbarBrand>
                            <h6 className="text-light">
                                Aika Kenshi
                            </h6>
                        </NavbarBrand>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
}
