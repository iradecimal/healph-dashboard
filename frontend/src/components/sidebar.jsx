import {Container, Image, Nav} from "react-bootstrap";
import { MdShowChart, MdBarChart, MdHouse, MdRestaurant, MdInfo  } from "react-icons/md";
import { FaChartColumn, FaChartBar  } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    const location = useLocation();
    return(
    <>
        <Nav
        className="sidebar flex-column d-none d-lg-block"
        className="sidebar flex-column d-none d-lg-block"
        >
            <Container className=".d-lg-none">
                <Image fluid="true"
                    src="HEALPHsidebar.png"
                    alt="Sidebar Logo"
                    style={{width: "200px", height:"auto"}} 
                />
            </Container>
            <Container className=".d-lg-none">
                <Image fluid="true"
                    src="HEALPHsidebar.png"
                    alt="Sidebar Logo"
                    style={{width: "200px", height:"auto"}} 
                />
            </Container>
            <Nav.Item>
                <Nav.Link href="/"
                active ={location.pathname === "/"} >
                    <MdHouse className="icon" size={32}/>
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
                    <FaChartBar className="icon" size={32}/>
                    Meal Charts
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/trends"
                active ={location.pathname === "/trends"}>
                    <MdShowChart className="icon" size={32}/>
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
    </>
    );
}

export default Sidebar;