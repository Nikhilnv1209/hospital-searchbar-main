import React, { useContext } from "react";
import { HospitalContext } from "../Context/HospitalContext";
import { useNavigate } from "react-router-dom";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import Select from "react-select";
import { toast } from "react-toastify";

const autocompleteapikey = process.env.REACT_APP_AUTOCOMPLETE_API_KEY;

const MainContent = () => {
  const navigate = useNavigate();
  const { area, params } = useContext(HospitalContext).data.states;
  const { setarea, setparams } = useContext(HospitalContext).data.setstate;
  const { fetch_location_hospitals, fetch_area_hospitals } =
    useContext(HospitalContext).data.utility;

  const handleSearch = async () => {
    if (!area) {
      // error toast
      toast.warn("Please select an option", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const res = toast.promise(
      area === "location" ? fetch_location_hospitals() : fetch_area_hospitals(),
      {
        pending: "Fetching data...",
        success: "Data fetched successfully",
        error: "Error fetching data",
      }
    );

      res.then(() => navigate("/details/maps"));
    
  };

  const onPlaceSelect = ({ properties }) => {
    console.log(properties);
    setparams({
      ...params,
      lat: properties.lat,
      lon: properties.lon,
      place_id: properties.place_id,
      name: properties.formatted,
    });
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#eeeeee",
      borderRadius: "0.5rem",
      borderColor: "#D1D5DB",
      // adjust height and padding as needed
      maxHeight: "1rem",
      fontSize: ".8em",
      minWidth: "12rem",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#E2E8F0" : isSelected ? "#CBD5E0" : "white", // Tailwind colors
      color: "black",
      fontSize: ".8em",
    }),
  };

  return (
    <div className="flex-1 flex flex-col items-center md:justify-start mt-24 md:mt-12 text-[#eeeeee]">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-bold text-[#eeeeee]">
          Healthcare Finder
        </h1>
        <span className="w-56 text-sm text-center md:text-xl md:w-auto">
          Connecting You to the Right Care, Right Now
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-12 mb-6 md:flex-row">
        <span className="">Search For Hospitals Nearby You</span>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Select
            options={[
              { value: "location", label: "Location" },
              { value: "area", label: "Area" },
            ]}
            onChange={(e) => {
              setarea(e.value);
            }}
            styles={selectStyles}
            placeholder="Select an option"
          />
          {area === "area" && (
            <input
              type="text"
              placeholder="Area Radius (in meters)"
              value={params.radius}
              onChange={(e) => {
                setparams({ ...params, radius: e.target.value });
              }}
              className="bg-[#393E46] h-10 w-48 outline-none border-none md:w-48 md:h-8 rounded-md text-white text-sm px-2 py-1 placeholder:text-[11px] placeholder:tracking-wider placeholder:text-[#eeeeee]"
            />
          )}
        </div>
      </div>

      <div className="w-full md:max-w-lg">
        <div className="flex flex-col items-center justify-center gap-3">
          <GeoapifyContext apiKey={autocompleteapikey}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              type={"city"}
              lang={"en"}
              filterByCountryCode={["in"]}
              limit={5}
              value={params.name}
              placeSelect={onPlaceSelect}
            />
          </GeoapifyContext>
          <div className="bg-[#393E46] px-8 py-3 md:py-2 rounded-md text-[#eeeeee] md:text-base text-sm hover:bg-[#eeeeee] hover:text-[#393E46] cursor-pointer transition-all transition-duration-300">
            <button onClick={handleSearch}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
