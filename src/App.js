import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Hospitals from "./components/Hospitals/Hospitals";
import Maps from "./components/Hospitals/Maps";
import HRoute from "./components/Hospitals/HRoute";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col gap-8 justify-between relative bg-[#222831]">
        <Header />

        <Routes>
          <Route path="/" element={<MainContent />}></Route>
        </Routes>

        <div className="max-h-[65vh] grid grid-cols-2 place-items-center gap-1">
          <Routes>
            <Route path="/details" key={location.key} element={<Hospitals />}>
              <Route
                path="/details/maps"
                key={location.key}
                element={<Maps />}
              />
              <Route
                path="/details/route"
                key={location.key}
                element={<HRoute />}
              />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
