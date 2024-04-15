import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";


function IntervalDropdown ({
    options,
    selectedInterval,
    onIntervalChange
}) {
    
    return(
        <Dropdown className = "interval-picker">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedInterval}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map((option) => (
                    <Dropdown.Item
                        key={option}
                        onClick = {() => onIntervalChange(option)}
                        className = "interval-item"
                    >
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

IntervalDropdown.propTypes = {
    options : PropTypes.array,
    selectedInterval : PropTypes.string,
    onIntervalChange : PropTypes.func
}

export default IntervalDropdown;