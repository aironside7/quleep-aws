import React, { useState } from "react";

import axios from "axios";

function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const { files } = event.target;
    setImageFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("currency", productData.currency);

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProductData({
        name: "",
        description: "",
        price: "",
        currency: "",
        images: [],
      });
      setImageFiles([]);
      alert("Product uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Error uploading product.");
    }
  };

  return (
    <div>
      <h2>Product Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Currency:</label>
          <select
            name="currency"
            value={productData.currency}
            onChange={handleInputChange}
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileInputChange}
          />
        </div>
        <div>
          <button type="submit">Upload Product</button>
        </div>
      </form>
    </div>
  );
}

  export default ProductForm