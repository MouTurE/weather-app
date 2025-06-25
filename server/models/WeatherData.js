module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WeatherData', {
    city: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY
  });
};
