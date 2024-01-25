import React from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { PiShoppingCartBold } from "react-icons/pi";
function VisitorNav(props) {
  const navigate=useNavigate()

  const handleSearch = (e) => {
    props.setSearchQuery(e.target.value); 
  };
  return (
    <div className="navbar">
    <div className="row ">
        <div className="col-xl-3 col-lg-3  col-md-3 col-sm-8 col-8">
          <h2>Library</h2>
        </div>
        <div className="center col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12 ">
          
            <input type="search" className='form-control 'placeholder='search . . .' onChange={handleSearch}/>
        
        </div>
        <div className="col col-xl-3 col-lg-3  col-md-3 col-sm-8 col-12 right ">
        <PiShoppingCartBold className='cart' onClick={(()=>navigate(`/visitor/cart/${props.id}`))}/>
          <Link className='link' to={'/'}>Logout</Link>
        </div>
    </div>
   </div>
  )
}

export default VisitorNav