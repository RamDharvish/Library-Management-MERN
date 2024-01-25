import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar/Navbar'
function Admin() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/getBook')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete=(id)=> {
    axios.delete('http://localhost:5000/deleteBook/'+id)
    .then(res => window.location.reload())
    .catch(err =>console.log(err))
  }
  return (
    <div className="">
    <Navbar/>
    <div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
      <div className="admin bg-white p-3" >
        <h3>Books</h3>
        <Link to={'/addBook'} className='btn btn-success mt-2'>Add Book</Link>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"100px"}}>Image</th>
              <th>Name</th>
              <th>Author</th>
              <th>Year</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value, index) => {
                return <tr key={index}>
                  <td><img src={`http://localhost:5000/images/${value.image}`} alt="img" style={{width:"100%"}}/></td>
                  <td>{value.name}</td>
                  <td>{value.author}</td>
                  <td>{value.year}</td>
                  <td>{value.description}</td>
                  <td>{value.price}</td>
                  <td className='d-flex flex-row '><Link to={`/updateBook/${value._id}`} className='btn btn-warning' >Update</Link>
                    <button className='btn btn-danger ms-3' onClick={(e)=>handleDelete(value._id)}>Delete</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Admin