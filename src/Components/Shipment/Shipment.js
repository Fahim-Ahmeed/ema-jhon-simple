import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import {UserContext}from'../../App'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const[loggedInUser,setloggedInUser]=useContext(UserContext);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
     
      <form className="shipment" onSubmit={handleSubmit(onSubmit)}>

        
     
        <input name="name"defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span className="error">name field is required</span>}
        <input name="email"defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span className="error">email field is required</span>}
        <input name="cell" ref={register({ required: true })} />
        {errors.cell && <span className="error">cell field is required</span>}
        <input name="location" ref={register({ required: true })} />
        {errors.location && <span className="error">location field is required</span>}
        
        
        
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;