// import React, { useEffect, useState } from 'react'
// import VisitorNav from '../Components/Navbar/VisitorNav'
// import './visitor.css'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom'
// function Visitor() {
//   const navigate=useNavigate()
//   const [data, setData] = useState([])
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const {id}=useParams()

//   useEffect(() => {
//     axios.get('http://localhost:5000/getBook')
//       .then(res => setData(res.data))
//       .catch(err => console.log(err))
//   }, [])

//   const addToCart=(bookId)=> {
//    console.log(bookId)
//    axios.put('http://localhost:5000/addToCart/'+id,{bookId})
//    .then(res =>{
//     navigate(`/visitor/cart/${id}`)
//     console.log(res)
//    })
//    .catch(err =>console.log(err))
//   }
//   return (
//     <div>
//       <VisitorNav id={id} setSearchQuery={setSearchQuery}/>
//       <div className="container">
//         <div className=" d-flex justify-content-between  flex-wrap ">
//           {
//            data.map((value,index)=> {
//           return <div className="box mt-5 text-white" key={index}>
//             <div className="image">
//               <img src={`http://localhost:5000/images/${value.image}`} alt="" style={{width:"100%",height:"100%"}}/>
//             </div>
//             <div className="content p-3 bg-secondary">
//               <h4>Name :{value.name} </h4>
//               <h5>Author :{value.author} </h5>
//               <p>Price :{value.price} </p>
//             </div>
//             <div className="box-btn">
//               <button className='btn btn-warning bor w-50' onClick={()=>navigate(`/visitor/details/${value._id}`)}>Details</button>
//               <button className='btn btn-success w-50' onClick={() => addToCart(value._id)}>Add to Cart</button>
//             </div>
//           </div>
//            })
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Visitor




import React, { useEffect, useState } from 'react';
import VisitorNav from '../Components/Navbar/VisitorNav';
import './visitor.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Visitor() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/getBook')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (bookId) => {
    console.log(bookId);
    axios.put(`http://localhost:5000/addToCart/${id}`, { bookId })
      .then(res => {
        navigate(`/visitor/cart/${id}`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const filteredBooks = data.filter((book) => {
    const lowerCase = searchQuery.toLowerCase();
    return (
      book.name.toLowerCase().includes(lowerCase) ||
      book.author.toLowerCase().includes(lowerCase)
    );
  });

  return (
    <div>
      <VisitorNav id={id} setSearchQuery={setSearchQuery} />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap">
          {filteredBooks.map((value, index) => (
            <div className="box mt-5 text-white" key={index}>
              <div className="image">
                <img src={`http://localhost:5000/images/${value.image}`} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
              <div className="content p-3 bg-secondary">
                <h4>Name: {value.name} </h4>
                <h5>Author: {value.author} </h5>
                <p>Price: {value.price} </p>
              </div>
              <div className="box-btn">
                <button className='btn btn-warning bor w-50' onClick={() => navigate(`/visitor/details/${value._id}`)}>Details</button>
                <button className='btn btn-success w-50' onClick={() => addToCart(value._id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Visitor;
