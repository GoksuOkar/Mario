import React from "react";
import { API_KEY } from "../../config";

export default function EventMap({ address }) {
  //get address in correct format "City Hall, New York, NY" to City+Hall,New+York,NY,
  address = address || "5020 Mindora Dr, Torrance, Ca, United States";
  address = address.split(",");
  let paramAddress = [];
  for (let i = 0; i < address.length; i++) {
    let split = address[i].split(" ");
    if (i > 0) {
      split.splice(0, 1);
    }
    if (split.length > 1) {
      split = [split.join("+")];
    }
    paramAddress.push(split);
  }
  paramAddress = paramAddress.join(",");
  paramAddress = `q=${paramAddress}`;
  const src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&${paramAddress}`;

  return (
    <iframe
      title="map"
      width="450"
      height="250"
      frameBorder="0"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      allowFullScreen
    ></iframe>
  );
};
