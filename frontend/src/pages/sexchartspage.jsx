import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Card } from "react-bootstrap";
import Plot from "react-plotly.js";
import Sidebar from "../components/sidebar.jsx";
import IntervalDropdown from "../components/intervaldropdown.jsx";
import HamburgerMenu from "../components/hamburgermenu.jsx";

import "./chartcard.css"

import axios from "axios";

const SexChartsPage = () => {
    var chartstyle = {width: "100%", height: "100%"}
    const [countInterval, setCountInterval] = useState("Weekly");
    const countIntervalOptions = ["Weekly", "Monthly"];
    const [avgInterval, setAvgInterval] = useState("Weekly");
    const avgIntervalOptions = ["Weekly", "Monthly"];
    const [countCharts, setCountCharts] = useState([]);
    const [loadingCountCharts, setLoadingCountCharts] = useState(true);
    const [avgCharts, setAvgCharts] = useState([]);
    const [loadingAvgCharts, setLoadingAvgCharts] = useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/sex/counts/weekly`)
        .then((response) => {
            console.log(response);
            setCountCharts(response.data[0]);
            console.log(response.data[0]);
            setLoadingCountCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingCountCharts(false);
        });

        axios.get(`http://localhost:8000/sex/average/weekly`)
        .then((response) => {
            console.log(response);
            setAvgCharts(response.data[0]);
            console.log(response.data[0]);
            setLoadingAvgCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingAvgCharts(false);
        });
    }, [])

    const handleCountIntervalChange = (interval) => {
        setCountInterval(interval)

        let CountAPIURL;
        if (interval === "Weekly") {
            CountAPIURL = `http://127.0.0.1:8000/sex/counts/weekly`
        } else if (interval === "Monthly") {
            CountAPIURL = `http://127.0.0.1:8000/sex/counts/monthly`
        }

        axios.get(CountAPIURL)
        .then((response) => {
            setCountCharts(response.data[0]);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });


    }

    const handleAvgIntervalChange = (interval) => {
        setAvgInterval(interval)

        let AvgAPIURL;
        if (interval == "Weekly") {
            AvgAPIURL = `http://127.0.0.1:8000/sex/average/weekly`
        } else if (interval === "Monthly") {
            AvgAPIURL = `http://127.0.0.1:8000/sex/average/monthly`
        }

        axios.get(AvgAPIURL)
        .then((response) => {
            setAvgCharts(response.data[0]);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }
    
    return(
        <>
        <Container fluid>
            <HamburgerMenu/>
        <Row>
            <Col md={2}>
                <Sidebar />
            </Col>
            <Col md={10}>
                <h2>Sex-Seperated Charts</h2>
                <Row>
                <Col lg={6} md={12}>
                    <h3>Intake Counts</h3>
                    <IntervalDropdown
                    options={countIntervalOptions}
                    selectedInterval={countInterval}
                    onIntervalChange={handleCountIntervalChange}
                    />
                    { loadingCountCharts ? (
                        <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                    ) :(
                    <Container>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.dailycalplot.data} 
                                    layout = {countCharts.dailycalplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.waterplot.data} 
                                    layout = {countCharts.waterplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.stepsplot.data} 
                                    layout = {countCharts.stepsplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.sleepplot.data} 
                                    layout = {countCharts.sleepplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    )}
                    
                </Col>
                <Col lg={6} md={12}>
                    <h3>Intake Averages</h3>
                    <IntervalDropdown
                    options={avgIntervalOptions}
                    selectedInterval={avgInterval}
                    onIntervalChange={handleAvgIntervalChange}
                    />
                    { loadingAvgCharts ? (
                        <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                    ) :(
                    <Container>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.dailycalplot.data} 
                                    layout = {avgCharts.dailycalplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.waterplot.data} 
                                    layout = {avgCharts.waterplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>                                
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.stepsplot.data} 
                                    layout = {avgCharts.stepsplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} sm={6} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.sleepplot.data} 
                                    layout = {avgCharts.sleepplot.layout} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    )}
                </Col>
                </Row>
            </Col>
        </Row>
        </Container>
        </>
    );
}

export default SexChartsPage