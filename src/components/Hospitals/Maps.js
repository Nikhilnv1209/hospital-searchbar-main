import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import { HospitalContext } from "../../Context/HospitalContext";

const Maps = () => {
  const { params, hospitals } = useContext(HospitalContext).data.states;
  let mapContainer = useRef(null);
  let map = useRef(null);

  useEffect(() => {
    map.current = L.map(mapContainer).setView([params.lat, params.lon], 15);

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
    const Hospitals = L.geoJSON(hospitals, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: markerIcon });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
      },
    }).addTo(map.current);

    L.marker([params.lat, params.lon], { icon: centermarkerIcon })
      .addTo(map.current)
      .bindPopup(`<h3>${params.name}</h3>`);

      
      return () => {
        map.current.remove();
      };
  // eslint-disable-next-line
  }, [mapContainer]);

  return (
    <div
      className={"z-0 w-[100vw]"}
      ref={(e) => {
        e = mapContainer = e;
      }}
    ></div>
  );
};

export default Maps;
