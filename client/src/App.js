// import { BrowserRouter as Routes, Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import ProductForm from './com/ProductForm';
import ProductDashboard from './com/ProductDashboard';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Product Form</Link>
            </li>
            <li>
              <Link to="/products">Product Grid</Link>
            </li>
          </ul>
        </nav>
        </div>
        {/* <Route exact path={"/"} element={<Home />} /> */}
     <Routes>
        <Route exact path={"/"} element={<ProductForm/>} />
        <Route path={"/products"} element={<ProductDashboard/>} />
      
    </Routes>
    </BrowserRouter>
    
  );
}
export default App