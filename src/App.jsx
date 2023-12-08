import { useRef, useState } from "react";
import "./index.css";
import TestMap from "./components/app";
import { useMap } from "react-leaflet";

function App() {
  const ref = useRef()
  // lay vi tri hien tai cua IP

  return (
    <div className="container">
      <button className="btn_location" onClick={() => ref.current.locationUser()}>
        get location
      </button>
      <div className="map">
        <TestMap ref={ref}/>
      </div>
    </div>
  );
}

export default App;
