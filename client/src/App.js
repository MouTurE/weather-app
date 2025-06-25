import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

  const [weatherDataList,setWeatherDataList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/weathers").then((response) => {
      setWeatherDataList(response.data)
    });
  }, []);
  

  return (
    <div className="App">
      <h1>Weather App</h1>
      
      <div className='getWeatherData'>
        <input type='text' placeholder='Enter City...'/>
        <button>Get City Data</button>
      </div>
      <h2>Saved Data</h2>
      {weatherDataList.map((weatherData, key) => {
          return (

            <table border={1} cellPadding={5} key={key}>

              <thead>
                <tr>
                  <th>City Name</th>
                  <th>Temperature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{weatherData.city}</td>
                  <td>{weatherData.temperature}</td>
                  <td>{weatherData.description}</td>
                </tr>
              </tbody>
              
            </table>
        );
      })}
    </div>
  );
}

export default App;
