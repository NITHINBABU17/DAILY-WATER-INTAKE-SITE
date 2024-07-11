import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import DeleteWater from './DeleteWater';
import EditWater from './EditWater';

function ListWater() {
    const { auth } = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [userName, setUserName] = useState('');
    const [editEntry, setEditEntry] = useState(null);
    const [deleteEntry, setDeleteEntry] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [difference, setDifference] = useState(null);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.email === auth);
        if (currentUser) {
            setUserName(currentUser.name);
        }

        const waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || {};
        if (waterIntake[auth]) {
            const userList = Object.entries(waterIntake[auth]).map(([date, entry]) => ({
                date,
                ...entry
            }));
            setList(userList);
        }
    }, [auth]);

    const handleDelete = (date) => {
        const waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || {};
        if (waterIntake[auth]) {
            delete waterIntake[auth][date];
            localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
            setList(prevList => prevList.filter(entry => entry.date !== date));
        }
        setDeleteEntry(null);
    };

    const handleEdit = (updatedEntry) => {
        const waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || {};
        if (waterIntake[auth]) {
            waterIntake[auth][updatedEntry.date] = {
                quantity: updatedEntry.quantity,
                time: updatedEntry.time
            };
            localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
            setList(prevList => prevList.map(entry => entry.date === updatedEntry.date ? updatedEntry : entry));
        }
        setEditEntry(null);
    };

    const calculateDifference = () => {
        if (!startDate || !endDate) {
            setDifference('Please select both start and end dates.');
            return;
        }

        const waterIntake = JSON.parse(localStorage.getItem('waterIntake')) || {};
        const userIntake = waterIntake[auth] || {};

        const startIntake = userIntake[startDate]?.quantity || 0;
        const endIntake = userIntake[endDate]?.quantity || 0;

        const intakeDifference = endIntake - startIntake;
        setDifference(`Difference in water intake between ${startDate} and ${endDate} is ${intakeDifference} liters.`);
    };

    return (
        <div className="container">
            <div className="text-center">
                <h2>{userName}'s Water Consumption</h2>
                {list.length === 0 ? (
                    <p>No water intake recorded yet.</p>
                ) : (
                    <div className="table-wrapper">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>User Name</th>
                                    <th>Date</th>
                                    <th>Quantity (liters)</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((entry, index) => (
                                    deleteEntry && deleteEntry.date === entry.date ? (
                                        <DeleteWater
                                            key={index}
                                            entry={entry}
                                            onDelete={handleDelete}
                                            onCancel={() => setDeleteEntry(null)}
                                        />
                                    ) : editEntry && editEntry.date === entry.date ? (
                                        <EditWater
                                            key={index}
                                            entry={entry}
                                            onEdit={handleEdit}
                                            onCancel={() => setEditEntry(null)}
                                        />
                                    ) : (
                                        <tr key={index}>
                                            <td>{userName}</td>
                                            <td>{entry.date}</td>
                                            <td>{entry.quantity}</td>
                                            <td>{entry.time}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => setEditEntry(entry)}>Edit</button>&nbsp;&nbsp;
                                                <button className="btn btn-danger" onClick={() => setDeleteEntry(entry)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="difference-calculator mt-4">
                    <h3>Water Intake Difference</h3>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Start Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>End Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={calculateDifference}>Calculate</button>
                    {difference && <div className="alert alert-info mt-3">{difference}</div>}
                </div>
            </div>
        </div>
    );
}

export default ListWater;
