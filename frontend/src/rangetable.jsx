import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css"; //
import { useState, useRef, useMemo, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from './components/sidebar';
import axios from 'axios';

//import "./index.css"
 
function GridTest() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {   headerName: 'User ID', 
            field: 'uid.$oid',
            sortable: false},
        {   field: 'date',},
        {   headerName: 'Caloric Intake',
            field: 'dailycal'},
        {   headerName: 'Glasses of Water',
            field: 'waterglass'},
        {   headerName: 'Hours of Sleep',
            field: 'sleephrs'},
        {   headerName: 'Steps Taken',
            field: 'steps'},
        {   headerName: 'HALE',
            field: 'hale'},
        {   headerName: 'PHD',
            field: 'phd'}
    ]);

    const defaultColDef = useMemo( ()=> ({
        width: 150,
        sortable: true,
        filter: true,
        floatingFilter: true,
    }));   

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/find/intakes/`)
        .then((response) => {
            console.log(response.data);
            setRowData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [])

    // return (
    // <>
    //     <div className="ag-theme-alpine" style={{height: '100%', width: 500}}>
    //     <AgGridReact
    //       defaultColDef={defaultColDef}
    //       rowData={rowData} 
    //       columnDefs={columnDefs}
    //       animateRows={true} 
    //       />
    //     </div>
    // </>
    return (
        <>
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col fluid>
                    <h2>Intake Data</h2>
                    <Row fluid>
                    <div className="ag-theme-alpine" style={{height: '90vh', width: '100%'}}>
                        <AgGridReact
                        defaultColDef={defaultColDef}
                        rowData={rowData} 
                        columnDefs={columnDefs}
                        animateRows={true}
                        pagination={true}
                        paginationPageSize={10}
                        paginationPageSizeSelector={[10,20,50,100]} 
                        />
                    </div>
                    </Row>
                    {/* <IntakesTable/> */}
                </Col>
            </Row>
        </Container>
        
        </>
    );

    // const [rowData, setRowData] = useState([
    //     {make: "Toyota", model: "Celica", price: 35000},
    //     {make: "Ford", model: "Mondeo", price: 32000},
    //     {make: "Porsche", model: "Boxter", price: 72000}
    // ]);
    
    // const [columnDefs, setColDefs] = useState([
    //     { field: 'make' },
    //     { field: 'model' },
    //     { field: 'price' }
    // ]);
 
    // return (
    //     <div className="ag-theme-quartz" style={{height: 500, width: 500}}>
    //         <AgGridReact
    //             rowData={rowData}
    //             columnDefs={columnDefs}
    //         />
    //     </div>
    // );
}
    
export default GridTest;
