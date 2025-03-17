
import React from "react";

const Banner = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",  marginTop: "55px",  marginBottom: "0px"}}>
                        <h1 className="login-title">Adopta un Robot con Robot Lovers!</h1>

            <hr style={{ width: "77%", height: "1px", backgroundColor: "rgb(0, 0, 0.4)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 1)", marginBottom: "8px" }} />
           
            <img 
                src="/robot-banner.png" 
                alt="Banner de Robots" 
                style={{ width: "960px", height: "261px", display: "block", margin: "0 auto" }} 
            />
            <hr style={{ width: "77%", height: "1px", backgroundColor: "rgb(0, 0, 0.4)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 1)", marginTop: "14px", marginBottom: "0px"  }} />
        </div>
    );
};

export default Banner;
