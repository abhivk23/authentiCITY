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
  ["Bob's Burgers", "restaurant", "Super yummy place!", { experience: 3, cleanliness: 3, prodquality: 3, price: 2 }, ],
  ["Krusty Krab", "restaurant", "Love the burgers", { experience: 4, cleanliness: 2, prodquality: 5, price: 1 }, ],
  ["Shinju Sushi", "restaurant", "It's sushi, I like sushi", { experience: 2, cleanliness: 4, prodquality: 3, price: 2 }, 41.799099, -87.592117],
  ["Valois Restaurant", "restaurant", "Fast breakfast, good diner", { experience: 4, cleanliness: 4, prodquality: 3, price: 1 }, 41.799750, -87.588320],
  ["Salonica Restaurant", "restaurant", "Love the breakfast food", { experience: 4, cleanliness: 4, prodquality: 4, price: 1 }, 41.791670, -87.590100],
  ["Piccolo Mondo", "restaurant", "Not old enough to drink here :(", { experience: 2, cleanliness: 3, prodquality: 3, price: 2 }, 41.793763, -87.584649],
  ["Medici on 57th", "restaurant", "Forgot my prosciutto in my sandwich, gave it to me in a plate", { experience: 2, cleanliness: 3, prodquality: 4, price: 3 }, 41.791274, -87.593741],
  ["The Nile of Hyde Park", "restaurant", "Really close to North dorms", { experience: 3, cleanliness: 3, prodquality: 3, price: 3 }, 41.795179, -87.59715],
  ["Leon's Chicago Best", "restaurant", "Good ole American food", { experience: 4, cleanliness: 4, prodquality: 3, price: 2 }, 41.780713, -87.58111],
  ["Café 53", "restaurant", "It's a café", { experience: 4, cleanliness: 4, prodquality: 3, price: 2 }, 41.79928, -87.592385],
  ["The Silver Room", "retail store", "It wasn't silver", { experience: 4, cleanliness: 4, prodquality: 4, price: 3 }, 41.799658, -87.588773],
  ["Powell's Books Chicago", "retail store", "I don't read but I like books", { experience: 5, cleanliness: 5, prodquality: 5, price: 2 }, 41.791344, -87.588893],
  ["First Aid Comics", "retail store", "Comics are cool, sometimes funny", { experience: 5, cleanliness: 5, prodquality: 5, price: 2 }, 41.795086, -87.585935],
  ["Hyde Park Florist", "retail store", "Flowers smell nice but I hate bees", { experience: 4, cleanliness: 4, prodquality: 5, price: 3 }, 41.795401, -87.582099],
  ["Hyde Park Records", "retail store", "Girl put your records on, tell me your favorite song", { experience: 4, cleanliness: 3, prodquality: 3, price: 1 }, 41.799235, -87.592076],
  ["LavenderPop", "retail store", "I get all my greeting cards from here", { experience: 4, cleanliness: 5, prodquality: 4, price: 2 }, 41.801103, -87.589947],
  ["Cornell Florist", "retail store", "I come here a lot because my flowers always die", { experience: 4, cleanliness: 5, prodquality: 4, price: 3 }, 41.795084, -87.584907],
  ["Regal Mens Fashion", "retail store", "I am a fashionable man", { experience: 3, cleanliness: 4, prodquality: 3, price: 2 }, 41.780304, -87.605144],
  ["GILDA Designer Thrift Boutique", "retail store", "I get really good finds here", { experience: 4, cleanliness: 2, prodquality: 4, price: 1 }, 41.802323, -87.586883],
  ["Kilimanjaro", "retail store", "Really cool stuff they got", { experience: 4, cleanliness: 4, prodquality: 5, price: 4 }, 41.799344, -87.594722],
  
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