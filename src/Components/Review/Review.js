import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';
import Item from '../Review item/Item'
import Cart from'../Cart/Cart';
import  giphy from'../../images/giphy.gif';
const Review = () => {
    const [cart,setCart]=useState([]);
    const [placeOrder,setPlaceOrder]=useState(false);
    const addPlaceOrder=()=>{
      processOrder()
      setCart([]);
      setPlaceOrder(true);
    }
    useEffect(() =>{
        //cart
        const cartview=getDatabaseCart();
        console.log(cartview)
        const cartKey=Object.keys(cartview);
        const countProduct=cartKey.map(key=>{
            const product=fakeData.find(prd=>prd.key===key)
            product.quantity=cartview[key]
            console.log(product.quantity); 
            return product;
        })
        setCart(countProduct)
        },[])
  const removeItem=(key)=>{
     const newCart=cart.filter(pd=>pd.key!=key)
     setCart(newCart)
     removeFromDatabaseCart(key)
  }
  let happyImage;
  if(placeOrder){
    happyImage=<img src={giphy} alt=""/>
  }
    return ( 
      <div className="container">
         <div className="row">
         <div className="col-10">
           {
                cart.map(prd=><Item 
                    key={prd.key}
                    prd={prd}
                    removeItem={removeItem}
                    ></Item>)
            }
            {
              happyImage
            }
           </div>
           <div className="col-2">
              <Cart name={cart}>
          
                <button className="add-button" onClick={addPlaceOrder}><FontAwesomeIcon icon={faShoppingCart} /> place Order</button>
               
              </Cart>
               
           </div>
         </div>
        </div>
    );
};

export default Review;