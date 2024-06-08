import { Container, Row, Col } from "react-bootstrap";
import LifestyleTable from "../components/lifestyles_table";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";
const lifestylesTablePage = () => {
    return (
        <>
        <Container fluid>
            <Row>
                <HamburgerMenu />
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <h2>Lifestyle Data</h2>
                    <Row fluid>
                    <LifestyleTable/>
                    </Row>
                    {/* <lifestylesTable/> */}
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

export default lifestylesTablePage;