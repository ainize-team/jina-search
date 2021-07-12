import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeContainer from "./container/HomeContainer";
//이것은 pr테스트용 주석입니다.!
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
