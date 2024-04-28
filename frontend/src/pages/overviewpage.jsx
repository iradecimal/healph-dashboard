//import LandingPageComponents from "../components/landingpagecomponents";
import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Sidebar from "../components/sidebar.jsx";
import StatsCard from "../components/statscard.jsx";
import IntervalDropdown from "../components/intervaldropdown.jsx";
import HamburgerMenu from "../components/hamburgermenu.jsx";

import { FaTrash, FaMoon, FaUserCircle, FaHamburger, FaCircleNotch } from "react-icons/fa";
import { RiFootprintFill, RiStarFill } from "react-icons/ri";
//import { GrStatusCriticalSmall } from "react-icons/gr";
import { FaBolt, FaGlassWater, FaBreadSlice, FaOilCan } from "react-icons/fa6";

import axios from "axios";
import ScoreCard from "../components/scorecard.jsx";
import UserStatsCard from "../components/userstatscard.jsx";

const OverviewPage = () => {
    const [overviewInterval, setOverviewInterval] = useState("Daily");
    const intervalOptions = ["Daily", "Weekly", "Monthly"];
    //const [userStats, setUserStats] = useState([]);
    const [intakeStats, setIntakeStats] = useState([]);
    const [mealStats, setMealStats] = useState([]);
    const [userStats, setUserStats] = useState();
    //const [loadingUserStats, setLoadingUserStats] = useState(true);
    const [loadingIntakeStats, setLoadingIntakeStats] = useState(true);
    const [loadingMealStats, setLoadingMealStats] = useState(true);
    const [loadingUserStats, setLoadingUserStats] = useState(true);

    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/avgstats/daily/meals`)
        .then((response) => {
            console.log(response.data)
            setMealStats(response.data);
            setLoadingMealStats(false);
        })
        .catch((error) => {
            console.error("Error retrieving meal data:", error);
            setLoadingMealStats(false);
        });
        axios.get(`${import.meta.env.VITE_BACKEND}/avgstats/daily/intake`)
        .then((response) => {
            setIntakeStats(response.data);
            setLoadingIntakeStats(false);
        })
        .catch((error) => {
            console.error("Error retrieving intake data:", error);
            setLoadingIntakeStats(false);
        });
        axios.get(`${import.meta.env.VITE_BACKEND}/avgstats/activity`)
        .then((response) => {
            setUserStats(response.data);
            setLoadingUserStats(false);
        })
        .catch((error) => {
            console.error("Error retrieving intake data:", error);
            setLoadingIntakeStats(false);
        });
    }, []);

    const handleOverviewIntervalChange = (interval) => {
        setOverviewInterval(interval);

        let intakeAPIURL, mealAPIURL;
        if (interval == "Daily") {
            intakeAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/daily/intake`
            mealAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/daily/meals`
        } else if (interval === "Weekly") {
            intakeAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/weekly/intake`
            mealAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/weekly/meals`
        } else if (interval === "Monthly") {
            intakeAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/monthly/intake`
            mealAPIURL = `${import.meta.env.VITE_BACKEND}/avgstats/monthly/meals`
        }

        axios.get(mealAPIURL)
        .then((response) => {
            setMealStats(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving meal data:", error);
        });

        axios.get(intakeAPIURL)
        .then((response) => {
            setIntakeStats(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving intake data:", error);
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
        <div>
            <h2>Overview</h2>
            <IntervalDropdown
                options={intervalOptions}
                selectedInterval={overviewInterval}
                onIntervalChange={handleOverviewIntervalChange}
            />
            <Row>
                {/* Daily Intake Stats*/}

                    <h4>Daily Intake Stats</h4>
                    { loadingIntakeStats ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#9FC856" }}
                        />
                    ) : (
                        <Container>
                        <Row>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <StatsCard 
                                    icon={<FaBolt />}
                                    label="Avg. Calories"
                                    value={intakeStats.avg.dailycal}
                                    percentage={intakeStats.adequacy.dailycal}
                                />
                            </Col>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <StatsCard 
                                    icon={<FaGlassWater />}
                                    label="Avg. Glasses of Water"
                                    value={intakeStats.avg.waterglass}
                                    percentage={intakeStats.adequacy.waterglass}
                                />
                            </Col>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <StatsCard 
                                    icon={<RiFootprintFill />}
                                    label="Avg. Steps Taken"
                                    value={intakeStats.avg.steps}
                                    percentage={intakeStats.adequacy.steps}
                                />
                            </Col>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <StatsCard 
                                    icon={<FaMoon/>}
                                    label="Avg. Hours of Sleep"
                                    value={intakeStats.avg.sleephrs}
                                    percentage={intakeStats.adequacy.sleephrs}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <ScoreCard 
                                    icon={<FaCircleNotch />}
                                    label="Avg. HALE"
                                    value={intakeStats.avg.hale}
                                />
                            </Col>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <ScoreCard 
                                    icon={<RiStarFill/>}
                                    label="Avg. PHD"
                                    value={intakeStats.avg.phd}
                                />
                            </Col>
                        </Row>
                        </Container>
                    )}
            </Row>
            <Row>
                {/* Meal Stats*/}

                    <h4>Meal Stats</h4>
                    { loadingMealStats ? (
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#9FC856" }}
                        />
                    ) : (
                    <Container>
                    <Row>
                        <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                            <StatsCard 
                                icon={<FaBreadSlice/>}
                                label="Avg. Carbohydrate Intake"
                                value={mealStats.avg.carbs}
                                percentage={mealStats.adequacy.carbs}
                            />
                        </Col>
                        <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                            <StatsCard 
                                icon={<FaHamburger/>}
                                label="Avg. Protein Intake"
                                value={mealStats.avg.proteins}
                                percentage={mealStats.adequacy.proteins}
                            />
                        </Col>
                        <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                            <StatsCard 
                                icon={<FaOilCan/>}
                                label="Avg. Fat Intake"
                                value={mealStats.avg.fat}
                                percentage={mealStats.adequacy.fat}                            
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                            <StatsCard 
                                icon={<FaBolt/>}
                                label="Avg. Calories"
                                value={mealStats.avg.cal}
                                percentage={mealStats.adequacy.cal}                            
                            />
                        </Col>
                        <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                            <StatsCard 
                                icon={<FaTrash/>}
                                label="Avg. Food Waste"
                                value={mealStats.avg.waste}
                                percentage={mealStats.adequacy.waste}                            
                            />
                        </Col>
                    </Row>
                    </Container>
                    )}
                    <h4>User Stats</h4>
                    { loadingUserStats ? (
                            <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#9FC856" }}
                            />
                        ) : (
                        <Container>
                            <Row>
                            <Col xl={2} lg={4} md={6} style={{ marginBottom: "20px" }}>
                                <UserStatsCard 
                                    label={"Current Users"}
                                    value={userStats}                           
                                />
                            </Col>
                            </Row>
                        </Container>
                        )} 
            </Row>
        </div> 
        </Col>
    </Row>
    </Container>
    </>
    );
}

export default OverviewPage;