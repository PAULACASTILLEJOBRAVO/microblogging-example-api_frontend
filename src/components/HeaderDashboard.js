import React ,{useState} from "react";
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Tooltip } from "reactstrap";
import { FaSignOutAlt, FaCogs } from "react-icons/fa";

export default function HeaderDashboard ({onShow, onLogout}) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return(
        <Navbar color="warning" light expand="sm">
            <NavbarBrand><FaCogs/>Dashboard</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse navbar isOpen={isOpen} >
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#" onClick={onShow.bind(this, 1)}>Todos los Posts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={onShow.bind(this, 2)}>Mis Posts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={onShow.bind(this, 3)}>
                            {sessionStorage.getItem('username')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" id="tooltip_logout" onClick={onLogout}>
                            <FaSignOutAlt/>
                            <Tooltip isOpen={tooltipOpen} placement="bottom" target="tooltip_logout" toggle={() => { setTooltipOpen(!tooltipOpen) }}>
                                Salir
                            </Tooltip>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}
