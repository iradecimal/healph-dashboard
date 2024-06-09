/* eslint-disable react/no-unescaped-entities */
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";

const AboutPage = () => {
    return (
        <>
        <Container fluid>
            <HamburgerMenu/>
            <Row>
                <Col lg={2}>
                    <Sidebar />
                </Col>
                <Col lg={10}>
                <h2>About</h2>
                <Row>
                    <Col xl={5} lg={5} style={{ marginBottom: "20px" }}>
                    <Card style={{ marginBottom: "12px" }}>
                    <Card.Header>
                        <Card.Title>About HEAL-PH</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            HEAL-PH is a lifestyle monitoring application that aims to promote the Planetary Health Diet (PHD) to its users.
                            It records the nutritional intake and lifestyle data of its users to assess how much they follow the PHD and healthy lifestyle habits.
                        </Card.Text>
                    </Card.Body>
                        
                    </Card>
                    <Card style={{ marginBottom: "12px" }}>
                    <Card.Header>
                        <Card.Title>About HEAL-PH Dashboard</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                            HEAL-PH Dashboard is a data visualization dashboard that aims to utilize the data collected by HEAL-PH to create visualizations and analysis for nutrition researchers and professionals.
                            <br/><br/>
                            The dashboard utilizes data from the HEAL-PH application, which it then transforms into data visualizations for its users. The users can also view the raw data in tabular form for their convenience.
                            <br/><br/>
                            The mobile application is able to record the following data. These data are used to create the visualizations in the application:
                            <br/><br/>
                            Data taken on User account creation / update:
                            <ul>
                                <li>Sex </li>
                                <li>Weight [kg]</li>
                                <li>Height [cm]</li>
                                <li>Age [in years]</li>
                            </ul> 
                            Data taken Daily:
                            <ul>
                                <li>Step Count</li>
                                <li>Hours of Sleep [hrs]</li>
                                <li>Water Intake [250mL/glass]</li>
                                <li>Daily Caloric Intake [kcal]</li>
                                <li>HALE score*</li>
                                <li>PHD score*</li>
                            </ul> 
                            Data taken every meal:
                            <ul>
                                <li>Fat [g]</li>
                                <li>Carbohydrates [g]</li>
                                <li>Proteins [g]</li>
                                <li>Calories [kcal]</li>
                                <li>Food Waste [g]</li>
                                <li>Food Groups in Plate</li>
                            </ul>

                            *The HALE and PHD score are aggregate scores based on the user’s intake throughout the week.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col xl={5} lg={5} style={{ marginBottom: "20px" }}>
                    <Card style={{ marginBottom: "12px" }}>
                    <Card.Header>
                        <Card.Title>About HEAL-PH</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        The dashboard contains the following pages, each containing their own visualizations and measures: <br/>
                        <ul>
                            <li>
                            Overview Page - Has an overview of the user population's intake and meal statistics. It utilizes averages and adequacy percentages to give a cursory view of the populations' fitness styles. 
                            </li>
                            <li>
                            Lifestyle Charts Page - Contains the adequacy analysis of the user's daily intake in terms of caloric and water consumption, sleeping time, and their activity level based on their step count.
                            </li>
                            <li>
                            Meal Charts Page - Contains the food group per plate charts which depicts the composition of the user's average plate. It also contains adequacy analysis of the user's meal in terms of carbohydrate, fat, protein, caloric intake, and the total food waste.
                            </li>
                            <li>
                            Trends Page - Contains the user averages for intake and meal data arranged chronologically. It also contains the predicted trends for user averages generated for the next 5 days.
                            </li>
                            <li>
                            Lifestyles Page - Contains the raw data for intakes presented in the charts from the previous pages in a table. The user can sort, filter, or search for specific data within the table and download the data displayed as a csv file.
                            </li>
                            <li>
                            Meals Page - Contains the raw data for meals presented in the charts from the previous pages in a table. The user can sort, filter, or search for specific data within the table and download the data displayed as a csv file.
                            </li>
                        </ul>
                        </Card.Text>
                    </Card.Body>
                        
                    </Card>
                    <Card style={{ marginBottom: "12px" }}>
                    <Card.Header>
                        <Card.Title>Other Resources</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        The link below contains a primer document on how to use the web application:<br/>
                        <a href="https://docs.google.com/document/d/e/2PACX-1vSKRIIwSOaolLNHOGa5vWeIbgsRr5sQ01TnqZUV0oVsMikbzayPztv17kU7mVCG2ufyd79EzaEdINP1/pub">
                        Link to Primer Document
                        </a>
                        <br/><br/>
                        For any inquiries regarding the dashboard, please send them to the email down below:<br/>
                        <a href="mailto:iggesmundo@up.edu.ph">iggesmundo@up.edu.ph</a>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
        
        </>
    );
}

export default AboutPage;