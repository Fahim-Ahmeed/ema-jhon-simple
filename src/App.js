import React, { createContext } from 'react';
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
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext =createContext();
function App() {
  
  const [loggedInUser,setloggedInUser]=useState({})
  return (
    
    <UserContext.Provider value={[loggedInUser,setloggedInUser]}>
    <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
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


      
    </Router>
    </UserContext.Provider>

  );
}

export default App;
