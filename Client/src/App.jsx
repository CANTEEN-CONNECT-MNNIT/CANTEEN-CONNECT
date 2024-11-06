import React, { useEffect, useState } from "react";
import { Route, Routes,useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Orderpage from "./Pages/OrderPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [CurrentPage, setCurrentPage] = useState('HomePage');
  const location=useLocation();

  useEffect(() => {
    const pageName = location.pathname === "/" ? "HomePage" : "OrderPage";
    setCurrentPage(pageName);
  }, [location]);

  return (
      <Routes>
        <Route path="/" 
        element={ <Home CurrentPage={CurrentPage} 
                    setCurrentPage={setCurrentPage} 
                    darkMode={darkMode} 
                    isOpen={isOpen}
                    setOpen={setOpen}/>} />
        <Route path="/OrderPage" 
        element={<Orderpage 
        CurrentPage={CurrentPage}
         darkMode={darkMode} 
         setDarkMode={setDarkMode} 
         isOpen={isOpen} 
         setOpen={setOpen} />} />
        <Route path="/*" element={<Error />} />
      </Routes>

  );
};

export default App;
