import { Container, Row, Col } from "react-bootstrap";
import IntakesTable from "../components/intakes_table";
import Sidebar from "../components/sidebar";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css"; 
const IntakesTablePage = () => {
    return (
        <>
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <h2>Intake Data</h2>
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