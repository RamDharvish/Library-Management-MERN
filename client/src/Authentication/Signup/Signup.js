import React, { useState } from 'react'
import Nav from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const handleSignup=(e)=> {
    e.preventDefault()
    axios.post("http://localhost:5000/signup",{name,email,password})
    .then(res => {
      alert("signup successfully")
      navigate('/login')
    })
    .catch(err =>console.log(err))
  }
  return (
    <div>
      <Nav/>
      <div className="signup bg-primary vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white p-3">
            <h3>Signup</h3>
            <form onSubmit={handleSignup}>
              <div className="mt-2">
                <label>Name</label>
                <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>

              <div className="mt-2">
                <label>Email</label>
                <input type="email" className='form-control' onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="mt-2">
                <label>Password</label>
                <input type="password" className='form-control' onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button type='submit' className='btn btn-success form-control mt-3'>Signup</button>
            </form>
      </div>

      </div>
    </div>
  )
}

export default Signup