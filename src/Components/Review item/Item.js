import React from 'react';
import './Item.css';

const Item = (props) => {
    console.log(props.prd)
    const { name, quantity, price, seller, img ,key} = props.prd
    return (
        <div className="container shadow-lg p-3 mb-5 bg-white rounded">
            <div className="row">
                
                <div className="col-2 col-md-2 img">
                    <img src={img} alt="" />

                </div>
                <div className="col-6 col-md-8 info">
                    <p>{name}</p>
                    <h4>Quantity:{quantity}</h4>
                    <p>price{price}</p> 
                    <button className="btn btn-danger" onClick={()=>props.removeItem(key)}>remove item</button>
                </div>
            </div>
        </div>
    );
};

export default Item;