import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PersonPinIcon from '@material-ui/icons/PersonPin';

function GoogleMap({ address }) {
  console.log('GOOGLE MAP PROPS---', address);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const defaultProps = {
    center: {
      lat: lat || -34,
      lng: lng || 151
    }
  }

  const handleApiLoaded = (map, maps) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address })
      .then((res) => {
        // full response results
        console.log('results:', res.results);

        // formatted address from results
        console.log('formatted address:', res.results[0].formatted_address);

        // geometry (lat & lng)
        setLat(res.results[0].geometry.location.lat());
        setLng(res.results[0].geometry.location.lng());
      })
    }

    return (
      
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyDZkWH1iCFk_OIZesteRw5Ix0kc7rmYl1k'}}
          center={defaultProps.center}
          zoom={14}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <PersonPinIcon
            lat={lat || defaultProps.center.lat}
            lng={lng || defaultProps.center.lng}
            color="secondary"
          />
        </GoogleMapReact>
      </div>
    );
  }

export default GoogleMap;
