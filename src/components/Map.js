import React from "react";
import GoogleMapReact from "google-map-react";
import pin from "./pin.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)"
};

export default function SimpleMap(){
    const [defaultProps,setDefaultProps]=useState({
        center: {
          lat: 60.192059,
          lng: 24.945831
        },
        zoom: 11
      })
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyBJmxPJ8Ig1CMJ-99jn8LtijRgtQ_o8AXo'
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {/* {this.props.locations.map(item => {
                if (item.address.length !== 0) {
                  return item.address.map(i => {
                    return (
                      <Link to={"/" + item.name} key={i.id} lat={i.lat} lng={i.lng}>
                        <img style={markerStyle} src={pin} alt="pin" />
                      </Link>
                    );
                  });
                }
              })} */}
            </GoogleMapReact>
          </div>
        );
    
}
