import { useState, useEffect, useMemo, useRef} from "react";
import axios from "axios";
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


const MealTable = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {   headerName: 'User ID', 
            field: 'uid.$oid',
            sortable: false},
        {   headerName: 'Date',
            field: 'datetime',
            valueGetter: p => { return p.data.datetime.$date },
            valueFormatter: p => { moment(p.data.datetime.$date).format('MM/DD/YYYY HH:mm') },
            filter: 'agDateColumnFilter'},
        {   headerName: 'Calories',
            field: 'cal',
            flex: 2},
        {   headerName: 'Fats',
            field: 'fat',
            flex: 2},
        {   headerName: 'Carbohydrates',
            field: 'carbs',
            flex: 2},
        {   headerName: 'Proteins',
            field: 'proteins',
            flex: 2},
        {   headerName: 'Waste',
            field: 'waste',
            flex: 1},
        {   headerName: 'Food Groups',
            field: 'foodgroups',
            flex: 1},
        {   headerName: 'Meal Description',
        field: 'mealdesc',
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
        axios.get(`http://127.0.0.1:8000/find/meals/`)
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
    

export default MealTable