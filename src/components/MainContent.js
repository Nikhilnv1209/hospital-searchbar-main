import React, { useRef, useContext, useEffect } from "react";
import styles from "./MainContent.module.scss";
import { HospitalContext } from "../Context/HospitalContext";
// eslint-disable-next-line
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
const autocompleteapikey = process.env.REACT_APP_AUTOCOMPLETE_API_KEY;

const MainContent = () => {
  // eslint-disable-next-line
  // const [area, setarea] = useState();
  const ref = useRef(null);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { area, params} = useContext(HospitalContext).data.states;
  // eslint-disable-next-line
  const { setarea, setparams } = useContext(HospitalContext).data.setstate;
  // eslint-disable-next-line
  const { fetch_location_hospitals, fetch_area_hospitals } =
    useContext(HospitalContext).data.utility;

  useEffect(() => {
    // console.log(ref.current);
    if (ref.current) {
      const autocomplete = new GeocoderAutocomplete(
        ref.current,
        autocompleteapikey,
        {
          countryCodes: ["in"],
          language: "en",
          debounceDelay: 800,
          placeholder: "Search for a place...",
        }
      );

      autocomplete.on("select", async (location) => {
        // check selected location
        await setparams({...params,
          lat: location.properties.lat,
          lon: location.properties.lon,
          place_id: location.properties.place_id,
          name: location.properties.name,
        });
      });
      autocomplete.on("error", (error) => {
        // handle error here
        console.log(error);
      });
    }
    // eslint-disable-next-line
  }, [ref]);

  return (
    <div className={styles.mainContainer}>
      {/* Title */}
      <span className={styles.title}>Search For Hospitals Nearby You</span>

      {/* Subtitle */}
      <div className={styles.subtitle}>
        {/* Select by location or area */}
        <select
          onChange={(e) => {
            setarea(e.target.value);
          }}
        >
          <option value="" selected hidden disabled>
            Select Your Choice
          </option>
          <option value="location">Search by Location</option>
          <option value="area">Search by Area</option>
        </select>

        {area === "area" ? (
          <input
            type="text"
            placeholder="Area Radius(in meters)..."
            value={params.radius}
            onChange={(e) => {
              setparams({ ...params, radius: e.target.value });
            }}
          />
        ) : null}
      </div>

      <div className={styles.autocompletecontainer}>
        <div className={styles.autocomplete} ref={ref}></div>
        <div className={styles.searchButton}>
          <button
            onClick={async () => {
              if (area === "location") {
                const res = await fetch_location_hospitals();
                navigate("/details/maps", {
                  state: { params: params, hospital: res },
                });
              } else if (area === "area") {
                const res = await fetch_area_hospitals();
                navigate("/details/maps", {
                  state: { params: params, hospital: res },
                });
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

// const [searchText, setSearchText] = useState("");
//   const [optionsVisible, setOptionsVisible] = useState(false);
//   const [selectedHospital, setSelectedHospital] = useState("");

//   const searchedData = useMemo(() => {
//     const tempArr = JSON.parse(JSON.stringify(HOSPITALS));
//     if (searchText) {
//       return tempArr.filter((item) =>
//         item.name?.toLowerCase()?.includes(searchText)
//       );
//     } else {
//       return [];
//     }
//   }, [searchText]);

//   const onSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   const toggleOptions = () => setOptionsVisible(!optionsVisible);

//   const renderData = searchedData?.length > 0 ? searchedData : HOSPITALS;

//   const onItemSelection = (i) => {
//     setSearchText(i.name);
//     setSelectedHospital(i);
//     setOptionsVisible(false);
//   };

// placeholder="Search..."
//         data-is-options-visible={optionsVisible}
//         value={searchText}
//         onChange={onSearch}
//         onClick={toggleOptions}

// {optionsVisible && (
//   <div className={styles.optionsContainer}>
//     {renderData?.map((i, index) => {
//       return (
//         <div
//           key={index}
//           className={styles.listItem}
//           onClick={() => onItemSelection(i)}
//         >
//           <span>{i?.name}</span>
//         </div>
//       );
//     })}
//   </div>
// )}

// {selectedHospital && (
//   <div className={styles.listItemCard}>
//     <img src={selectedHospital.img} alt="img" />
//     <div className={styles.details}>
//       <span className={styles.name}>{selectedHospital.name}</span>
//       <span>{selectedHospital.address}</span>
//       <span>No of Beds : {selectedHospital.no_of_beds}</span>
//     </div>
//   </div>
// )}
