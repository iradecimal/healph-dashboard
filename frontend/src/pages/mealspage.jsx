import { Container, Row, Col } from "react-bootstrap";
import MealTable from "../components/meal_table";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";

const MealTablePage = () => {
    return (
        <>
        <Container fluid>
            <HamburgerMenu/>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col lg={10}>
                <h2>Meal Data</h2>
                    <Row fluid>
                    <MealTable/>
                    </Row>
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

export default MealTablePage;