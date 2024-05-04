//import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const UserStatsCard = ({label, value}) => (
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
                <FaUserCircle size={25}/>
                <span style={{ marginLeft: "10px", color: " #757575", fontWeight: "bold" }}>
                    {label}
                </span>
        </Card.Header>
        <Card.Body>
            <Card.Text style={{fontWeight: "600", fontSize:"18px"}}>
                {value}
            </Card.Text>
        </Card.Body>
        
    </Card>
)

UserStatsCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number
}

export default UserStatsCard;