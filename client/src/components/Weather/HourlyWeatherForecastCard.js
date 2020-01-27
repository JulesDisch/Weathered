// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';


const getTime = (date) => {
    var TwentyFourHour = date.getHours();
    var hour = date.getHours();
    var min = date.getMinutes();
    var mid = 'pm';
if (min < 10) {
  min = "0" + min;
}
if (hour > 12) {
  hour = hour - 12;
}    
if(hour===0){ 
  hour=12;
}
if(TwentyFourHour < 12) {
    mid = 'am';
 }       
    
    return `${hour}: ${min + mid}`;
};




const HourlyWeatherForecastCard = ({ forecast }) => (
    <div className="hourly-weather-card">
        <small>{getTime(forecast.date)}</small>
        <img className="icon mx-auto" src={forecast.icon} />
        <div className="font-weight-bold">
            {parseInt(forecast.temperature.current)}&deg;
        </div>
        <div className="text-capitalize">
            <small>{forecast.condition}</small>
        </div>
    </div>
);


HourlyWeatherForecastCard.propTypes = {
    forecast: PropTypes.object.isRequired
};


export { HourlyWeatherForecastCard };