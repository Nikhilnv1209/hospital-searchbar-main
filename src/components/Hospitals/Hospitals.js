import React, {useContext} from "react";
import { Outlet , useNavigate} from "react-router-dom";
import styles from "./Hospitals.module.scss";
// import Maps from "./Maps";
import { HospitalContext } from "../../Context/HospitalContext";
import List from "./List";

const Hospitals = () => {
  // eslint-disable-next-line
  const { setparams, setarea } = useContext(HospitalContext).data.setstate;
  const navigate = useNavigate();

  return (
    <>
        {/* <Maps /> */}
        <div className={styles.HospitalList}>
          <List />
        </div>
        <button
          className={styles.backButton}
          onClick={() => {
            setparams({
              lat: 0,
              lon: 0,
              place_id: "",
              radius: "",
            });
            setarea("");
            navigate("/");
          }}
        >
          Go back
        </button>
<Outlet />
    </>
  );
};

export default Hospitals;
