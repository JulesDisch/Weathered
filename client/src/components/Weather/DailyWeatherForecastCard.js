// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';


const weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tue';
weekday[3] = 'Wed';
weekday[4] = 'Thu';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

const month = new Array(12);
month[0] = 'Jan';
month[1] = 'Feb';
month[2] = 'Mar';
month[3] = 'Apr';
month[4] = 'May';
month[5] = 'Jun';
month[6] = 'Jul';
month[7] = 'Aug';
month[8] = 'Sep';
month[9] = 'Oct';
month[10] = 'Nov';
month[11] = 'Dec';


const getDate = (date) => {
    return `${weekday[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}`;
};


const DailyWeatherForecastCard = ({ forecast }) => (
    <div style={{ padding: 20 }}  className="daily-weather-card">
        <small>{getDate(forecast.date)}</small>
        <img className="icon mx-auto" src={forecast.icon} alt="weather card" />
        <div className="text-capitalize">
            <small>{forecast.condition}</small>
        <div className="font-weight-bold">
           {parseInt(forecast.temperature.maximum)}&deg;
            &nbsp;<small>{parseInt(forecast.temperature.minimum)}&deg;</small>
            <br></br></div>
            <div >
          Will feel like:  {parseInt(forecast.temperature.feel)}&deg;
        </div>
       
        </div>
    </div>
);


DailyWeatherForecastCard.propTypes = {
    forecast: PropTypes.object.isRequired
};


export { DailyWeatherForecastCard };