
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

 
function RangeExample() {
    const [sliderValue, setSliderValue] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(50);
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };
    
    const handleSliderChange2 = (e) => {
        setSliderValue2(e.target.value);
    };
    return (
        <div className="outer">
            <div>
                <Form.Label>
                    Range Slider
                </Form.Label>
                <Form.Range
                    value={sliderValue}
                    name='hello'
                    onChange={handleSliderChange}
                    className="custom-slider"/>
                <Form.Range
                    value={sliderValue2}
                    name='hello'
                    onChange={handleSliderChange2}
                    className="custom-slider"/>
                <p>Selected Values: {sliderValue}, {sliderValue2}</p>
            </div>
        </div>
    );
}
 
export default RangeExample;
