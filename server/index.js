const express = require('express');
const cors = require('cors');

const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2');


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const weatherRouter = require("./routes/weather")
app.use("/weathers", weatherRouter) 

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});




// const cors = require('cors');
// app.use(cors());


// // Fetch weather data from OpenWeatherMap
// const getWeatherAndSave = async (city) => {
//   const API_KEY = 'ea55d37a981e193fa1e393437482c8ae';
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     const cityName = data.name;
//     const temperature = data.main.temp;
//     const description = data.weather[0].description;
//     const date = new Date().toISOString().slice(0, 10); // current date

//     const sql = 'INSERT INTO weather_data (city, temperature, description, date) VALUES (?, ?, ?, ?)';
//     db.query(sql, [cityName, temperature, description, date], (err, result) => {
//       if (err) throw err;
//       console.log('Weather data saved:', result.insertId);
//     });

//   } catch (error) {
//     console.error('Error fetching weather:', error.message);
//   }
// };


// // Define GET endpoint
// app.get('/weather', (req, res) => {
//   const city = req.query.city;
//   if (!city) {
//     return res.status(400).json({ error: 'City is required' });
//   }
//   getWeatherAndSave(city, res);
// });




