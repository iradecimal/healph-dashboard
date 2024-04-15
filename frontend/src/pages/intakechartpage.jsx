import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Card } from "react-bootstrap";
import Plot from "react-plotly.js";
import Sidebar from "../components/sidebar.jsx";
import IntervalDropdown from "../components/intervaldropdown.jsx";
import SexDropdown from "../components/sexdropdown.jsx";
import "./chartcard.css"

import axios from "axios";

const IntakeChartsPage = () => {
    //var chartconfig = {responsive: true}
    var chartstyle = {width: "100%", height: "100%"}
    const [countInterval, setCountInterval] = useState("Daily");
    const countIntervalOptions = ["Daily", "Weekly", "Monthly"];
    const [countSex, setCountSex] = useState("All");
    const [avgSex, setAvgSex] = useState("All");
    const [countChartURL, setCountChartURL] = useState(`http://localhost:8000/intakes/count/daily/`)
    const [countChartSex, setCountChartSex] = useState('')
    const [countCharts, setCountCharts] = useState([]);
    const [loadingCountCharts, setLoadingCountCharts] = useState(true);
    const [avgCharts, setAvgCharts] = useState([]);
    const [loadingAvgCharts, setLoadingAvgCharts] = useState(true);

    useEffect(() => {
        axios.get(countChartURL + countChartSex)
        .then((response) => {
            console.log(response);
            setCountCharts(response.data);
            setLoadingCountCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingCountCharts(false);
        });

        // axios.get(`http://localhost:8000/intakes/avg/monthly`)
        // .then((response) => {
        //     console.log(response);
        //     setAvgCharts(response.data);
        //     setLoadingAvgCharts(false);
        // })
        // .catch((error) => {
        //     console.error("Error retrieving charts:", error);
        //     setLoadingAvgCharts(false);
        // });

    }, [countChartSex, countChartURL])

    const handleCountIntervalChange = (interval) => {
        setCountInterval(interval)

        if (interval == "Daily") {
            setCountChartURL(`http://localhost:8000/intakes/count/daily/`)
        } else if (interval === "Weekly") {
            setCountChartURL(`http://127.0.0.1:8000/intakes/count/weekly/`)
        } else if (interval === "Monthly") {
            setCountChartURL(`http://127.0.0.1:8000/intakes/count/monthly/`)
        }

        axios.get(countChartURL+countChartSex)
        .then((response) => {
            setCountCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleCountSexChange = (sex) => {
        setCountSex(sex)

        if (sex == "All") {
            setCountChartSex("")
        } else if (sex == "Male") {
            setCountChartSex("?sex=m")
        } else if (sex == "Female") {
            setCountChartSex("?sex=f")
        }
        axios.get(countChartURL+countChartSex)
        .then((response) => {
            setCountCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleAvgSexChange = (sex) => {
        setAvgSex(sex)

        let AvgAPIURL = `http://127.0.0.1:8000/intakes/avg/monthly`;
        if (sex == "All") {
            AvgAPIURL += ""
        } else if (sex == "Male") {
            AvgAPIURL += "?sex=m"
        } else if (sex == "Female") {
            AvgAPIURL += "?sex=f"
        }
        axios.get(AvgAPIURL)
        .then((response) => {
            setAvgCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });

        axios.get(AvgAPIURL)
        .then((response) => {
            setAvgCharts(response.data);
            console.log("resize");
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });     
    }

    return(
        <>
        <Container fluid>
        <Row>
            <Col lg={2}>
                <Sidebar />
            </Col>
            <Col xl={10}>
                <h2>Intake Charts</h2>
                <Row>
                    <h3>Intake Counts</h3>
                    <Row fluid>
                        <Col sm="auto">
                            <IntervalDropdown
                            options={countIntervalOptions}
                            selectedInterval={countInterval}
                            onIntervalChange={handleCountIntervalChange}
                            />
                        </Col>
                        <Col>
                            <SexDropdown
                            selectedSex={countSex}
                            onSexChange={handleCountSexChange}
                            />
                        </Col>
                    </Row>
                    
                    
                    { loadingCountCharts ? (
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                    ) :(
                    <Container fluid>
                        <Row>
                            <Col xxl={3} xl={5} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.dailycalplot.data} 
                                    layout = {countCharts.dailycalplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>  
                            </Col>
                            <Col xxl={3} xl={5} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.waterplot.data} 
                                    layout = {countCharts.waterplot.layout} 
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card> 
                            </Col>
                        {/* </Row>
                        <Row> */}  
                            <Col xxl={3} xl={5}  style={{ marginBottom: "20px" }}>
                            <Card>
                                <Plot 
                                    data = {countCharts.sleepplot.data} 
                                    layout = {countCharts.sleepplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card> 
                            </Col>
                            <Col xxl={3} xl={5} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {countCharts.stepsplot.data} 
                                    layout = {countCharts.stepsplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>   
                            </Col>
                        </Row>
                    </Container>
                    )}
                </Row>
                <Row>
                    
                </Row>
                {/* <Row>
                    <h3>Monthly Intake Averages</h3>
                        <SexDropdown
                            selectedSex={avgSex}
                            onSexChange={handleAvgSexChange}
                        />
                    { loadingAvgCharts ? (
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#9FC856" }}
                    />
                    ) :(
                    <Container fluid>
                        <Row>
                            <Col xxl={5} lg={10} md={12} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.dailycalplot.data} 
                                    layout = {avgCharts.dailycalplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xxl={5} lg={10} md={12} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.waterplot.data} 
                                    layout = {avgCharts.waterplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xxl={5} lg={10} md={12} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.stepsplot.data} 
                                    layout = {avgCharts.stepsplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                            <Col xxl={5} lg={10} md={12} style={{ marginBottom: "20px" }}>
                                <Card>
                                <Plot 
                                    data = {avgCharts.sleepplot.data} 
                                    layout = {avgCharts.sleepplot.layout}
                                    //config = {chartconfig} 
                                    //useResizeHandler = {true} 
                                    style = {chartstyle}
                                />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    )}
                </Row> */}
            </Col>
        </Row>   
        </Container>
        </>
    )   
}

export default IntakeChartsPage