import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeContainer from "./container/HomeContainer";

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={HomeContainer}/>
          </Switch>
        </Router>
      </div>
  )
}

export default App;
