import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ProductGrid from './com/ProductGrid';
// import ProductForm from './com/ProductForm';
// import ProductDashboard from './com/ProductDashboard';
// import ProductUploadForm from './com/ProductUploadForm';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <ProductForm/> */}
    <App/>
    {/* <ProductUploadForm/> */}
    {/* <ProductDashboard/> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
