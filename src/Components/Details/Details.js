import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Details = () => {
    const {productKey}=useParams();
    const product=fakeData.find(pd=>pd.key===productKey);
    console.log(product);
    return (
        <div>
            <h2>{productKey}product details</h2>
            <Product
             name={product}
             addToCart={false}
             >
             </Product>
        </div>
    );
};

export default Details;