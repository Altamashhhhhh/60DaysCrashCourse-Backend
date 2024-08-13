import React from 'react';
import { Link } from 'react-router-dom'; // Correct import

const Navbar = () => {
  return (
    <div>
      <Link to="/" >HOME</Link>
      <Link to="/login" >LOGIN</Link>
      <Link to="/register" >REGISTER</Link>
    </div>
  );
}

export default Navbar;
