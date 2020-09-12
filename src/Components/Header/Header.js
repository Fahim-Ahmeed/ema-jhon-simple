import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from'../../images/logo.png';
import './Header.css';
import {UserContext}from'../../App';
const Header = () => {
    const[loggedInUser,setloggedInUser]=useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
          
          <Link to="/shop">Shop</Link>
          <Link to="/review">Order Review</Link>
          <Link to="/manage">Manage Inventory Here</Link>
        
        
          {
              loggedInUser.email?<button onClick={()=>setloggedInUser({})}>Sign Out</button>:<Link to="/login"><button >Sign In</button></Link>
          }
        </nav>
        
        </div>
    );
};

export default Header;