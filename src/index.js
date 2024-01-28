import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HospitalProvider } from "./Context/HospitalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HospitalProvider>
      <Routes>
        <Route path="*" element={<App />}></Route>
      </Routes>
    </HospitalProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
