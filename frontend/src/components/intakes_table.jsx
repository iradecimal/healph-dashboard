import { useState, useRef, useMemo, useEffect, useCallback, } from 'react';
import axios from 'axios';
import {Row, Col, Button } from "react-bootstrap";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

import "./tables.css"

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
        axios.get(`${import.meta.env.VITE_BACKEND}/find/get-intakes/`)
        .then((response) => {
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
                <Button variant="success" size="md" onClick={onBtnExport}
                style={{fontWeight: "600", fontSize:"16px"}}>
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
                alwaysShowHorizontalScroll={true}
                alwaysVerticalScroll={true}
                />
            </div>
            </Row>
            
        
        </>
    );
}
    
export default IntakesTable;