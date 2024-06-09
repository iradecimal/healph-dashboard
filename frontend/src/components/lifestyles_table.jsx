import { useState, useRef, useMemo, useEffect, useCallback, } from 'react';
import axios from 'axios';

import "./tables.css"

function LifeStyleTable() {
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
            
            </Row>
            
        
        </>
    );
}
    
export default LifeStyleTable;
