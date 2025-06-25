const express = require ("express");
const router = express.Router();
const {WeatherData} = require("../models");


router.get("/", async (req,res) => {
    const weatherDataList = await WeatherData.findAll();
    res.json(weatherDataList);
});



router.post("/", async (req,res) => {
    const weather = req.body;

    // Adds to database
    await WeatherData.create(weather);
    res.json(weather); // Response debug
});



module.exports = router