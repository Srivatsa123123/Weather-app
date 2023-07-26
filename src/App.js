import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import moderateBg from "./assets/moderate.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect } from "react";
import { useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setcity] = useState("Bengaluru");
  const [weather, setweather] = useState(null);
  const [units, setunits] = useState("metric");
  const [bg, setbg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setweather(data);

      //dynamic bg

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setbg(coldBg);
      else setbg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setunits(isCelsius ? "metric" : "imperial");
  };

  const enterKey = (e) => {
    if (e.keyCode === 13) {
      setcity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section-inputs">
              <input
                onKeyDown={enterKey}
                type="text"
                name="city"
                placeholder="Enter
            City...."
              ></input>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
