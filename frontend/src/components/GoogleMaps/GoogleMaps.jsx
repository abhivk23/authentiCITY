import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "1600px",
  height: "800px",
};

const center_demo = {
  lat: 41.795,
  lng: -87.5917,
};

// name: string, category: string (restaurant, retail store),
// review: string, ratings: dictionary (criteria : ), latitude: int, longitude: int

export const GoogleMaps = ({ pins }) => {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCaqLHmoHvFy_t4H3EZiuvHOmcm2nbt0bI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center_demo}
        zoom={14}
      >
        {pins && pins.map((item, i) => {
          const {name, type, review, experience, cleanliness, prodquality, price, lat, lng, isfake} = item;
          return (
              <Marker
                key={item.name}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => {setSelected(i)}}
              >
                {selected && selected === i && (
                  <InfoWindow onCloseClick={() => setSelected(null)}>
                    <p>{name}</p>
                  </InfoWindow>
                )}
              </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
