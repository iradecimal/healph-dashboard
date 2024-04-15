//import React from "react";
import Card from "react-bootstrap";
import  BsFillPersonFill  from "react-icons/bs";
import PropTypes from "prop-types";

const StatsCard = ({label, value}) => (
    <Card>
        <Card.Body>
            <Card.Title>
            <BsFillPersonFill />{label}
            </Card.Title>
            <Card.Text>
                {value}
            </Card.Text>
        </Card.Body>
        
    </Card>
)

StatsCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number
}

export default StatsCard;