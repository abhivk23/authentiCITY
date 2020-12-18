import React, { useState } from "react";
import "./GoogleMaps.scss";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import StarRatings from "react-star-ratings";

const containerStyle = {
  width: "1600px",
  height: "800px",
};

const center_demo = {
  lat: 41.795,
  lng: -87.5917,
};

export const GoogleMaps = ({ pins, user_type }) => {
  const [selected, setSelected] = useState(null);
  return (
    <LoadScript googleMapsApiKey="AIzaSyCaqLHmoHvFy_t4H3EZiuvHOmcm2nbt0bI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center_demo}
        zoom={14}
      >
        {pins &&
          pins.map((item, i) => {
            const {
              name,
              type,
              review,
              experience,
              cleanliness,
              prodquality,
              price,
              lat,
              lng,
              isfake,
              viewMode
            } = item;
            return (
              <Marker
                key={item.name}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => {
                  setSelected(i);
                }}
                icon={(viewMode) ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
              >
                {selected && selected === i && (
                  <InfoWindow 
                  onCloseClick={() => setSelected(null)}
                  >
                    <div className="info-window">
                      <div>
                      <h4>{(viewMode) ? "Local Review" : "Visitor Review"}</h4>
                      <h2>{name}</h2>
                      <div id="container">
                        <div className="rating">
                          <p>Experience: </p>
                          <StarRatings
                            name='experience_rating'
                            rating={experience}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="5px"
                          />
                          <p>Cleanliness: </p>
                          <StarRatings
                            name='cleanliness_rating'
                            rating={cleanliness}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="5px"
                          />
                          <p>Product Quality: </p>
                          <StarRatings
                            name='product_rating'
                            rating={prodquality}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="5px"
                          />
                          <p>Price: </p>
                          <StarRatings
                            name='price_rating'
                            rating={price}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="5px"
                          />
                        </div>
                        </div>
                        <div className="reviews">
                          <p><b>Top Review: </b><i>{review}</i></p>
                        </div>
                      </div>
                    </div>
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
