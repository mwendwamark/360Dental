import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryBtn from "./components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "./components/SecondaryBtn/SecondaryBtn";

import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>{/* Routes will be added here */}</Routes>
    </BrowserRouter>
  );
};

export default App;
