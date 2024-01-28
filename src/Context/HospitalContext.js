import axios from "axios";
import { createContext, useState } from "react";

export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const locationapikey = process.env.REACT_APP_LOCATION_API_KEY;
  const [Area, setArea] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [params, setParams] = useState({
    lat: 0,
    lon: 0,
    place_id: "",
    radius: "",
    name: "",
  });

  const Fetch_location_hospitals = async () => {
    // console.log(params);
    const res = await axios.get(
      `https://api.geoapify.com/v2/places?categories=healthcare,healthcare.clinic_or_praxis,healthcare.dentist,healthcare.hospital,healthcare.pharmacy&filter=place:${params.place_id}&limit=20&apiKey=${locationapikey}`
    );
    setHospitals([...res.data.features]);
  };

  const Fetch_area_hospitals = async () => {
    const res = await axios.get(
      `https://api.geoapify.com/v2/places?categories=healthcare,healthcare.clinic_or_praxis,healthcare.dentist,healthcare.hospital,healthcare.pharmacy&filter=circle:${params.lon},${params.lat},${params.radius}&bias=proximity:${params.lon},${params.lat}&limit=20&apiKey=${locationapikey}`
    );

    setHospitals([...res.data.features]);
  };

  const data = {
    states: {
      area: Area,
      params: params,
      hospitals: hospitals,
    },
    setstate: {
      setarea: setArea,
      setparams: setParams,
    },
    utility: {
      fetch_location_hospitals: Fetch_location_hospitals,
      fetch_area_hospitals: Fetch_area_hospitals,
    },
  };

  return (
    <HospitalContext.Provider value={{ data }}>
      {children}
    </HospitalContext.Provider>
  );
};
