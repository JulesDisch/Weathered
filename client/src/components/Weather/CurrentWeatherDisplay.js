// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';


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
if(hour ==0){ 
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
            <div className="weather-location">{weather.location.name}</div>
            <div className="weather-min-max-temp">{weather.temperature.maximum}&deg; | {weather.temperature.minimum}&deg;</div>
            <div className="weather-current">                
                <span className="weather-temp">{parseInt(weather.temperature.current)} &deg;&nbsp;<sup>F</sup></span>
            </div>
            <div className="weather-condition">
                <img className="weather-icon" src={weather.icon} />
                <span className="weather-description">{weather.condition}</span>
            </div>            
            <div className="weather-update">Updated as of {getUpdateTime(weather.date)}</div>
            <button className="refresh fa fa-refresh fa-3x" onClick={props.onRefresh}>refresh</button>
        </div>
    );
};


CurrentWeatherDisplay.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired
};


export { CurrentWeatherDisplay };