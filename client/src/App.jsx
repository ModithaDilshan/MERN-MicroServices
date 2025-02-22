import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/HomePage/HomePage";
import Cart from "./Components/CartPage/cartDisplay";
import SignIn from "./Components/Login/login";
import SignUp from "./Components/SignUp/signUp";
import OrdersList from "./Components/OrderPage/OrderPage";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import NavBar from "./Components/Nav/Navbar";
import UserDetail from "./Components/User/User";
import Footer from "./Components/Footer/Footer";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<UserDetail />} />
            <Route path='/products/:id' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<OrdersList />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<SignIn onLogin={handleLogin} />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/*' element={<Navigate to='/login' />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
