import React from 'react';
import Card from '../Card/Card';
import './WeekContainer.css';

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=Krasnodar&lang=ru&units=metric&appid=d9f6b7a101b04761494853ca7d77ba4c`;

class WeekContainer extends React.Component {
    state = {
        days: [],
        selectedCity: 'Krasnodar',
        currentLocation: null
    };

    handleCityChange = (event) => {
        this.setState({ selectedCity: event.target.value });
    }

    fetchWeather = () => {
        const newWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(this.state.selectedCity)}&lang=ru&units=metric&appid=d9f6b7a101b04761494853ca7d77ba4c`;
        fetch(newWeatherURL)
            .then(res => {
                if(!res.ok) {
                    throw new Error(`Http error! Status: &{res.status}`);
                }
            return res.json();
        })
            .then(data => {
            if (data && data.list) {
                const dailyData = data.list.filter(reading => reading.dt_txt && reading.dt_txt.includes("12:00:00"));
                this.setState({days: dailyData});
            } else {
                console.error("Ошибка при обновлении погоды: некорректный ответ от сервера", data);
            }
        })
            .catch(error => {
                console.error("Ошибка при обновлении погоды:", error);
            });
    }
    componentDidMount () {
        this.getLocation();
        this.fetchWeather();
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Latitude:', position.coords.latitude);
                    console.log('Longitude:', position.coords.longitude);
                    this.setState({
                        currentLocation: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    });
                    },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    formatCards = () => {
        return this.state.days.map((day, index) =>
            <Card day={day} key={index}/>)
    }

    render() {
        return (
            <div className="week-container">
            <h1 className="display-4 jumbotron">Прогноз погоды на 5 дней</h1>
            <div>
                <label htmlFor="citySelect">Выберите город: </label>
                <select
                    id="citySelect"
                    value={this.state.selectedCity}
                    onChange={this.handleCityChange}
                >
                    <option value="Krasnodar">Краснодар</option>
                    <option value="Moscow">Москва</option>
                    <option value="Saint Petersburg">Санкт-Петербург</option>
                    <option value="Kazan">Казань</option>
                    <option value="Novosibirsk">Новосибирск</option>
                </select>
                <button onClick={this.fetchWeather.bind(this)}>Обновить</button>
            </div>
                <h5 className="display-4 text-muted">{this.state.selectedCity}</h5>
                <div className="card-container">
                    {this.formatCards()}
                </div>
            </div>

        )
    }
}

export default WeekContainer