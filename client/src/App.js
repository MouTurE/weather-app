import './App.css';
import axios from "axios";
import {useEffect, useState, useRef} from "react";

function App() {

  const inputRef = useRef();
  const [debugLine, setDebugLine] = useState(""); 
  const [weatherDataList,setWeatherDataList] = useState([]);
  const [weatherData, setWeatherData] = useState(false);

  // const alIcons = {
  //   "01d" :clear_icon,
  //   "01n" : clear_icon,
  //   "02d" : cloud_icon,
  // }

  const search = async (city) => {

    if (city === "") {
      setDebugLine("No city entered")
      return;
    }

    try {

      setDebugLine("Fetching data...");

      const API_KEY = 'ea55d37a981e193fa1e393437482c8ae';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      const processedData = {
        humidity : data.main.humidity,
        windSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,

      };

      console.log(processedData);
      setWeatherData(processedData);

      const exists = weatherDataList.some(item => item.location === processedData.location);
      
      if (exists) {
        setDebugLine("Fetching Successful!");
        return;
      }
        
      
      axios.post("http://localhost:3001/weathers", processedData);

      setWeatherDataList(prev => [...prev, processedData]);

      setDebugLine("Fetching Successful!");
    }
    catch (error) {
     setDebugLine(error.message);
    }
  }

  // Updates the list according to the database
  useEffect(() => {
    axios.get("http://localhost:3001/weathers").then((response) => {
      setWeatherDataList(response.data)
    });
  }, []);
  



  return (
    <div className="App">
      <h1>Weather App</h1>
      

      <div className='getWeatherData'>
        <input ref={inputRef} type='text' placeholder='Enter City...'/>
        <button onClick={() => search(inputRef.current.value)}>Get City Data</button>
      </div>
      <p className='debugLine'> {debugLine} </p>


      <div className='weatherDisplay'>
           <p> <b>Location:</b> {weatherData.location} </p>
           <p> <b>Humidity:</b> {weatherData != false ? weatherData.humidity + " %" : null}  </p>
           <p> <b>Wind Speed:</b> {weatherData != false ? weatherData.windSpeed + " Km/h" : null}  </p>
           <p> <b>Temperature:</b> {weatherData != false ? weatherData.temperature + " °C":null } </p>
      </div>


      <h2>Saved Data</h2>

     

            <table border={1} cellPadding={5}>

              <thead>
                <tr>
                  <th>Location</th>
                  <th>Temperature</th>
                  <th>Humidty</th>
                  <th>Wind Speed</th>
                </tr>
              </thead>
              <tbody>
                {weatherDataList.map((weatherData, key) => {
                  return(
                    <tr key={key}>
                      <td>{weatherData.location}</td>
                      <td>{weatherData.temperature} °C</td>
                      <td>{weatherData.humidity} %</td>
                      <td>{weatherData.windSpeed} Km/h</td>
                    </tr>
                  )
                }
                )}
              </tbody>
              
            </table>
          
        
      
    </div>
  );
}

export default App;
