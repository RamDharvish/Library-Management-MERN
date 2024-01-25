import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate, useParams ,Link} from 'react-router-dom'
import axios from 'axios'
function UpdateBook() {
    const [name,setName]=useState()
    const [author,setAuthor]=useState()
    const [year,setYear]=useState()
    const [description,setDescription]=useState()
    const [price,setPrice]=useState()
    const navigate=useNavigate()
    const {id}=useParams()
   
    useEffect(() => {
        axios.get(`http://localhost:5000/getBookById/${id}`)
            .then(res => {
                const { name, author, year, description, price } = res.data;
                setName(name);
                setAuthor(author);
                setYear(year);
                setDescription(description);
                setPrice(price);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
       axios.put('http://localhost:5000/updateBook/'+id,{name,author,year,description,price})
       .then(res => navigate('/admin'))
       .catch(err =>console.log(err))
    };
    
  return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center '>
        <div className="addBook bg-white p-3">
            <form onSubmit={handleUpdate}>
                <h3>Update Book</h3>

                <div className="mt-2">
                    <label>Name</label>
                    <input type="text" className='form-control'  value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Author</label>
                    <input type="text" className='form-control' value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Year</label>
                    <input type="number" className='form-control' value={year} onChange={(e)=>setYear(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Description</label>
                    <input type="text" className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>

                <div className="mt-2">
                    <label>Price</label>
                    <input type="number" className='form-control' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>

                <button type='submit' className='btn btn-success form-control mt-3'>Update</button>
                <Link to={'/admin'} className='btn btn-danger form-control mt-3'>Dashboard</Link>
            </form>
        </div>
    </div>
  )
}

export default UpdateBook