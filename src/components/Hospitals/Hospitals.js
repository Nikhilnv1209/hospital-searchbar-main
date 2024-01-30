import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HospitalContext } from "../../Context/HospitalContext";
import List from "./List";

const Hospitals = () => {
  // eslint-disable-next-line
  const { setparams, setarea } = useContext(HospitalContext).data.setstate;
  const navigate = useNavigate();
  return (
    <main className="relative flex-1 flex">
      <List />
      <button
        className={"absolute bottom-1 right-[50%] translate-x-[50%] bg-[#393E46]/80 hover:bg-[#393E46]/50 transition duration-150 text-[#eeeeee] h-8 w-24 rounded-md text-sm z-10"}
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
    </main>
  );
};

export default Hospitals;
