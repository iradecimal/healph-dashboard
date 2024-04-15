import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css"; //
import { useState, useRef, useMemo, useEffect } from 'react';
import axios from 'axios';

//import "./index.css"
 
function IntakesTable() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {   headerName: 'User ID', 
            field: 'uid.$oid',
            sortable: false},
        {   field: 'date',},
        {   headerName: 'Caloric Intake',
            field: 'dailycal',
            flex: 2},
        {   headerName: 'Glasses of Water',
            field: 'waterglass',
            flex: 2},
        {   headerName: 'Hours of Sleep',
            field: 'sleephrs',
            flex: 2},
        {   headerName: 'Steps Taken',
            field: 'steps',
            flex: 2},
        {   headerName: 'HALE',
            field: 'hale',
            flex: 1},
        {   headerName: 'PHD',
            field: 'phd',
            flex: 1}
    ]);

    const defaultColDef = useMemo( ()=> ({
        width: 150,
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ['apply', 'clear']
        },
        
        floatingFilter: true,
        flex: 3,
    }), []);   

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

    return (
        <>
        
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
        
        </>
    );
}
    
export default IntakesTable;