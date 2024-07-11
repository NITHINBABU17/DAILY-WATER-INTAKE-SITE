import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem('authToken');
        return savedAuth ? savedAuth : null;
    });

    const [waterIntake, setWaterIntake] = useState(() => {
        const storedIntake = localStorage.getItem('waterIntake');
        return storedIntake ? JSON.parse(storedIntake) : {};
    });

    useEffect(() => {
        localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
    }, [waterIntake]);

    useEffect(() => {
        if (auth) {
            localStorage.setItem('authToken', auth);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [auth]);

    const login = (username) => {
        setAuth(username);
        localStorage.setItem('authToken', username);
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('authToken');
    };

    const addWaterIntake = (username, quantity) => {
        const today = new Date().toISOString().split('T')[0]; 
        setWaterIntake(prev => ({
            ...prev,
            [username]: {
                ...prev[username],
                [today]: quantity
            }
        }));
    };

    const getWaterIntakeForToday = (username) => {
        const today = new Date().toISOString().split('T')[0];
        return waterIntake[username]?.[today] || null;
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, addWaterIntake, getWaterIntakeForToday }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;















// import React, { createContext,useState,useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState(localStorage.getItem('authToken'));
//     const [waterIntake, setWaterIntake] = useState(() => {
//         const storedIntake = localStorage.getItem('waterIntake');
//         return storedIntake ? JSON.parse(storedIntake) : {};
//     });
    
//     useEffect(() => {
//         localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
//     }, [waterIntake]);

//     const login = (username) => {
//         setAuth(username);
//         localStorage.setItem('authToken', username);
//     };

//     const logout = () => {
//         setAuth(null);
//         localStorage.removeItem('authToken');
//     };

//     const addWaterIntake = (username, quantity) => {
//         const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//         setWaterIntake(prev => ({
//             ...prev,
//             [username]: {
//                 ...prev[username],
//                 [today]: quantity
//             }
//         }));
//     };

//     const getWaterIntakeForToday = (username) => {
//         const today = new Date().toISOString().split('T')[0];
//         return waterIntake[username]?.[today] || null;
//     };

//     return (
//         <AuthContext.Provider value={{ auth,login,logout,addWaterIntake,getWaterIntakeForToday }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
