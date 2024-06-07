import {Image, Nav, Navbar} from "react-bootstrap";
import { MdShowChart, MdBarChart, MdHouse, MdRestaurant } from "react-icons/md";
import { FaChartColumn, FaChartBar  } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import "./hamburgermenu.css";

function HamburgerMenu() {
    const location = useLocation();
    return(
    <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary d-block d-lg-none" >
            <Navbar.Brand>
                <Image
                    src="HEALPHsidebar.png"
                    alt="HEAL-PH"
                    fluid
                    style={{width: "200px", height:"auto"}}
                />
            </Navbar.Brand> 
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Item>
                    <Nav.Link href="/"
                    active ={location.pathname === "/"} >
                        <MdHouse className="icon"/>
                        Overview
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/intakecharts"
                    active ={location.pathname === "/intakecharts"} >
                        <FaChartColumn className="icon"/>
                        Intake Charts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/mealcharts"
                    active ={location.pathname === "/mealcharts"} >
                        <FaChartBar className="icon"/>
                        Meal Charts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/trends"
                    active ={location.pathname === "/trends"}>
                        <MdShowChart className="icon"/>
                        Trends
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/intakes"
                    active ={location.pathname === "/intakes"}>
                        <MdBarChart className="icon"/>
                        Intakes
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/meals"
                    active ={location.pathname === "/meals"}>
                        <MdRestaurant className="icon"/>
                        Meals   
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
    );
}

export default HamburgerMenu;