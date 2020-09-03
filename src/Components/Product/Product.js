import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.name;   
    return (
        <div className="product">
            <div className="product-picture">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h4><Link to={'/product/'+ key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <br />
                <p>${price}</p>
                <small>only {stock} left in stock - order soon</small>
                <br />
                <br />
                {  props.addToCart===true && <button
                 className="add-button" 
                 onClick={() => props.handle(props.name)}
                 > <FontAwesomeIcon icon={faShoppingCart} />add to cart
                 </button>}
            </div>
        </div>
    );
};

export default Product;