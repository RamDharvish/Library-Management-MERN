import React, { useState } from 'react'
import Nav from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email,setEmail]=useState()
  const [password,setpassword]=useState()
  const navigate=useNavigate()

  axios.defaults.withCredentials=true
  const handleSubmit=(e)=> {
    e.preventDefault()
    axios.post("http://localhost:5000/login",{email,password})
    .then(res => {
     if(res.data.status==="success") {
      if(res.data.role==="admin") {
           navigate('/admin')
      }else {
        const userId=res.data.id
        console.log(userId)
              navigate('/visitor/'+userId)
      }
     }
     
    })
    .catch(err =>console.log(err))
  }
  return (
    <div>
      <Nav/>
      <div className="signup bg-primary vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white p-3">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>

              <div className="mt-2">
                <label>Email</label>
                <input type="email" className='form-control' onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="mt-2">
                <label>Password</label>
                <input type="password" className='form-control' onChange={(e)=>setpassword(e.target.value)}/>
              </div>
              <button type='submit' className='btn btn-success form-control mt-3'>Login</button>
            </form>
      </div>

      </div>
    </div>
  )
}

export default Login