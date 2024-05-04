import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";


const SexDropdown = ({
    selectedSex,
    onSexChange
}) => {
    const options = [
        "All",
        "Male",
        "Female"
    ]
    return(
        <Dropdown className = "interval-picker" >
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{fontSize:"18px", fontWeight:"600"}}>
                {selectedSex}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map((option) => (
                    <Dropdown.Item
                        key={option}
                        onClick = {() => onSexChange(option)}
                        className = "interval-item"
                    >
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

SexDropdown.propTypes = {

    selectedSex : PropTypes.string,
    onSexChange : PropTypes.func
}

export default SexDropdown;