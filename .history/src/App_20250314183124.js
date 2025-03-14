import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./login";
import RobotsList from "./RobotList.js"; 

function App() {
    const [auth, setAuth] = useState(false);

    return (

      
        <BrowserRouter>
            <Routes>
                {!auth ? (
                    <Route path="/" element={<Login setAuth={setAuth} />} />
                ) : (
                    <Route path="/robots" element={<RobotsList />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
