import React, { useState , useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Fetch products from server on component mount
      axios.get('http://localhost:5000/products')
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    }, []);
  
    return (
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.currency}</p>
            {/* {product.images.map((image, index) => (
  <img key={index} src={image} alt={product.name} />
))} */}    <ImageGallery product={product} />

            
            {/* <img src={(product.images[0])} alt={product.name} /> */}
          </div>
        ))}
      </div>
    );
}

export default ProductDashboard
