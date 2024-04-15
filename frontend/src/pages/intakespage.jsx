import { Container, Row, Col } from "react-bootstrap";
import IntakesTable from "../components/intakes_table";
import Sidebar from "../components/sidebar";
const IntakesTablePage = () => {
    return (
        <>
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <IntakesTable/>
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

export default IntakesTablePage;