import axios from 'axios';

const OPEN_WEATHER_BASE_URL = 'https://pro.openweathermap.org/data/2.5';
// const OPEN_WEATHER_API_KEY = `${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`



const OPEN_WEATHER_IMG_URL = 'http://openweathermap.org/img/w';


const getWeather = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    const { main, icon } = response.data.weather[0];
                    const { temp, temp_min, temp_max, feels_like } = response.data.main;
                    const { lon, lat } = response.data.coord;
                    const { dt, name } = response.data;
                    resolve({
                        condition: main,
                        date: new Date(dt * 1000),
                        icon: `${OPEN_WEATHER_IMG_URL}/${icon}.png`,
                        location: {
                            name: name,
                            latitude: lat,
                            longitude: lon
                        },
                        temperature: {
                            current: temp,
                            minimum: temp_min,
                            maximum: temp_max,
                            feel: feels_like,
                        }
                    });
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};


const getDailyWeather = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {

                    const location = {
                        name: response.data.city.name,
                        latitude: response.data.city.coord.lat,
                        longitude: response.data.city.coord.lon
                    };

                    const dailyForecasts = response.data.list.map(fc => {
                        return {
                            condition: fc.weather[0].description,
                            date: new Date(fc.dt * 1000),
                            icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
                            location: location,
                            temperature: {
                                minimum: fc.temp.min,
                                maximum: fc.temp.max,
                                feel: fc.feels_like.day,
                            }
                        };
                    });

                    resolve(dailyForecasts);
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};


const getHourlyWeather = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {

                    const location = {
                        name: response.data.city.name,
                        latitude: response.data.city.coord.lat,
                        longitude: response.data.city.coord.lon
                    };

                    const hourlyForecasts = response.data.list.map(fc => {
                        return {
                            condition: fc.weather[0].description,
                            date: new Date(fc.dt * 1000),
                            icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
                            location: location,
                            temperature: {
                                current: fc.main.temp,
                                feel: fc.main.feels_like
                            }
                        };
                    });

                    resolve(hourlyForecasts);
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};

class WeatherService {

    getCurrentWeatherByPosition({ latitude, longitude }) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=imperial`;
        console.log(url)

        return getWeather(url);
    }


    getDailyWeatherByPosition({ latitude, longitude }) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/forecast/daily?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=imperial&cnt=7`;

        return getDailyWeather(url);
    }


    getHourlyWeatherByPosition({ latitude, longitude }) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial&cnt=12`;

        return getHourlyWeather(url);
    }
}

export { WeatherService };