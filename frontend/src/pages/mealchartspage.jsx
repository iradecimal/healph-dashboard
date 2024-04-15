import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner, Card} from "react-bootstrap";
import Plot from "react-plotly.js";
import Sidebar from "../components/sidebar.jsx";
import IntervalDropdown from "../components/intervaldropdown.jsx";
import SexDropdown from "../components/sexdropdown.jsx";
import "./chartcard.css"

import axios from "axios";

const MealChartsPage = () => {
    //var chartconfig = {responsive: true}
    var chartstyle = {width: "90%", height: "80%"}
    const [foodgroupInterval, setFoodGroupInterval] = useState("Daily");
    const foodgroupIntervalOptions = ["Daily", "Weekly", "Monthly"];
    const [foodgroupSex, setFoodGroupSex] = useState("All");
    const [countInterval, setCountInterval] = useState("Daily");
    const countIntervalOptions = ["Daily", "Weekly", "Monthly"];
    const [countSex, setCountSex] = useState("All");
    const [avgInterval, setAvgInterval] = useState("Weekly");
    const avgIntervalOptions = ["Weekly", "Monthly"];
    const [foodChartURL, setFoodChartURL] = useState(`http://localhost:8000/meals/foodgroups/daily/`)
    const [foodChartSex, setFoodChartSex] = useState('');
    const [foodgroupCharts, setFoodGroupCharts] = useState([]);
    const [loadingFoodGroupCharts, setLoadingFoodGroupCharts] = useState(true);
    const [countChartURL, setCountChartURL] = useState(`http://localhost:8000/meals/count/daily/`)
    const [countChartSex, setCountChartSex] = useState('')
    const [countCharts, setCountCharts] = useState([]);
    const [loadingCountCharts, setLoadingCountCharts] = useState(true);
    const [avgCharts, setAvgCharts] = useState([]);
    const [loadingAvgCharts, setLoadingAvgCharts] = useState(true);

    useEffect( () => {
        axios.get(foodChartURL + foodChartSex)
        .then((response) => {
            setFoodGroupCharts(response.data);
            setLoadingFoodGroupCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            setLoadingFoodGroupCharts(false);
        });
    }, [foodChartSex, foodChartURL])

    useEffect( () => {
        axios.get(countChartURL + countChartSex)
        .then((response) => {
            setCountCharts(response.data);
            setLoadingCountCharts(false);
        })
        .catch((error) => {
            console.error("Error retrieving charts:", error);
            //setLoadingCountCharts(false);
        });
    }, [countChartSex, countChartURL])

    // useEffect( () => { 
    //     axios.get(`http://localhost:8000/meals/avg/weekly`)
    //     .then((response) => {
    //         setAvgCharts(response.data);
    //         setLoadingAvgCharts(false);
    //     })
    //     .catch((error) => {
    //         console.error("Error retrieving charts:", error);
    //         setLoadingAvgCharts(false);
    //     });
    // }, [])
    
    const handleFoodGroupIntervalChange = async (interval) => {
        setFoodGroupInterval(interval)
        console.log('1')
        if (interval == "Daily") {
           setFoodChartURL(`http://127.0.0.1:8000/meals/foodgroups/daily/`)
        } else if (interval === "Weekly") {
            setFoodChartURL(`http://127.0.0.1:8000/meals/foodgroups/weekly/`)
        } else if (interval === "Monthly") {
            setFoodChartURL(`http://127.0.0.1:8000/meals/foodgroups/monthly/`)
        }
        axios.get(foodChartURL + foodChartSex)
        .then( (response) => {
            setFoodGroupCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleFoodGroupSexChange = async (sex) => {
        setFoodGroupSex(sex)

        if (sex == "All") {
            setFoodChartSex("")
        } else if (sex == "Male") {
            setFoodChartSex("?sex=m")
        } else if (sex == "Female") {
            setFoodChartSex("?sex=f")
        }
        axios.get(foodChartURL + foodChartSex)
        .then( (response) => {
            setFoodGroupCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleCountIntervalChange = async (interval) => {
        setCountInterval(interval)

        if (interval == "Daily") {
            setCountChartURL(`http://127.0.0.1:8000/meals/count/daily/`)
        } else if (interval === "Weekly") {
            setCountChartURL(`http://127.0.0.1:8000/meals/count/weekly/`)
        } else if (interval === "Monthly") {
            setCountChartURL(`http://127.0.0.1:8000/meals/count/monthly/`)
        }

        axios.get(countChartURL + countChartSex)
        .then((response) => {
            setCountCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleCountSexChange = async (sex) => {
        setCountSex(sex)

        if (sex == "All") {
            setCountChartSex("")
        } else if (sex == "Male") {
            setCountChartSex("?sex=m")
        } else if (sex == "Female") {
            setCountChartSex("?sex=f")
        }
        axios.get(countChartURL + countChartSex)
        .then((response) => {
            setCountCharts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    const handleAvgIntervalChange = (interval) => {
        setAvgInterval(interval)

        let AvgAPIURL;
        if (interval == "Weekly") {
            AvgAPIURL = `http://127.0.0.1:8000/meals/avg/weekly`
        } else if (interval === "Monthly") {
            AvgAPIURL = `http://127.0.0.1:8000/meals/avg/monthly`
        }

        axios.get(AvgAPIURL)
        .then((response) => {
            setAvgCharts(response.data);
            
        })
        .catch((error) => {
            console.error("Error retrieving chart data:", error);
        });
    }

    return(
        <>
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <h2>Meal Charts</h2>
                    <Row>
                    <h3>Food Group Counts</h3>
                        <Col sm="auto">
                            <IntervalDropdown
                            options={foodgroupIntervalOptions}
                            selectedInterval={foodgroupInterval}
                            onIntervalChange={handleFoodGroupIntervalChange}
                            />
                        </Col>
                        <Col>
                            <SexDropdown
                            selectedSex={foodgroupSex}
                            onSexChange={handleFoodGroupSexChange}
                            />
                        </Col>
                        { loadingFoodGroupCharts ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#9FC856" }}
                        />
                        ) :( 
                            <Container>
                                <Row>
                                    <Col xxl={6} xl={8} style={{ marginBottom: "20px" }}>
                                        <Card>
                                        <Plot 
                                            data = {foodgroupCharts.barplot.data} 
                                            layout = {foodgroupCharts.barplot.layout}
                                            style = {chartstyle}
                                        />
                                        </Card>
                                    </Col>
                                    <Col xxl={6} xl={8} style={{ marginBottom: "20px" }}>
                                        <Card>
                                        <Plot 
                                            data = {foodgroupCharts.pieplot.data} 
                                            layout = {foodgroupCharts.pieplot.layout}
                                            style = {chartstyle}
                                        />
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        )}
                    </Row>
                    <Row>
                        <h3>Meal Counts</h3>
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
                        { loadingCountCharts ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#9FC856" }}
                        />
                        ) :(
                        <Container>
                            <Row>
                                <Col xxl={4} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {countCharts.fatplot.data} 
                                        layout = {countCharts.fatplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xxl={4} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {countCharts.carbsplot.data} 
                                        layout = {countCharts.carbsplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xxl={4} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {countCharts.proteinsplot.data} 
                                        layout = {countCharts.proteinsplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xxl={6} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {countCharts.calplot.data} 
                                        layout = {countCharts.calplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xxl={6} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {countCharts.wasteplot.data} 
                                        layout = {countCharts.wasteplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}
                                    />
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        )}
                    </Row>
                    {/* <Row>
                    <h3>Meal Averages</h3>
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
                                <Col xl={5} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {avgCharts.fatplot.data} 
                                        layout = {avgCharts.fatplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xl={5} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {avgCharts.carbsplot.data} 
                                        layout = {avgCharts.carbsplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xl={5} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {avgCharts.proteinsplot.data} 
                                        layout = {avgCharts.proteinsplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={5} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {avgCharts.calplot.data} 
                                        layout = {avgCharts.calplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
                                        style = {chartstyle}

                                    />
                                    </Card>
                                </Col>
                                <Col xl={5} lg={6} style={{ marginBottom: "20px" }}>
                                    <Card>
                                    <Plot 
                                        data = {avgCharts.wasteplot.data} 
                                        layout = {avgCharts.wasteplot.layout}
                                        //config = {chartconfig} useResizeHandler = {true} 
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

export default MealChartsPage