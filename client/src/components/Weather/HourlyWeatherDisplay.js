// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// IMPORT PROJECT REFERENCES
import { HourlyWeatherForecastCard } from './HourlyWeatherForecastCard';





class HourlyWeatherDisplay extends Component {
    render(){
        return (
            <div className="hourly-weather-display">
                <div className="text-center h5 pt-2">Hourly</div>
                <div className="carousel">
                  
                        {
                            !!this.props.hourlyForecasts && this.props.hourlyForecasts.map((fc, i) => (
                                <HourlyWeatherForecastCard key={i} forecast={fc} />
                            ))
                        }
                   
                </div>
                
            </div>
        );
    }
}

HourlyWeatherDisplay.propTypes = {
    hourlyForecasts: PropTypes.array.isRequired
};

export { HourlyWeatherDisplay };