import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import routes from './routes';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">

          <Nav />

          {routes}

        </div>
      </Router>
    );
  }
}

export default App;
