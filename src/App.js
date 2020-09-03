import React from 'react';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Manage from './Components/Manage/Manage';
import Invalid from './Components/Invalid/Invalid';
import Details from './Components/Details/Details';
function App() {
  return (

    <Router>
      <Header></Header>
      <div className="App">
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/product/:productKey">
            <Details>
            </Details>
          </Route>
          <Route path="*">
            <Invalid></Invalid>
          </Route>


        </Switch>


      </div>
    </Router>

  );
}

export default App;
