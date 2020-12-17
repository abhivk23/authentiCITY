import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

let center = {
  lat: -3.745,
  lng: -38.523
};

// name: string, category: string (restaurant, retail store), 
// review: string, ratings: dictionary (criteria : ), latitude: int, longitude: int
const pins = [
  { name: "Bob's Burgers", type: "restaurant", review: "Super yummy place!", experience: 3, cleanliness: 3, prodquality: 3, price: 2, lat: 41.79905, lng: -87.59100},
  { name: "Krusty Krab", type: "restaurant", review: "Love the burgers", experience: 4, cleanliness: 2, prodquality: 5, price: 1, lat: 41.799053, lng: -87.59020},
  { name: "Shinju Sushi", type: "restaurant", review: "It's sushi, I like sushi", experience: 2, cleanliness: 4, prodquality: 3, price: 2, lat: 41.799099, long: -87.592117},
  { name: "Valois Restaurant", type: "restaurant", review: "Fast breakfast, good diner", experience: 4, cleanliness: 4, prodquality: 3, price: 1, lat: 41.799750, lng: -87.588320},
  { name: "Salonica Restaurant", type: "restaurant", review: "Love the breakfast food", experience: 4, cleanliness: 4, prodquality: 4, price: 1, lat: 41.791670, lng: -87.590100},
  { name: "Piccolo Mondo", type: "restaurant", review: "Not old enough to drink here :(", experience: 2, cleanliness: 3, prodquality: 3, price: 2, lat: 41.793763, lng: -87.584649},
  { name: "Medici on 57th", type: "restaurant", review: "Forgot my prosciutto in my sandwich, gave it to me in a plate", experience: 2, cleanliness: 3, prodquality: 4, price: 3, lat: 41.791274, lng: -87.593741},
  { name: "The Nile of Hyde Park", type: "restaurant", review: "Really close to North dorms", experience: 3, cleanliness: 3, prodquality: 3, price: 3, lat: 41.795179, lng: -87.59715},
  { name: "Leon's Chicago Best", type: "restaurant", review: "Good ole American food", experience: 4, cleanliness: 4, prodquality: 3, price: 2, lat: 41.780713, lng: -87.58111},
  { name: "Café 53", type: "restaurant", review: "It's a café", experience: 4, cleanliness: 4, prodquality: 3, price: 2, lat: 41.79928, lng: -87.592385},
  { name: "The Silver Room", type: "retail store", review: "It wasn't silver", experience: 4, cleanliness: 4, prodquality: 4, price: 3, lat: 41.799658, lng: -87.588773},
  { name: "Powell's Books Chicago", type: "retail store", review: "I don't read but I like books", experience: 5, cleanliness: 5, prodquality: 5, price: 2, lat: 41.791344, lng: -87.588893},
  { name: "First Aid Comics", type: "retail store", review: "Comics are cool, sometimes funny", experience: 5, cleanliness: 5, prodquality: 5, price: 2, lat: 41.795086, lng: -87.585935},
  { name: "Hyde Park Florist", type: "retail store", review: "Flowers smell nice but I hate bees", experience: 4, cleanliness: 4, prodquality: 5, price: 3, lat: 41.795401, lng: -87.582099},
  { name: "Hyde Park Records", type: "retail store", review: "Girl put your records on, tell me your favorite song", experience: 4, cleanliness: 3, prodquality: 3, price: 1, lat: 41.799235, lng: -87.592076},
  { name: "LavenderPop", type: "retail store", review: "I get all my greeting cards from here", experience: 4, cleanliness: 5, prodquality: 4, price: 2, lat: 41.801103, lng: -87.589947},
  { name: "Cornell Florist", type: "retail store", review: "I come here a lot because my flowers always die", experience: 4, cleanliness: 5, prodquality: 4, price: 3, lat: 41.795084, lng: -87.584907},
  { name: "Regal Mens Fashion", type: "retail store", review: "I am a fashionable man", experience: 3, cleanliness: 4, prodquality: 3, price: 2, lat: 41.780304, lng: -87.605144},
  { name: "GILDA Designer Thrift Boutique", type: "retail store", review: "I get really good finds here", experience: 4, cleanliness: 2, prodquality: 4, price: 1, lat: 41.802323, lng: -87.586883},
  { name: "Kilimanjaro", type: "retail store", review: "Really cool stuff they got", experience: 4, cleanliness: 4, prodquality: 5, price: 4, lat: 41.799344, lng: -87.594722},
];

function Map() {
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCaqLHmoHvFy_t4H3EZiuvHOmcm2nbt0bI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

function Pin(lat, lon, local){
    return (
        {
            lat: lat,
            lon: lon,
            color: local ? 'red' : 'blue',
            descriptor: "",
            addDescription: (str) => {
                this.descriptor = str;
            }
        }
    )
}

export default React.memo(Map)