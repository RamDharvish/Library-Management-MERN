import React, { useState } from 'react'
import './style.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
function AddBook() {
    const [name,setName]=useState()
    const [author,setAuthor]=useState()
    const [year,setYear]=useState()
    const [description,setDescription]=useState()
    const [price,setPrice]=useState()
    const [image,setImage]=useState()
    const navigate=useNavigate()
   

    const handleSubmit=(e)=> {
         e.preventDefault()

         const formData=new FormData()
         formData.append('name',name)
         formData.append('author',author)
         formData.append('year',year)
         formData.append('description',description)
         formData.append('price',price)
         formData.append('file',image)
         
         axios.post('http://localhost:5000/addBook',formData)
         .then(res => {
            console.log(res)
            navigate('/admin')
         })
         .catch(err =>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center '>
        <div className="addBook bg-white p-3">
            <form onSubmit={handleSubmit}>
                <h3>Add Book</h3>

                <div className="mt-2">
                    <label>Name</label>
                    <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Author</label>
                    <input type="text" className='form-control' onChange={(e)=>setAuthor(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Year</label>
                    <input type="number" className='form-control' onChange={(e)=>setYear(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Description</label>
                    <input type="text" className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Price</label>
                    <input type="number" className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Image</label>
                    <input type="file" className='form-control' onChange={(e)=>setImage(e.target.files[0])}/>
                </div>

                <button type='submit' className='btn btn-success form-control mt-3'>Add</button>
                <Link to={'/admin'} className='btn btn-danger form-control mt-3'>Dashboard</Link>
            </form>
        </div>
    </div>
  )
}

export default AddBook