import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import StatsCard from './components/statscard.jsx';
import { FaCircleNotch } from "react-icons/fa";

function FetchData() {
    const [data, SetData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/avgstats/daily/intake')
        .then(res => (
            SetData(res.data[0])
        ))
        .catch(err => console.log(err))
    }, [])
    return(
        <>
        <StatsCard 
            icon = {<FaCircleNotch/>}
            label = "Test"
            value= {data.hale}
        />
        </>
    )
}

export default FetchData