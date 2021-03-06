import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeContainer from "./container/HomeContainer";
import SearchContainer from "./container/SearchContainer";
//이것은 pr테스트용 주석입니다.!
function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
              <Route path="/search" component={SearchContainer}/>
              <Route path="/" exact component={HomeContainer}/>
          </Switch>
        </Router>
      </div>
  )
}

export default App;
