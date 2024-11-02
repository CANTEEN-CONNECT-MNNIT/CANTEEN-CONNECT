import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, ForgotPass, Home, NotFound, SignUp } from "./Pages";
import Layout from "./Pages/Layout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="" element={<Home/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPass/>} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;