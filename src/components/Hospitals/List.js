import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HospitalContext } from "../../Context/HospitalContext";

const List = () => {
  const navigate = useNavigate();
  const { hospitals } = useContext(HospitalContext).data.states;

  const { setselectedhospital } = useContext(HospitalContext).data.setstate;

  const handleSelect = (items) => {
    setselectedhospital(items);
    navigate("/details/route");
  };

  return (
    <div className="absolute top-[1%] left-1 z-10 max-h-[98%] w-[25%] flex flex-col items-center overflow-y-auto bg-[#eeeeee] text-[#393E46] opacity-95">
      {hospitals &&
        hospitals.map((items, index) => (
          <div
            className="flex flex-col w-full bg-[#eeeeee] border-b border-[#222831] px-2 hover:bg-[#393E46]/10 cursor-pointer transition duration-300 ease-in- group"
            key={index}
          >
            <span
              className="text-left font-semibold text-base block w-full cursor-pointer hover:underline group-hover:underline mb-1"
              onClick={() => handleSelect(items)}
            >
              {items.properties.datasource.raw.name}
            </span>

            <div className="text-[0.8rem] flex flex-col gap-1">
              <div className="flex font-normal">
                <span className="block text-center">Address :</span>
                <span className="flex flex-1 gap-1 flex-wrap pl-2">
                  <span>{items.properties.datasource.raw["addr:full"]},</span>
                  <span>
                    {items.properties.datasource.raw["addr:district"]},
                  </span>
                  <span>{items.properties.datasource.raw["addr:state"]},</span>
                  <span>
                    {items.properties.datasource.raw["addr:postcode"]}
                  </span>
                </span>
              </div>

              <div className="flex font-normal">
                <span className="block text-center">Amenity:</span>
                <span className="flex-1 uppercase pl-2">
                  {items.properties.datasource.raw.amenity}
                </span>
              </div>

              <div className="flex font-normal">
                <span className="block text-center">Distance:</span>
                <span className="pl-2">{items.properties.distance} Meters</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
