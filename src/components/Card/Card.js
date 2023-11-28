import React from 'react';
import './Card.css';

class Card extends React.Component {
    render() {
        const ms = this.props.day.dt * 1000;
        const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});
        const weatherIcon = this.props.day.weather[0].icon;
        const imgURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

        return (
            <div className="col-auto">
                <div className="card bg-light">
                    <h3 className="card-title">{weekdayName}</h3>
                    <img src={imgURL} alt={this.props.day.weather[0].description} />
                    <h2>{Math.round(this.props.day.main.temp)} °C</h2>
                    <div className="card-body">
                        <button className="btn btn-dark btn-outline-light">{this.props.day.weather[0].description}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card