// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";


const getUpdateTime = (date) => {
    var TwentyFourHour = date.getHours().toString().padStart(2, '0');
    var hour = date.getHours().toString().padStart(2, '0');
    var minute = date.getMinutes().toString().padEnd(2);
    var mid = 'pm';
if (minute < 10) {
  minute = "0" + minute;
}
if (hour > 12) {
  hour = hour - 12;
}    
if(hour === '00'){ 
  hour=12;
}
if(TwentyFourHour < 12) {
   mid = 'am';
}     
    return `${hour}:${minute} ${mid}`;
};

const CurrentWeatherDisplay = (props) => {
    
    const { weather } = props;
    
    return (
        <div className="current-weather-display" style={{position: 'relative'}}>
            <h2 style={{ height: 90, fontSize: 70, clear: "both",  textAlign: "center" }}
            className="weather-location">{weather.location.name}</h2>
           
            <div style={{ height: 70, fontSize: 40, clear: "both",  textAlign: "center" }} className="weather-current">                
                <span className="weather-temp"> Currently: {parseInt(weather.temperature.current)} &deg;&nbsp;<sup>F</sup></span> and feels like:  
            {parseInt(weather.temperature.feel)}&deg;&nbsp;<sup>F</sup>
            </div>
            <div style={{ height: 75, fontSize: 40, clear: "both",  textAlign: "center" }} className="weather-condition">
                <img className="weather-icon" src={weather.icon} alt="weather card"/>
                <span className="weather-description">{weather.condition}</span>
            </div>  
            <div style={{ height: 50, fontSize: 30, clear: "both",  textAlign: "center" }} className="weather-min-max-temp">
                High:  
                {parseInt(weather.temperature.maximum)}&deg;&nbsp;<sup>F</sup> | Low: {parseInt(weather.temperature.minimum)}&deg;&nbsp;<sup>F</sup>
            </div>          
            <div className="weather-update">Updated as of {getUpdateTime(weather.date)}   <button className="refresh fa fa-refresh fa-3x" onClick={props.onRefresh}></button>
            </div>
          
        </div>
    );
};


CurrentWeatherDisplay.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired
};


export { CurrentWeatherDisplay };