import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Plot from 'react-plotly.js';


function FetchChart() {
    const [data, SetData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/meals/foodgroups/daily')
        .then(res => (
            console.log(res.data),
            console.log(res.data.data),
            SetData(res.data)
        ))
        .catch(err => console.log(err))
    }, [])
    return(
        <Plot data = {data.data} layout = {data.layout}/>
    )
}

export default FetchChart