import {Image, Nav} from "react-bootstrap";
import { MdShowChart, MdBarChart, MdHouse, MdRestaurant } from "react-icons/md";
import { FaChartColumn, FaChartBar  } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    const location = useLocation();
    return(
    <>
        <Nav
        className="sidebar flex-column d-none d-md-block"
        >
            <Image
                src="HEALPHsidebar.png"
                alt="Sidebar Logo"
                style={{width: "125px", height:"auto"}}
            />
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
    </>
    );
}

export default Sidebar;