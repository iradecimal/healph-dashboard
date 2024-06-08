//import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const ScoreCard = ({
    icon, 
    label, 
    value,
    valuelabel
}) => (
    <Card
    style={{
      marginBottom: "10px",
      height: "100%",
      borderColor: "#9FC856",
    }}
    >
        <Card.Header
                style={{
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    color: "#9FC856",
                }}
              >
                {icon} 
                <span style={{ marginLeft: "10px", color: " #757575", fontWeight: "bold"  }}>
                    {label}
                </span>
        </Card.Header>
        <Card.Body>    
        <Card.Text style={{fontWeight: "600", fontSize:"18px"}}>
                {Math.round(value * 100)/100} {valuelabel}
            </Card.Text>
        </Card.Body>
    </Card>
);

ScoreCard.propTypes = {
    icon : PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.number,
    valuelabel: PropTypes.string
}

export default ScoreCard;