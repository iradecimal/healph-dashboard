import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Card } from "react-bootstrap";
import Plot from "react-plotly.js";
import Sidebar from "../components/sidebar.jsx";
import IntervalDropdown from "../components/intervaldropdown.jsx";
import "./chartcard.css"

import axios from "axios";

const TrendsPage = () => {
    var chartstyle = {width: "100%", height: "100%"}
    const [chartInterval, setChartInterval] = useState("Monthly");
    const intervalOptions = ["Monthly", "3 Month"];
    const [trendCharts, setTrendCharts] = useState([]);
    const [loadingTrendCharts, setLoadingTrendCharts] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/trends/intake/monthly`)
        .then((response) => {
            console.log(response);
            setTrendCharts(response.data);
            setLoadingTrendCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingTrendCharts(false);
        });
    }, [])

    const handleChartIntervalChange = (interval) => {
        setChartInterval(interval);

        let chartAPIURL;
        if (interval === "Monthly") {
            chartAPIURL = `http://localhost:8000/trends/intake/monthly`
        } else if (interval === "3 Month") {
            chartAPIURL = `http://localhost:8000/trends/intake/3monthly`
        }
        axios.get(chartAPIURL)
        .then((response) => {
            setTrendCharts(response.data)
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
        })
    }

    return(
        <>
        <Container fluid>
        <Row>
            <Col md={2} style={{justifyContent: 'left'}}>
                <Sidebar />
            </Col>
            <Col md={10}>
                <h2>Intake Trends</h2>
                {/* <IntervalDropdown
                options={intervalOptions}
                selectedInterval={chartInterval}
                onIntervalChange={handleChartIntervalChange}
                /> */}
                { loadingTrendCharts ? (
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
                                    data = {trendCharts.dailycalplot.data} 
                                    layout = {trendCharts.dailycalplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {trendCharts.sleepplot.data} 
                                    layout = {trendCharts.sleepplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {trendCharts.waterplot.data} 
                                    layout = {trendCharts.waterplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xl={6} lg={8} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {trendCharts.stepsplot.data} 
                                    layout = {trendCharts.stepsplot.layout}
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container> 
                )}
            </Col>
        </Row>   
        </Container>
        </>
    )
};

export default TrendsPage;