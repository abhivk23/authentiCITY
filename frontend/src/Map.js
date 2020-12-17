import React from 'react'
import { GoogleMap, LoadScript , Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '1600px',
  height: '800px'
};

const center_demo = {
  lat: 41.795,
  lng: -87.5917
};

// name: string, category: string (restaurant, retail store), 
// review: string, ratings: dictionary (criteria : ), latitude: int, longitude: int


function Map(props) {
  /*const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])*/
  const [selected, setSelected] = React.useState({});

  const onSelect = item => {
    setSelected(item);
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCaqLHmoHvFy_t4H3EZiuvHOmcm2nbt0bI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center_demo}
        zoom={14}
        /*onLoad={onLoad}
        onUnmount={onUnmount}*/
      >
        {
          props.pins.map(item => {
            return(
            <Marker 
              key={item.name}
              position={{lat: item.lat, lng: item.lng}} 
              onClick={() => onSelect(item)}
              />
            )
          })
        }
        {
          selected.location &&
          (
            <InfoWindow
              poisition={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>selected.name</p>
            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}
/*
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
}*/

export default React.memo(Map)