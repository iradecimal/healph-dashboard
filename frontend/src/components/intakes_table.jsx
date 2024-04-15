import { useState, useEffect, useCallback} from "react";
import { Table, Spinner, Form, Tooltip, Container, OverlayTrigger, Row, Col} from "react-bootstrap"
import Paginator from "./paginator";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const IntakesTable = () => {
    //table variables
    const [intakeTable, setIntakeTable] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    //filter variables
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    //const [uidFilter, setUidFilter] = useState("");
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [sleephrsMinFilter, setSleephrsMinFilter] = useState(0);
    const [sleephrsMaxFilter, setSleephrsMaxFilter] = useState(16);
    const [waterglassMinFilter, setWaterglassMinFilter] = useState(0);
    const [waterglassMaxFilter, setWaterglassMaxFilter] = useState(30);
    const [stepsMinFilter, setStepsMinFilter] = useState(0);
    const [stepsMaxFilter, setStepsMaxFilter] = useState(20000);
    const [dailycalMinFilter, setDailycalMinFilter] = useState(0);
    const [dailycalMaxFilter, setDailycalMaxFilter] = useState(8000);
    const [haleMinFilter, setHaleMinFilter] = useState(0);
    const [haleMaxFilter, setHaleMaxFilter] = useState(1);
    const [phdMinFilter, setPhdMinFilter] = useState(0);
    const [phdMaxFilter, setPhdMaxFilter] = useState(1);

    
    const fetchData = useCallback((page, limit) => {
        const filters = [""];
        const sortParam = sortField
        ? `sort=${sortDirection === 1 ? sortField : `-${sortField}`}`
        : "";

        //date
        if (startDateFilter || endDateFilter) {
            const filterArray = [];
            if (startDateFilter && endDateFilter) {
                filterArray.push(`$gte=${startDateFilter}`);
                filterArray.push(`$gte=${endDateFilter}`);
            } else if (startDateFilter) {
                filterArray.push(`$gte=${startDateFilter}`);
            } else if (endDateFilter) {
                filterArray.push(`$lte=${endDateFilter}`);
            }
            filters.push(`date=${filterArray.join(';')}`);
        }
        //sleep hours
        if (sleephrsMinFilter || sleephrsMaxFilter) {
            const filterArray = [];
            if (sleephrsMinFilter && sleephrsMaxFilter) {
                filterArray.push(`$gte=${sleephrsMinFilter}`);
                filterArray.push(`$lte=${sleephrsMaxFilter}`);
            } else if (sleephrsMinFilter) {
                filterArray.push(`$gte=${sleephrsMinFilter}`);
            } else if (sleephrsMaxFilter) {
                filterArray.push(`$lte=${sleephrsMaxFilter}`);
            }
            filters.push(`sleephrs=${filterArray.join(';')}`);
        }
        //water glass
        if (waterglassMinFilter || waterglassMaxFilter) {
            const filterArray = [];
            if (waterglassMinFilter && waterglassMaxFilter) {
                filterArray.push(`$gte=${waterglassMinFilter}`);
                filterArray.push(`$lte=${waterglassMaxFilter}`);
            } else if (waterglassMinFilter) {
                filterArray.push(`$gte=${waterglassMinFilter}`);
            } else if (waterglassMaxFilter) {
                filterArray.push(`$lte=${waterglassMaxFilter}`);
            }
            filters.push(`waterglass=${filterArray.join(';')}`);
        }
        //steps taken
        if (stepsMinFilter || stepsMaxFilter) {
            const filterArray = [];
            if (stepsMinFilter && stepsMaxFilter) {
                filterArray.push(`$gte=${stepsMinFilter}`);
                filterArray.push(`$lte=${stepsMaxFilter}`);
            } else if (stepsMinFilter) {
                filterArray.push(`$gte=${stepsMinFilter}`);
            } else if (stepsMaxFilter) {
                filterArray.push(`$lte=${stepsMaxFilter}`);
            }
            filters.push(`steps=${filterArray.join(';')}`);
        }
        //daily cal
        if (dailycalMinFilter || dailycalMaxFilter) {
            const filterArray = [];
            if (dailycalMinFilter && dailycalMaxFilter) {
                filterArray.push(`$gte=${dailycalMinFilter}`);
                filterArray.push(`$lte=${dailycalMaxFilter}`);
            } else if (dailycalMinFilter) {
                filterArray.push(`$gte=${dailycalMinFilter}`);
            } else if (dailycalMaxFilter) {
                filterArray.push(`$lte=${dailycalMaxFilter}`);
            }
            filters.push(`dailycal=${filterArray.join(';')}`);
        }
        //hale
        if (haleMinFilter || haleMaxFilter) {
            const filterArray = [];
            if (haleMinFilter && haleMaxFilter) {
                filterArray.push(`$gte=${haleMinFilter}`);
                filterArray.push(`$lte=${haleMaxFilter}`);
            } else if (haleMinFilter) {
                filterArray.push(`$gte=${haleMinFilter}`);
            } else if (haleMaxFilter) {
                filterArray.push(`$lte=${haleMaxFilter}`);
            }
            filters.push(`hale=${filterArray.join(';')}`);
        }
        //phd
        if (phdMinFilter || phdMaxFilter) {
            const filterArray = [];
            if (phdMinFilter && phdMaxFilter) {
                filterArray.push(`$gte=${phdMinFilter}`);
                filterArray.push(`$lte=${phdMaxFilter}`);
            } else if (phdMinFilter) {
                filterArray.push(`$gte=${phdMinFilter}`);
            } else if (phdMaxFilter) {
                filterArray.push(`$lte=${phdMaxFilter}`);
            }
            filters.push(`phd=${filterArray.join(';')}`);
        }

        const filtersParam = filters.length > 0 ? filters.join("&") : "";

        const queryParams = [sortParam, filtersParam].filter(Boolean).join("&");
        console.log(`http://127.0.0.1:8000/find/intakes/?skip=${page}&limit=${limit}${queryParams}`);
    

        setLoadingTable(true);

        axios
        .get(
           `http://127.0.0.1:8000/find/intakes/?skip=${page}&limit=${limit}${queryParams}`
        )
        .then((response) => {
            console.log(response.data);
            setIntakeTable(response.data);
            setLoadingTable(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoadingTable(false);
        });
    },[   
        dailycalMaxFilter, dailycalMinFilter, endDateFilter, haleMaxFilter, haleMinFilter, 
        phdMaxFilter, phdMinFilter, sleephrsMaxFilter, sleephrsMinFilter, sortDirection, sortField, 
        startDateFilter, stepsMaxFilter, stepsMinFilter, waterglassMaxFilter, waterglassMinFilter
    ]
    );

    const handleSleepHrsMin = (e) => { setSleephrsMinFilter(e.target.value)};
    const handleSleepHrsMax = (e) => { setSleephrsMaxFilter(e.target.value)};
    const handleWaterGlassMin = (e) => { setWaterglassMinFilter(e.target.value)};
    const handleWaterGlassMax = (e) => { setWaterglassMaxFilter(e.target.value)};
    const handleStepsMin = (e) => { setStepsMinFilter(e.target.value)};
    const handleStepsMax = (e) => { setStepsMaxFilter(e.target.value)};
    const handleDailyCalMin = (e) => { setDailycalMinFilter(e.target.value)};
    const handleDailyCalMax = (e) => { setDailycalMaxFilter(e.target.value)};
    const handleHaleMin = (e) => { setHaleMinFilter(e.target.value)};
    const handleHaleMax = (e) => { setHaleMaxFilter(e.target.value)};
    const handlePhdMin = (e) => { setPhdMinFilter(e.target.value)};
    const handlePhdMax = (e) => { setPhdMaxFilter(e.target.value)};

    useEffect(() => { 
        const limit = 20;
        const skip = 1;
        fetchData(skip, limit)
    }, [fetchData]);

    const handlePageChange = (newPage) => {
        const limit = 20;
        if (newPage >= 1 && newPage <= totalPages) {
          fetchData(newPage, limit);
        }
      };
    
    const handleSort = (field, e) => {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
        const limit = 20;
        if (field === sortField) {
        setSortDirection(sortDirection === 1 ? -1 : 1);
        } else {
        setSortDirection(1);
        }
        setSortField(field);
        fetchData(currentPage, limit);
    }
    };


    
    const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
                <Col>
                <Form>
                    <Form.Group controlId="form.Date">
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            selected={startDateFilter}
                            onChange={(date) => (setStartDateFilter(date.toISOString().slice(0,10)), console.log(date.toISOString().slice(0,10)))}
                            selectsStart
                            startDate={startDateFilter}
                            endDate={endDateFilter}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Start Date"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <DatePicker
                            selected={endDateFilter}
                            onChange={(date) => setEndDateFilter(date.toISOString().slice(0,10))}
                            selectsEnd
                            startDate={startDateFilter}
                            endDate={endDateFilter}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="End Date"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </Form.Group>
                </Form>
                </Col>
            </Row>
            <Row>
                <Form>
                    <Row>  
                        <Col> 
                        <Form.Group controlId="form.DailyCal">
                            <Form.Label value={[0,5000]}>Daily Calories</Form.Label>
                            <p>Minimum: {dailycalMinFilter} Maximum: {dailycalMaxFilter}</p>
                            <Form.Range
                                value={dailycalMinFilter}
                                min={0}
                                max={5000}
                                step={10}
                                onChange={handleDailyCalMin}
                            />
                            <Form.Range
                                value={dailycalMaxFilter}
                                min={0}
                                max={5000}
                                step={10}
                                onChange={handleDailyCalMax}
                            />
                        </Form.Group>
                        </Col>
                        <Col> 
                        <Form.Group controlId="form.SleepHours">
                            <Form.Label value={[0,20]}>Hours of Sleep</Form.Label>
                            <p>Minimum: {sleephrsMinFilter} Maximum: {sleephrsMaxFilter}</p>
                            <Form.Range
                                value={sleephrsMinFilter}
                                min={0}
                                max={20}
                                onChange={handleSleepHrsMin}
                            />
                            <Form.Range
                                value={sleephrsMaxFilter}
                                min={0}
                                max={20}
                                onChange={handleSleepHrsMax}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group controlId="form.WaterGlass">
                            <Form.Label value={[0,30]}>Glasses of Water</Form.Label>
                            <p>Minimum: {waterglassMinFilter} Maximum: {waterglassMaxFilter}</p>
                            <Form.Range
                                value={waterglassMinFilter}
                                min={0}
                                max={30}
                                onChange={handleWaterGlassMin}
                            />
                            <Form.Range
                                value={waterglassMaxFilter}
                                min={0}
                                max={30}
                                onChange={handleWaterGlassMax}
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="form.StepsTaken">
                            <Form.Label value={[0,20000]}>Steps Taken</Form.Label>
                            <p>Minimum: {stepsMinFilter} Maximum: {stepsMaxFilter}</p>
                            <Form.Range
                                value={stepsMinFilter}
                                min={0}
                                max={20000}
                                step={50}
                                onChange={handleStepsMin}
                            />
                            <Form.Range
                                value={stepsMaxFilter}
                                min={0}
                                max={20000}
                                step={50}
                                onChange={handleStepsMax}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                        <Form.Group controlId="form.HALE">
                            <Form.Label value={[0,1]}>HALE</Form.Label>
                            <p>Minimum: {haleMinFilter} Maximum: {haleMaxFilter}</p>
                            <Form.Range
                                value={haleMinFilter}
                                min={0}
                                max={1}
                                step={.01}
                                onChange={handleHaleMin}
                            />
                            <Form.Range
                                value={haleMaxFilter}
                                min={0}
                                max={1}
                                step={.01}
                                onChange={handleHaleMax}
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="form.PHD">
                            <Form.Label value={[0,1]}>PHD</Form.Label>
                            <p>Minimum: {phdMinFilter} Maximum: {phdMaxFilter}</p>
                            <Form.Range
                                value={phdMinFilter}
                                min={0}
                                max={1}
                                step={.01}
                                onChange={handlePhdMin}
                            />
                            <Form.Range
                                value={phdMaxFilter}
                                min={0}
                                max={1}
                                step={.01}
                                onChange={handlePhdMax}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
                {loadingTable ? (
                    <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#9FC856" }}
                  />
                ): (
                    <Table striped="columns" bordered = {true} hover = {true} responsive = {true}>
                        <thead>
                            <tr>
                                <th>Object ID</th>
                                <th onClick={(e) => handleSort("uid", e)}>User ID</th>
                                <th onClick={(e) => handleSort("date", e)}>Date</th>
                                <th onClick={(e) => handleSort("dailycal", e)}>Daily Calories</th>
                                <th onClick={(e) => handleSort("sleephrs", e)}>Sleep Hours</th>
                                <th onClick={(e) => handleSort("waterglass", e)}>Glasses of Water</th>
                                <th onClick={(e) => handleSort("steps", e)}>Steps</th>
                                <th onClick={(e) => handleSort("hale", e)}>HALE</th>
                                <th onClick={(e) => handleSort("phd", e)}>PHD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {intakeTable.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`ID: ${item._id.$oid}`)}
                                        >
                                        <div>{item._id.$oid}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.uid.$oid}`)}
                                        >
                                        <div>{item.uid.$oid}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.date}`)}
                                        >
                                        <div>{item.date}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.dailycal}`)}
                                        >
                                        <div>{item.dailycal}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.sleephrs}`)}
                                        >
                                        <div>{item.sleephrs}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.steps}`)}
                                        >
                                        <div>{item.steps}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.waterglass}`)}
                                        >
                                        <div>{item.waterglass}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.hale}`)}
                                        >
                                        <div>{item.hale}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`User ID: ${item.phd}`)}
                                        >
                                        <div>{item.phd}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Row>
        </Container>
        </>
    )
}

export default IntakesTable;