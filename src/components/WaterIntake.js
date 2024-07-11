import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

function WaterIntake() {
    const [quantity, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { auth } = useContext(AuthContext);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    function handleSubmit() {
        let waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || {};
        
        if (waterIntake[auth] && waterIntake[auth][currentDate]) {
            setErrorMessage('You have already logged water intake for today.');
            return;
        }

        const intakeInLiters = parseFloat(quantity);

        if (isNaN(intakeInLiters) || intakeInLiters <= 0) {
            setErrorMessage('Please enter a valid quantity in liters.');
            return;
        }

        if (!waterIntake[auth]) {
            waterIntake[auth] = {};
        }
        
        waterIntake[auth][currentDate] = {
            quantity:intakeInLiters,
            time:currentTime};
        localStorage.setItem('waterIntake', JSON.stringify(waterIntake));

        setErrorMessage('');
        alert('Water intake logged successfully!');
        setQuantity('');
    }

    return (
        <div>
            <h1> Water Intake</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
                <label>Water Quantity (in liters):</label>
                <input 
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default WaterIntake;
