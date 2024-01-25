import React from 'react';
import './navbar.css'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
   <div className="navbar">
    <div className="row ">
        <div className="col-xl-10 col-lg-10 col-md-8 col-sm-8 col-8">
          <h2>Library</h2>
        </div>
        <div className="col right ">
          <Link className='link' to={'/signup'}>Signup</Link>
          <Link className='link' to={'/login'}>Login</Link>
        </div>
    </div>
   </div>
  );
}

export default Navbar;
