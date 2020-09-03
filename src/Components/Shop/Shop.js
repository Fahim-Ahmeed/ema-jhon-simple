import React, { useEffect, useState } from 'react';
import fakeData from'../../fakeData';
import './Shop.css';
import Product from'../Product/Product'
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    
    const item=fakeData.slice(0,10);
    const[count,setCount]=useState(item);
    const[cart,setCart]=useState([])
    useEffect(()=>{
        const localData=getDatabaseCart()
        console.log(localData);
        const localKey=Object.keys(localData);
        console.log(localKey);
        const item=localKey.map(existingKey=>{
            const product=fakeData.find(pd=>pd.key===existingKey)
            product.quantity=localData[existingKey];
            return product;
        })
        setCart(item);
    },[])

    const hanldleAddProduct=(per)=>{
        // const added=[...cart,per];
    
        const addedKey=per.key;
        const updateProduct=cart.find(pd=>pd.key===addedKey);
        
       let count=1;
       let added;
        if(updateProduct){
            count=updateProduct.quantity+1;
            updateProduct.quantity=count;
            console.log(updateProduct);
            let others=cart.filter(pd=>pd.key!==addedKey);
            added=[...others,updateProduct];
        }
        else{
            per.quantity=1;
            added=[...cart,per];
        }
        // const count=updateProduct.length;
        setCart(added);
       
        // const updateProduct=added.filter(pd=>pd.key===per.key);
        // const count=updateProduct.length;
        
        addToDatabaseCart(per.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
               {count.map(pd=><Product 
               handle={hanldleAddProduct}
               name={pd}
               addToCart={true}
               key={pd.key}
               >
               </Product>)}
            </div>
            <div className="cart-container">
                <Cart name={cart}>
                <Link to="/review">
                <button className="add-button"><FontAwesomeIcon icon={faShoppingCart} />  Review Order</button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;