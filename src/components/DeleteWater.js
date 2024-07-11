import React from 'react';

function DeleteWater({ entry, onDelete, onCancel }) {
    return (
        <tr>
            <td colSpan="5">
                <p>Are you sure you want to delete the water intake entry for {entry.date}?</p>
                <button className="btn btn-danger" onClick={() => onDelete(entry.date)}>Delete</button>
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </td>
        </tr>
    );
}

export default DeleteWater;
