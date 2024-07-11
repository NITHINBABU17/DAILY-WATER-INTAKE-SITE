import React, { useState } from 'react';

function EditWater({ entry, onEdit, onCancel }) {
    const [quantity, setQuantity] = useState(entry.quantity);

    const handleSubmit = () => {
        if (quantity <= 0) {
            alert('Quantity must be greater than zero');
            return;
        }
        const updatedEntry = {
            ...entry,
            quantity,
            time: new Date().toLocaleTimeString()
        };
        onEdit(updatedEntry);
    };

    return (
        <tr>
            <td>{entry.userName}</td>
            <td>{entry.date}</td>
            <td>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                />
            </td>
            <td>{entry.time}</td>
            <td>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </td>
        </tr>
    );
}

export default EditWater;
