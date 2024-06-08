import {Image, Nav, Navbar} from "react-bootstrap";
import { MdShowChart, MdBarChart, MdHouse, MdRestaurant, MdInfo } from "react-icons/md";
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
                        <MdHouse className="icon" size={32}/>
                        Overview
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/lifestylecharts"
                    active ={location.pathname === "/lifestylecharts"} >
                        <FaChartColumn className="icon" size={32}/>
                        Lifestyle Charts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/mealcharts"
                    active ={location.pathname === "/mealcharts"} >
                        <FaChartBar className="icon" size={32}/>
                        Meal Charts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/trends"
                    active ={location.pathname === "/trends"}>
                        <MdShowChart className="icon" size={32}/>
                        Trends
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/lifestyles"
                    active ={location.pathname === "/lifestyles"}>
                        <MdBarChart className="icon" size={32}/>
                        Lifestyle
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/meals"
                    active ={location.pathname === "/meals"}>
                        <MdRestaurant className="icon" size={32}/>
                        Meals   
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/about"
                    active ={location.pathname === "/about"} >
                        <MdInfo className="icon" size={32}/>
                        About
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
    );
}

export default HamburgerMenu;