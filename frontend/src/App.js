import React, { useEffect, useState } from "react";
import { GoogleMaps, FirstMenu } from "./components";
import logo from "./logo.svg";
import { fetchPins } from "./api";
import "./App.css";
import "./style.css"

function App() {
  const [pins, setPins] = useState(null);

  useEffect(() => {
    fetchPins().then((res) => {
      setPins(res.data);
    });
  }, []);


  return (
    <div className="App">
      <FirstMenu />
      <GoogleMaps pins={pins} />
    </div>
  );
}

export default App;
