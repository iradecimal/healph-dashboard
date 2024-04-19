import { Container, Row, Col } from "react-bootstrap";
import IntakesTable from "../components/intakes_table";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";
const IntakesTablePage = () => {
    return (
        <>
        <Container fluid>
            <Row>
                <HamburgerMenu />
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <h2>Daily Intake Data</h2>
                    <Row fluid>
                    <IntakesTable/>
                    </Row>
                    {/* <IntakesTable/> */}
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

export default IntakesTablePage;