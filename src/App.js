import React, { Component } from 'react';
import './styles/App.css';
import WeekContainer from './components/WeekContainer/WeekContainer';

class App extends Component {
    render(){
        return (
            <div className="App">
                < WeekContainer />
            </div>
        );
    }
}

export default App;