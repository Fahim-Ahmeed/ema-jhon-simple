import React from 'react';
import'./Cart.css';


const Cart = (props) => {
  const cartInfo=props.name;
  console.log(props.name)
  let totalPrice=cartInfo.reduce((total,pro)=>total+pro.price*pro.quantity,0);
  const productPrice=totalPrice.toFixed(2);
//  console.log(totalPrice); 
  let shipping=0;
  if(totalPrice>35){
      shipping=0;
  }
  else if(totalPrice>15){
        shipping=4.99
  }
  else if(totalPrice>0)
        shipping=12.99
        totalPrice=totalPrice+shipping;
        let tax=totalPrice/10;
        tax=tax.toExponential(2);
        tax=parseFloat(tax);
        totalPrice=totalPrice+tax;
    return (
        <div className="cart-area">
            <h6 style={{margin:'auto',display:'block'}}>Order Summary</h6>
            <p>items orderd:{cartInfo.length}</p>
    <p> <small>shipping cost:{shipping}</small></p>
    <p><small>product price:{productPrice}</small> </p>
    <p><small>tax+vat:{tax}</small> </p>
    <p>total price{totalPrice.toFixed(2)}</p>
    
        {props.children}
        </div>
    );
};

export default Cart;