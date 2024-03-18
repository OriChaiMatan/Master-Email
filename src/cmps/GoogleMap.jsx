import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import markerIcon from '../assets/imgs/marker.png';

const AnyReactComponent = ({ marker }) => (
  <div>
    <img src={marker} alt="My Marker" style={{ width: '15px' }} />
  </div>
)

export function GoogleMap(){
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array to run only once on component mount

  const defaultCenter = userLocation ? userLocation : { lat: 10.99835602, lng: 77.01502627 }

  return (
    // Important! Always set the container height explicitly
    <div className="map">
      {userLocation && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "YOUR_API_KEY" }} 
          defaultCenter={defaultCenter}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={userLocation.lat}
            lng={userLocation.lng}
            marker={markerIcon}
          />
        </GoogleMapReact>
      )}
    </div>
  )
}





