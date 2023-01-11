import React from "react";
import styles from "./App.module.scss";
import hospitalstyles from "./components/Hospitals/Hospitals.module.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Hospitals from "./components/Hospitals/Hospitals";
import Maps from "./components/Hospitals/Maps";
import HRoute from "./components/Hospitals/HRoute";
import { Routes, Route} from "react-router-dom";
// import { HospitalContext } from "./Context/HospitalContext";

const App = () => {
  // const navigate = useNavigate();
  // const { setparams, setarea } = useContext(HospitalContext).data.setstate;
  return (
    <div className={styles.mainContainer}>
      {/* <img src={Banner} alt="banner" /> */}
      <Header />

      <Routes>
        <Route path="/" element={<MainContent />}></Route>
      </Routes>
      <div className={hospitalstyles.Maincontainer}>
        <Routes>
          <Route path="/details" element={<Hospitals />}>
            <Route path="/details/maps" element={<Maps />} />
            <Route path="/details/route" element={<HRoute />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
