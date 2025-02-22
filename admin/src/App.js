import "./App.css";
import OrdersList from "./components/AdminOrders";
import ProductList from "./components/AdminProductList";
import ProductDetails from "./components/AdminSingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/orders" element={<OrdersList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
