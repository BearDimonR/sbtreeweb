import React from "react";
import style from "./index.module.scss";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const LocationPin = ({ text }) => (
  <div className={style.pin}>
    <Icon name="map pin" size="large" />
    <p>{text}</p>
  </div>
);

const Container = ({ location }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
      defaultCenter={{ lat: location.lat, lng: location.lng }}
      defaultZoom={18}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      />
    </GoogleMapReact>
  );
};

export default Container;
