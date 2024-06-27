import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="topnav">
      <a className="active" href="#home">Home</a>
      <a href="#news">Vision</a>
      <a href="#contact">Contact Us</a>
      <a href="frontend.html">About</a>
    </div>
  );
}

export default Navbar;
