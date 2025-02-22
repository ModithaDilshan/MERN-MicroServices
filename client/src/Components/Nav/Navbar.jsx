import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = ({ onLogout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login"; 
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          iHerb
        </Link>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <Link to='/' className='navbar-item'>
            Home
          </Link>
      
          <Link to='/order' className='navbar-item'>
            Orders
          </Link>
          <Link to='/cart' className='navbar-item'>
            Cart
          </Link>
          <Link to='/user' className='navbar-item'>
            Account
          </Link>
        </div>
        <div className='navbar-search'>
          <input
            type='text'
            placeholder='Search product name'
            value={searchTerm}
            onChange={handleSearch}
          />
          {/* Add your search logic here */}
        </div>
        <div className='navbar-logout'>
          <button className='logout-button' onClick={handleLogout}>
            Logout
          </button>
        </div>
        <button className='navbar-toggle' onClick={toggleMenu}>
          <span className='navbar-toggle-icon'></span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
