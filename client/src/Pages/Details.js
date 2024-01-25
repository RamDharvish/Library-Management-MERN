import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
function Details() {
    const {id} =useParams()
    const [value,setValue]=useState([])
    const navigate=useNavigate()
    useEffect(()=> {
        axios.get(`http://localhost:5000/getBookById/${id}`)
        .then(res =>setValue(res.data))
        .catch(err =>console.log(err))
    },[id])
  return (
    <div className='d-flex vh-150 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white p-3  overflow-x-auto overflow-y-auto">
            <div className="top w-100 h-50 ">
            <img src={`http://localhost:5000/images/${value.image}`} alt="" style={{width:"100%",height:"100%"}}/>
            </div>
            <div className="bottom">
                <h1> Name : {value.name}</h1>
                <h2>author : {value.author}</h2>
                <h3>Year : {value.year}</h3>
                <h4>Description : {value.description}</h4>
                <h5>Price : {value.price}</h5>
                <button className='btn btn-warning form-control ' onClick={()=>navigate('/visitor')}>Back to Dashboard</button>
            </div>
        </div>
    </div>
  )
}

export default Details