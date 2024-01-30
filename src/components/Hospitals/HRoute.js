import React, { useContext, useEffect, useRef } from "react";
import L from "leaflet";
import axios from "axios";
import { HospitalContext } from "../../Context/HospitalContext";

const mapkey = process.env.REACT_APP_MAP_ROUTE_API_KEY;
const HRoute = () => {
  const { params, selectedHospital } = useContext(HospitalContext).data.states;
  let mapContainer = useRef(null);
  let map = useRef(null);

  const maproute = async () => {
    const res = await axios(
      `https://api.geoapify.com/v1/routing?waypoints=${params.lat},${params.lon}|${selectedHospital.properties.lat},${selectedHospital.properties.lon}&mode=drive&apiKey=${mapkey}`
    );
    return res;
  };

  useEffect(() => {
    map.current = L.map(mapContainer).setView(
      [selectedHospital.properties.lat, selectedHospital.properties.lon],
      15
    );

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

    // Home marker
    L.marker([params.lat, params.lon], { icon: centermarkerIcon })
      .addTo(map.current)
      .bindPopup(`<b>${params.name}</b>`);

    // Hospital marker
    // eslint-disable-next-line
    const hospitalmarker = L.geoJSON(selectedHospital, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: markerIcon }).bindPopup(
          `<b>${feature.properties.name}</b>`
        );
      },
    }).addTo(map.current);

    // Home to Hospital selectedHospital with waypoints and distance and steps and meters
    maproute().then((res) => {
      L.geoJSON(res.data.features[0], {
        style: function () {
          return {
            color: "blue",
            weight: 9,
            opacity: 0.85,
            lineJoin: "round",
            lineCap: "round",
            dashArray: "6, 4",
          };
        },
        onEachFeature: function (feature, layer) {},
      }).addTo(map.current);
    });

    return () => {
      map.current.remove();
    };
    // eslint-disable-next-line
  }, [mapContainer, selectedHospital]);

  return (
    <div
      className={"z-0 w-[100vw]"}
      ref={(e) => {
        e = mapContainer = e;
      }}
    ></div>
  );
};

export default HRoute;
