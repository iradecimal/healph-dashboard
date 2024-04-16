import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; //
import { useState, useRef, useMemo, useEffect } from 'react';
import axios from 'axios';
import "./tables.css"

//import "./index.css"
 
function IntakesTable() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {   headerName: 'User ID', 
            field: 'uid.$oid',
            sortable: false,
            width: 300
        },
        {   field: 'date',
            width: 250
        },
        {   headerName: 'Caloric Intake',
            valueFormatter: p => p.value + " kcal",
            field: 'dailycal',
        },
        {   headerName: 'Glasses of Water',
            field: 'waterglass',
        },
        {   headerName: 'Hours of Sleep',
            field: 'sleephrs',
        },
        {   headerName: 'Steps Taken',
            field: 'steps',
        },
        {   headerName: 'HALE',
            field: 'hale',
        },
        {   headerName: 'PHD',
            field: 'phd',
        }
    ]);

    const defaultColDef = useMemo( ()=> ({
        width: 180,
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ['apply', 'clear']
        },
        floatingFilter: true,
    }), []);   

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/find/get-intakes/`)
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
        
            <div className="ag-theme-quartz" style={{height: '90vh', width: '100%'}}>
                <AgGridReact
                defaultColDef={defaultColDef}
                rowData={rowData} 
                columnDefs={columnDefs}
                animateRows={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10,20,50,100]} 
                alwaysShowHorizontalScroll={true}
                alwaysVerticalScroll={true}
                />
            </div>
        
        </>
    );
}
    
export default IntakesTable;