import React, { useState } from "react";
import "./Image.css";

function ImageGallery({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleSlide(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= product.images.length) {
      return;
    }
    setCurrentIndex(newIndex);
    console.log(currentIndex)
  }

  return (
    <div className="image-gallery">
      {product.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={product.name}
          style={{ "--index": index - currentIndex }}
          
        />
        
      ))}
      
      
      <button onClick={() => handleSlide(-1)}>Previous</button>
      
      <button onClick={() => handleSlide(1)}>Next</button>
    </div>
  );
}

export default ImageGallery;
