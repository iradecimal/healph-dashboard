import { useState, useEffect, useCallback} from "react";
import { Table, Spinner, Form, Tooltip, Container, OverlayTrigger, Row, Col} from "react-bootstrap"
import Paginator from "./paginator";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MealTable = () => {
    //table variables
    const [mealTable, setMealTable] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    //filter variables
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null); 
    const [caloriesMinFilter, setCaloriesMinFilter] = useState(0);
    const [caloriesMaxFilter, setCaloriesMaxFilter] = useState(1200);
    const [fatsMinFilter, setFatsMinFilter] = useState(0);
    const [fatsMaxFilter, setFatsMaxFilter] = useState(80);
    const [carbsMinFilter, setCarbsMinFilter] = useState(0);
    const [carbsMaxFilter, setCarbsMaxFilter] = useState(100);
    const [proteinMinFilter, setProteinMinFilter] = useState(0);
    const [proteinMaxFilter, setProteinMaxFilter] = useState(80);
    const [foodWasteMinFilter, setFoodWasteMinFilter] = useState(0);
    const [foodWasteMaxFilter, setFoodWasteMaxFilter] = useState(100);

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
                filterArray.push(`$lte=${endDateFilter}`);
            } else if (startDateFilter) {
                filterArray.push(`$gte=${startDateFilter}`);
            } else if (endDateFilter) {
                filterArray.push(`$lte=${endDateFilter}`);
            }
            filters.push(`datetime=${filterArray.join(';')}`);
        }
        //cal
        if (caloriesMinFilter || caloriesMaxFilter) {
            const filterArray = [];
            if (caloriesMinFilter && caloriesMaxFilter) {
                filterArray.push(`$gte=${caloriesMinFilter}`);
                filterArray.push(`$lte=${caloriesMaxFilter}`);
            } else if (caloriesMinFilter) {
                filterArray.push(`$gte=${caloriesMinFilter}`);
            } else if (caloriesMaxFilter) {
                filterArray.push(`$lte=${caloriesMaxFilter}`);
            }
            filters.push(`cal=${filterArray.join(';')}`);
        }
        //fats
        if (fatsMinFilter || fatsMaxFilter) {
            const filterArray = [];
            if (fatsMinFilter && fatsMaxFilter) {
                filterArray.push(`$gte=${fatsMaxFilter}`);
                filterArray.push(`$lte=${endDateFilter}`);
            } else if (fatsMinFilter) {
                filterArray.push(`$gte=${fatsMinFilter}`);
            } else if (fatsMaxFilter) {
                filterArray.push(`$lte=${fatsMaxFilter}`);
            }
            filters.push(`fat=${filterArray.join(';')}`);
        }
        //carbs
        if (carbsMinFilter || carbsMaxFilter) {
            const filterArray = [];
            if (carbsMinFilter && carbsMaxFilter) {
                filterArray.push(`$gte=${carbsMinFilter}`);
                filterArray.push(`$lte=${carbsMaxFilter}`);
            } else if (carbsMinFilter) {
                filterArray.push(`$gte=${carbsMinFilter}`);
            } else if (carbsMaxFilter) {
                filterArray.push(`$lte=${carbsMaxFilter}`);
            }
            filters.push(`carbs=${filterArray.join(';')}`);
        }
        //proteins
        if (proteinMinFilter || proteinMaxFilter) {
            const filterArray = [];
            if (proteinMinFilter && proteinMaxFilter) {
                filterArray.push(`$gte=${proteinMinFilter}`);
                filterArray.push(`$lte=${proteinMaxFilter}`);
            } else if (proteinMinFilter) {
                filterArray.push(`$gte=${proteinMinFilter}`);
            } else if (proteinMaxFilter) {
                filterArray.push(`$lte=${proteinMaxFilter}`);
            }
            filters.push(`proteins=${filterArray.join(';')}`);
        }
        //waste
        if (foodWasteMinFilter || foodWasteMaxFilter) {
            const filterArray = [];
            if (foodWasteMinFilter && foodWasteMaxFilter) {
                filterArray.push(`$gte=${foodWasteMinFilter}`);
                filterArray.push(`$lte=${foodWasteMaxFilter}`);
            } else if (foodWasteMinFilter) {
                filterArray.push(`$gte=${foodWasteMinFilter}`);
            } else if (foodWasteMaxFilter) {
                filterArray.push(`$lte=${foodWasteMaxFilter}`);
            }
            filters.push(`waste=${filterArray.join(';')}`);
        }

        const filtersParam = filters.length > 0 ? filters.join("&") : "";

        const queryParams = [sortParam, filtersParam].filter(Boolean).join("&");
        console.log(`http://127.0.0.1:8000/find/meals/?skip=${page}&limit=${limit}${queryParams}`);
    
        setLoadingTable(true);
    
        axios
        .get(
           `http://127.0.0.1:8000/find/meals/?skip=${page}&limit=${limit}${queryParams}`
        )
        .then((response) => {
            console.log(response.data);
            setMealTable(response.data);
            setLoadingTable(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoadingTable(false);
        });
    }, [caloriesMaxFilter, caloriesMinFilter, carbsMaxFilter, carbsMinFilter, endDateFilter, fatsMaxFilter, fatsMinFilter, foodWasteMaxFilter, foodWasteMinFilter, proteinMaxFilter, proteinMinFilter, sortDirection, sortField, startDateFilter]);

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
                            onChange={(date) => setStartDateFilter(date.toISOString())}
                            selectsStart
                            startDate={startDateFilter}
                            endDate={endDateFilter}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Start Date"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <DatePicker
                            selected={endDateFilter}
                            onChange={(date) => setEndDateFilter(date.toISOString())}
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
                        <Form.Group controlId="form.Cal">
                            <Form.Label value={[0,1200]}>Calories</Form.Label>
                            <p>Minimum: {caloriesMinFilter} Maximum: {caloriesMaxFilter}</p>
                            <Form.Range
                                value={caloriesMinFilter}
                                min={0}
                                max={1200}
                                step={10}
                                onChange={(e) => { setCaloriesMinFilter(e.target.value) }}
                            />
                            <Form.Range
                                value={caloriesMaxFilter}
                                min={0}
                                max={1200}
                                step={10}
                                onChange={(e) => { setCaloriesMaxFilter(e.target.value) }}
                            />
                        </Form.Group>
                        </Col>
                        <Col> 
                        <Form.Group controlId="form.Fat">
                            <Form.Label value={[0,80]}>Fats</Form.Label>
                            <p>Minimum: {fatsMinFilter} Maximum: {fatsMaxFilter}</p>
                            <Form.Range
                                value={fatsMinFilter}
                                min={0}
                                max={80}
                                onChange={(e) => { setFatsMinFilter(e.target.value) }}
                            />
                            <Form.Range
                                value={fatsMaxFilter}
                                min={0}
                                max={80}
                                onChange={(e) => { setFatsMaxFilter(e.target.value) }}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group controlId="form.Carb">
                            <Form.Label value={[0,100]}>Carbohydrates</Form.Label>
                            <p>Minimum: {carbsMinFilter} Maximum: {carbsMaxFilter}</p>
                            <Form.Range
                                value={carbsMinFilter}
                                min={0}
                                max={100}
                                onChange={(e) => { setCarbsMinFilter(e.target.value) }}
                            />
                            <Form.Range
                                value={carbsMaxFilter}
                                min={0}
                                max={100}
                                onChange={(e) => { setCarbsMaxFilter(e.target.value) }}
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="form.Protein">
                            <Form.Label value={[0,80]}>Proteins</Form.Label>
                            <p>Minimum: {proteinMinFilter} Maximum: {proteinMaxFilter}</p>
                            <Form.Range
                                value={proteinMinFilter}
                                min={0}
                                max={80}
                                step={1}
                                onChange={(e) => { setProteinMinFilter(e.target.value) }}
                            />
                            <Form.Range
                                value={proteinMaxFilter}
                                min={0}
                                max={80}
                                step={1}
                                onChange={(e) => { setProteinMaxFilter(e.target.value) }}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                        <Form.Group controlId="form.Waste">
                            <Form.Label value={[0,100]}>Waste</Form.Label>
                            <p>Minimum: {foodWasteMinFilter} Maximum: {foodWasteMaxFilter}</p>
                            <Form.Range
                                value={foodWasteMinFilter}
                                min={0}
                                max={100}
                                step={1}
                                onChange={(e) => { setFoodWasteMinFilter(e.target.value) }}
                            />
                            <Form.Range
                                value={foodWasteMaxFilter}
                                min={0}
                                max={100}
                                step={1}
                                onChange={(e) => { setFoodWasteMaxFilter(e.target.value) }}
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

                                <th onClick={(e) => handleSort("_id", e)}>Meal ID</th>
                                <th onClick={(e) => handleSort("date", e)}>Date</th>
                                <th onClick={(e) => handleSort("cal", e)}>Calories</th>
                                <th onClick={(e) => handleSort("fat", e)}>Fats</th>
                                <th onClick={(e) => handleSort("carbs", e)}>Carbohydrates</th>
                                <th onClick={(e) => handleSort("proteins", e)}>Proteins</th>
                                <th onClick={(e) => handleSort("waste", e)}>Food Waste</th>
                                <th onClick={(e) => handleSort("foodgroups", e)}>Food Groups</th>
                                <th onClick={(e) => handleSort("mealdesc", e)}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealTable.map((item, index) => (
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
                                            overlay={renderTooltip(`Date: ${item.datetime.$date}`)}
                                        >
                                        <div>{item.datetime.$date}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Calories: ${item.cal}`)}
                                        >
                                        <div>{item.cal}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Fats: ${item.fat}`)}
                                        >
                                        <div>{item.fat}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Calories: ${item.carbs}`)}
                                        >
                                        <div>{item.carbs}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Proteins: ${item.proteins}`)}
                                        >
                                        <div>{item.proteins}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Waste: ${item.waste}`)}
                                        >
                                        <div>{item.waste}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Food Groups: ${item.foodgroups.join(", ")}`)}
                                        >
                                        <div>{item.foodgroups.join(", ")}</div>
                                        </OverlayTrigger>                                        
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip(`Description: ${item.mealdesc}`)}
                                        >
                                        <div>{item.mealdesc}</div>
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
    );
}

export default MealTable