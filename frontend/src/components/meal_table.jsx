import { useState, useRef, useMemo, useEffect, useCallback, } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Row, Col, Button } from "react-bootstrap";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

import "./tables.css"

const MealTable = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {   headerName: 'User ID', 
            field: 'uid.$oid',
            sortable: false,
            width: 275
        },
        {   headerName: 'Date',
            field: 'datetime',
            valueGetter: p => { return p.data.datetime.$date },
            valueFormatter: p => { moment(p.data.datetime.$date).format('MM/DD/YYYY HH:mm') },
            filter: 'agDateColumnFilter',
            width: 275
        },
        {   headerName: 'Calories',
            valueFormatter: p => p.value + " kcal",
            field: 'cal',
        },
        {   headerName: 'Fats',
            valueFormatter: p => p.value + " g",
            field: 'fat',
        },
        {   headerName: 'Carbohydrates',
            valueFormatter: p => p.value + " g",
            field: 'carbs',
        },
        {   headerName: 'Proteins',
            valueFormatter: p => p.value + " g",
            field: 'proteins',
        },
        {   headerName: 'Waste',
            valueFormatter: p => p.value + " g",
            field: 'waste',
        },
        {   headerName: 'Food Groups',
            field: 'foodgroups',
            tooltipField: 'foodgroups',
            width: 300
        },
        {   headerName: 'Meal Description',
            field: 'mealdesc',
            tooltipField: 'mealdesc',
            width: 300
        }
    ]);


    const defaultColDef = useMemo( ()=> ({
        width: 135,
        sortable: true,
        filter: true,
        filterParams: {
            buttons: ['apply', 'clear']
        },
        
        floatingFilter: true,
    }), []);   

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/find/get-meals/`)
        .then((response) => {
            console.log(response.data);
            setRowData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [])

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);

    return (
        <>
            <Row>
            <Col lg={3} md={6}>
                <Button variant="success" size="sm" onClick={onBtnExport}>
                    Download CSV export file
                </Button >
            </Col>
            </Row>
            <Row>
            <div className="ag-theme-quartz" style={{height: '90vh', width: '100%'}}>
                <AgGridReact
                ref={gridRef}
                defaultColDef={defaultColDef}
                rowData={rowData} 
                columnDefs={columnDefs}
                animateRows={true}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[10,20,50,100]} 
                />
            </div>
            </Row>
        </>
    );
}
    

export default MealTable