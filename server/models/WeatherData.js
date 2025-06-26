module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WeatherData', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    windSpeed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    }
  });
};
