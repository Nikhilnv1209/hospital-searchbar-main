import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Maps.module.scss";
import L from "leaflet";
// import { HospitalContext } from "../../Context/HospitalContext";
// const mapkey = process.env.REACT_APP_MAP_API_KEY;

const Maps = () => {
  const [loaded, setloaded] = useState(false);
  const location = useLocation();
  const params = location.state.params;
  const hospital = location.state.hospital;
  console.log("hospitals maps",hospital);
  console.log("params maps",params);
  let mapContainer = useRef(null);
  let map = useRef(null);

  useEffect(() => {
    if (loaded === false) {
      map.current = L.map(mapContainer).setView([params.lat, params.lon], 15);
      console.log(loaded);
      setloaded(true);
    } else if (loaded) {
      console.log(loaded);
      map.current.remove();
      map.current = L.map(mapContainer).setView([params.lat, params.lon], 15);
      // console.log(map.remove());
    }
    // let isRetina = L.Browser.retina;
    // let baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapkey}`;
    // let retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${mapkey}`;

    // L.tileLayer(isRetina ? retinaUrl : baseUrl, {
    //   //   attribution:
    //   //     'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    //   apiKey: mapkey,
    //   maxZoom: 20,
    //   id: "osm-bright",
    // }).addTo(map.current);

    const openstreet = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
      }
    );

    const googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    ).addTo(map.current);

    const googlehybrid = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    var baseMaps = {
      OpenStreetMap: openstreet,
      "Google Street": googleStreets,
      "Google Hybrid": googlehybrid,
    };

    L.control.layers(baseMaps).addTo(map.current);

    let markerIcon = L.icon({
      iconUrl: "/marker.png", // path to the icon
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    });

    let centermarkerIcon = L.icon({
      iconUrl: "/Center.png", // path to the icon
      iconSize: [50, 50], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    });

    // geojson
    // eslint-disable-next-line
    const Hospitals = L.geoJSON(hospital, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: markerIcon });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
      },
    }).addTo(map.current);

    // for (let i = 0; i < hospital.length; i++) {
    //   L.marker(
    //     [
    //       hospital[i].geometry.coordinates[1],
    //       hospital[i].geometry.coordinates[0],
    //     ],
    //     {
    //       icon: markerIcon,
    //     }
    //   )
    //     .addTo(map.current)
    //     .bindPopup(`<h3>${hospital[i].properties.name}</h3>`);
    // }

    L.marker([params.lat, params.lon], { icon: centermarkerIcon })
      .addTo(map.current)
      .bindPopup(`<h3>${params.name}</h3>`);

    // eslint-disable-next-line
  }, [mapContainer]);

  return (
    <div
      className={styles.mapcontainer}
      ref={(e) => {
        e = mapContainer = e;
      }}
    ></div>
  );
};

export default Maps;
