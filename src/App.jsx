import React from "react";
import { BrowserRouter, Route,Routes}from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;