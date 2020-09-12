import React, { useState } from 'react';
// import logo from './logo.svg';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

function Login() {
  const[newUser,setNewUser] =useState(false)
  const[user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error:'',
    success:false
  })
  const[loggedInUser,setloggedInUser] =useContext(UserContext)

  const provider = new firebase.auth.GoogleAuthProvider();
  const history=useHistory()
  const location=useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {

        const { displayName, email, photoURL } = res.user;
        const loggedInUser={
          isSignedIn:true,
          name:displayName,
          email:email,
          photo:photoURL
        }
        setUser(loggedInUser);
        // setloggedInUser(loggedInUser);
        console.log(displayName, email, photoURL);
      })
    .catch(error=>{
      console.log(error)
    })
  }
  const handleSignOut=()=>{
    firebase.auth().signOut()
    .then(

    )
    .catch(error=>{
      console.log(error)
    })
    const signOutUser={
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    
    }
    setUser(signOutUser)
  }
  const handleBlur=(event) => {
    console.log(event.target.name,event.target.value)
    let isFormValid=true;
    if(event.target.name === 'email'){
      const isEmailValid=/\S+@\S+\.\S+/.test(event.target.value);
      isFormValid=isEmailValid
      // console.log(isEmailValid)
    }
    if(event.target.name === 'password'){
     const isPasswordValid =event.target.value.length>6;
     const passwordHasNumber=/\d{1}/.test(event.target.value)
     isFormValid=isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo={...user}
     newUserInfo[event.target.name]=event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit=(event)=>{
    if( newUser && user.email && user.password){ 
      firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        const newUserInfo={...user}
        newUserInfo.success=true;
        newUserInfo.error='';
        setUser(newUserInfo)
        setUserName(user.name)

        
      })
      .catch(error=>{
        // Handle Errors here.
        const newUserInfo={...user}
        newUserInfo.success=false
        newUserInfo.error=error.message;

        // ...
        console.error(error.code,error.message)
        setUser(newUserInfo)
        
      })
     
    }
    if(user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        const newUserInfo={...user}
        newUserInfo.success=true;
        newUserInfo.error='';
        setUser(newUserInfo)
        setloggedInUser(newUserInfo)
        history.replace(from);
        console.log('sign in user info',res.user)
      })
      .catch(error=> {
        // Handle Errors here.
        const newUserInfo={...user}
        newUserInfo.success=false
        newUserInfo.error=error.message;

        // ...
        console.error(error.code,error.message)
        setUser(newUserInfo)
      });
    }
    event.preventDefault();
  }
  const setUserName=name=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName:name
    }).then(function() {
      console.log('displayName set')
      // Update successful.
    }).catch(function(error) {
      console.log(error)
      // An error happened.
    });
  }
  return (
    <div  style={{textAlign: 'center'}}>
      {
        user.isSignedIn?<button onClick={handleSignOut}>sign out</button>:<button onClick={handleSignIn}>sign in</button>
      }
      

      {
        user.isSignedIn && <div>
          <p>welcome{user.name}</p>
      <p>{user.email}</p>
      <img style={{width:'50px'}} src={user.photo} alt=""/>
        </div> 
    
      }
      <br/>
   
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="chekbox" onChange={()=>setNewUser(!newUser)} id=""/>
        <label htmlfor="chekbox">new user</label>
        <br/>
        {
          newUser && <input type="text" name="name" placeholder="Your name" onBlur={handleBlur}  id="" required />
        }
        <br/>
        <input type="text" name="email" placeholder="your email address" onBlur={handleBlur} required />
        <br/>
        <input type="password" name="password" placeholder="your password" required onBlur={handleBlur} required />
        <br/>
        <input type="submit" value={newUser?'sign up':'sign in'} />
      </form>
      {/* <p style={{color:'red'}}>{user.error}</p> */}
       {
        user.success?<p style={{color:'green'}}>user   {newUser ? 'created':'logged in'} successfully</p>: <p style={{color:'red'}}>{user.error}</p>
      } 
    </div>
  );
}

export default Login;
// user.error ?:<p style={{color:'green'}}>user created successfully</p>