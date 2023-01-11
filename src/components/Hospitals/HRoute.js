import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Maps.module.scss";
import L from "leaflet";
import axios from "axios";
// import { HospitalContext } from "../../Context/HospitalContext";

const mapkey = process.env.REACT_APP_MAP_ROUTE_API_KEY;
const HRoute = () => {
  const location = useLocation();
  const params = location.state.params;
  const route = location.state.route;
  console.log("Hroute route",route);
  console.log("Hroute params",params);
  let mapContainer = useRef(null);
  const [loaded, setloaded] = useState(false);
  let map = useRef(null);

  const maproute = async () => {
    const res = await axios(
      `https://api.geoapify.com/v1/routing?waypoints=${params.lat},${params.lon}|${route.properties.lat},${route.properties.lon}&mode=drive&apiKey=${mapkey}`
    );
    return res;
  };

  useEffect(() => {
    if (loaded === false) {
      map.current = L.map(mapContainer).setView(
        [route.properties.lat, route.properties.lon],
        15
      );
      // console.log(loaded);
      setloaded(true);
    } else if (loaded) {
      // console.log(loaded);
      map.current.remove();
      map.current = L.map(mapContainer).setView(
        [route.properties.lat, route.properties.lon],
        15
      );
      // console.log(map.remove());
    }
    // use map.revome() to remove the map

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

    // Home marker
    L.marker([params.lat, params.lon], { icon: centermarkerIcon })
      .addTo(map.current)
      .bindPopup(`<b>${params.name}</b>`);

    // Hospital marker
    // L.marker([route.geometry.coordinates[1], route.geometry.coordinates[0]], {
    //   icon: markerIcon,
    // })
    //   .addTo(map.current)
    //   .bindPopup(`<b>${route.properties.name}</b>`)
    //   .openPopup();

    // Hospital marker
    // eslint-disable-next-line
    const hospitalmarker = L.geoJSON(route, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: markerIcon }).bindPopup(
          `<b>${feature.properties.name}</b>`
        );
      },
    }).addTo(map.current);

    // Home to Hospital route with waypoints and distance and steps and meters
    maproute().then((res) => {
      console.log("route form api Hroute",res.data.features[0]);
      L.geoJSON(res.data.features[0], {
        style: function () {
          return {
            color: "blue",
            weight: 9,
            opacity: 0.85,
            lineJoin: "round",
            lineCap: "round",
            dashArray: "6, 4"
          };
        },
        onEachFeature: function (feature, layer) {

        },
      }).addTo(map.current);
    });

    // map.remove();
    // eslint-disable-next-line
  }, [mapContainer, route]);

  return (
    <div
      className={styles.mapcontainer}
      ref={(e) => {
        e = mapContainer = e;
      }}
    ></div>
  );
};

export default HRoute;
