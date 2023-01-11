import React from "react";
import styles from "./List.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log("hospitals list",location.state.hospital);
  console.log("params list",location.state.params);
  // console.log(location.state.hospital);
  const list = location.state.hospital;

  return (
    <div className={styles.listContainer}>
      {list.map((items, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <span
              className={styles.name}
              onClick={() => {
                navigate("/details/route", {
                  state: {
                    route: items,
                    params: location.state.params,
                    hospital: list,
                  },
                });
              }}
            >
              {items.properties.datasource.raw.name}
            </span>
            <span className={styles.hospitaldetails}>
              <span className={styles.addresscontainer}>
                <span className={styles.address}>Address : </span>
                <span className={styles.fulladdress}>
                  <span className={styles.address_name}>
                    {items.properties.datasource.raw["addr:full"]},
                  </span>
                  <span className={styles.address_district}>
                    {items.properties.datasource.raw["addr:district"]},
                  </span>
                  <span className={styles.address_state}>
                    {items.properties.datasource.raw["addr:state"]},
                  </span>
                  <span className={styles.address_code}>
                    {items.properties.datasource.raw["addr:postcode"]}
                  </span>
                </span>
              </span>

              <span className={styles.amanitycontainer}>
                <span className={styles.amanity}>Amenity: </span>
                <span className={styles.avalue}>
                  {items.properties.datasource.raw.amenity}
                </span>
              </span>

              <span className={styles.distancecontainer}>
                <span className={styles.distance}>Distance: </span>
                <span className={styles.dvalue}>
                  {items.properties.distance} Meters
                </span>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
