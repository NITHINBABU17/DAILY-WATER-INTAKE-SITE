import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/register';
import Aboutus from './components/Aboutus';
//  import Home from './components/Home';
import WaterIntake from './components/WaterIntake'; 
import ListWater from './components/ListWater';


function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    {/* { <Route path="/" element={<Home />} /> } */}
                    <Route path="/aboutus" element={<Aboutus />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/water-intake" element={<WaterIntake />} />
                    <Route path="/listwater" element={<ListWater />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;




// import React from 'react';
// import Navbar from './components/Navbar';


// function App() {
//   return(
//   <div>
//     <Navbar/>
//     <p>Home component </p>
//   </div>
// );
// }

// export default App;