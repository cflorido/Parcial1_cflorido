import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import RobotsList from "./Components/RobotList";
import Banner from "./Components/Banner"; 

function App() {
    const [auth, setAuth] = useState(false);

    return (
        <BrowserRouter>
            <div className="container">
                <Banner /> {/* El banner*/}
                <Routes>
                    <Route path="/" element={auth ? <Navigate to="/robots" /> : <Login setAuth={setAuth} />} />
                    <Route path="/robots" element={auth ? <RobotsList /> : <Navigate to="/" />} />
                </Routes>
              
            </div>
        </BrowserRouter>
    );
}

export default App;
