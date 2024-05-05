import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Card } from "react-bootstrap";
import Plot from "react-plotly.js";
import Sidebar from "../components/sidebar.jsx";
//import IntervalDropdown from "../components/intervaldropdown.jsx";
import HamburgerMenu from "../components/hamburgermenu.jsx";

import "./chartcard.css"

import axios from "axios";

const TrendsPage = () => {
    var chartstyle = {width: "100%", height: "100%"}
    const [intakeCharts, setIntakeCharts] = useState([]);
    const [loadingIntakeCharts, setLoadingIntakeCharts] = useState(true);
    const [mealCharts, setMealCharts] = useState([]);
    const [loadingMealCharts, setLoadingMealCharts] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/trends/intake/monthly`)
        .then((response) => {
            console.log(response);
            setIntakeCharts(response.data);
            setLoadingIntakeCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingIntakeCharts(false);
        });

        axios.get(`${import.meta.env.VITE_BACKEND}/trends/meal/monthly`)
        .then((response) => {
            console.log(response);
            setMealCharts(response.data);
            setLoadingMealCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingMealCharts(false);
        });
    }, [])


    return(
        <>
        <Container fluid>
            <HamburgerMenu/>
        <Row>
            <Col md={2} style={{justifyContent: 'left'}}>
                <Sidebar />
            </Col>
            <Col md={10}>
                <h2>Monthly User Trends</h2>
                <Row style={{
                    padding:"0 15px 0 15px",
                    marginBottom:"20px"
                }}>
                {/* <IntervalDropdown
                options={intervalOptions}
                selectedInterval={chartInterval}
                onIntervalChange={handleChartIntervalChange}
                /> */}
                <h3>Daily Intake Trends</h3>
                { loadingIntakeCharts ? (
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                ) : (
                    <Container>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {intakeCharts.dailycalplot.data} 
                                    layout = {intakeCharts.dailycalplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {intakeCharts.sleepplot.data} 
                                    layout = {intakeCharts.sleepplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {intakeCharts.waterplot.data} 
                                    layout = {intakeCharts.waterplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {intakeCharts.stepsplot.data} 
                                    layout = {intakeCharts.stepsplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container> 
                )}
                </Row>
                <Row>
                {/* <IntervalDropdown
                options={intervalOptions}
                selectedInterval={chartInterval}
                onIntervalChange={handleChartIntervalChange}
                /> */}
                <h3>Per Plate Trends</h3>
                { loadingMealCharts ? (
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                ) : (
                    <Container>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {mealCharts.fatplot.data} 
                                    layout = {mealCharts.fatplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {mealCharts.proteinsplot.data} 
                                    layout = {mealCharts.proteinsplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {mealCharts.carbsplot.data} 
                                    layout = {mealCharts.carbsplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {mealCharts.calplot.data} 
                                    layout = {mealCharts.calplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {mealCharts.wasteplot.data} 
                                    layout = {mealCharts.wasteplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container> 
                )}
                </Row>
            </Col>
        </Row>   
        </Container>
        </>
    )
};

export default TrendsPage;