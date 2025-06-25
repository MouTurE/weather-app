const axios = require('axios');
const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aguscuk453', 
  database: 'weather_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Fetch weather data from OpenWeatherMap
const getWeatherAndSave = async (city) => {
  const API_KEY = 'ea55d37a981e193fa1e393437482c8ae';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const date = new Date().toISOString().slice(0, 10); // current date

    const sql = 'INSERT INTO weather_data (city, temperature, description, date) VALUES (?, ?, ?, ?)';
    db.query(sql, [cityName, temperature, description, date], (err, result) => {
      if (err) throw err;
      console.log('Weather data saved:', result.insertId);
    });

  } catch (error) {
    console.error('Error fetching weather:', error.message);
  }
};

// Call the function
getWeatherAndSave('Istanbul');
