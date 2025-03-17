import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";  
import Login from "./Components/Login";
import RobotsList from "./Components/RobotList";
import Banner from "./Components/Banner";


import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

function App() {
  const [auth, setAuth] = useState(false);
  const [locale, setLocale] = useState("en");  
  const [messages, setMessages] = useState(localeEnMessages);


  useEffect(() => {
    const userLocale = navigator.language.startsWith("es") ? "es" : "en";
    setLocale(userLocale);

 
    if (userLocale === "es") {
      setMessages(localeEsMessages);
    } else {
      setMessages(localeEnMessages);
    }
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <div className="container">
          <Banner />
          <Routes>
            <Route path="/" element={auth ? <Navigate to="/robots" /> : <Login setAuth={setAuth} />} />
            <Route path="/robots" element={auth ? <RobotsList /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
