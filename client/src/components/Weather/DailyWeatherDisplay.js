// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./style.css";


// IMPORT PROJECT REFERENCES
import { DailyWeatherForecastCard } from './DailyWeatherForecastCard';

class DailyWeatherDisplay extends Component {

   

    render() {
        return (
            <div className="daily-weather-display">
                <div className="text-center h3 pt-2">Daily</div>
                <div   >
                    {
                        !!this.props.dailyForecasts && this.props.dailyForecasts.map((fc, i) => (
                            <DailyWeatherForecastCard forecast={fc} key={i} />
                        ))
                    }
                </div>


            </div>
        );
    }
}


DailyWeatherDisplay.propTypes = {
    dailyForecasts: PropTypes.array.isRequired
};


export { DailyWeatherDisplay };