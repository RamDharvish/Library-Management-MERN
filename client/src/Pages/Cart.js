import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/getCart/${id}`)
      .then(res => {
        setCartItems(res.data.cart);
        const initialCounts = {};
        res.data.cart.forEach(item => {
          initialCounts[item._id] = 1;
        });
        setItemCounts(initialCounts);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAdd = (itemId) => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1
    }));
  };

  const handleLess = (itemId) => {
    if (itemCounts[itemId] > 1) {
      setItemCounts(prevCounts => ({
        ...prevCounts,
        [itemId]: prevCounts[itemId] - 1
      }));
    }
  };

  const handleRemove = (itemId) => {
    axios.delete(`http://localhost:5000/removeFromCart/${id}/${itemId}`)
      .then((res) => {
        if (res.data.message === 'Item removed from cart successfully') {
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== itemId)
          );

          setItemCounts((prevCounts) => {
            const newCounts = { ...prevCounts };
            delete newCounts[itemId];
            return newCounts;
          });
        }
      })
      .catch((err) => console.error(err));
  }

  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + cartItem.bookId.price * itemCounts[cartItem._id];
  }, 0);


  const buy = async (token) => {
    // console.log('Buying item:', bookId.name);
     const body ={
      token,
      cartItems,
      totalAmount 
     }
     const headers={
      "Content-Type":"application/json"
     }
     return fetch("http://localhost:5000/payment",{
      method:"POST",
      headers,
      body:JSON.stringify(body)
     }).then((res)=> {
      console.log(res)
     }).catch(err=>{
      console.log("err",err)
     })
  };

  return (
    <div>
      <div className="d-flex w-100 bg-secondary justify-content-end text-white fw-bold ">
        <h1>My Cart</h1>
        <div className="d-flex justify-content-end w-50">
          <button className='btn btn-primary' onClick={() => navigate('/visitor/' + id)}>GO Back</button>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center flex-wrap">
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cartItems.map((cartItem, index) => (
              <div className="box bg-secondary ms-5 mt-5 " key={index}>
                <div className="image">
                  <img
                    src={`http://localhost:5000/images/${cartItem.bookId.image}`}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="content p-2 bg-secondary text-white">
                  <h4>Name: {cartItem.bookId.name} </h4>
                  <h5>Author: {cartItem.bookId.author} </h5>
                  <p>
                    Price: {cartItem.bookId.price * itemCounts[cartItem._id]}
                    <span className='ms-1 me-2'>
                      <button className='btn btn-success' onClick={() => handleAdd(cartItem._id)}>Add</button>
                    </span>
                    {itemCounts[cartItem._id]}
                    <span className='ms-2'>
                      <button className='btn btn-warning' onClick={() => handleLess(cartItem._id)}>Less</button>
                    </span>
                  </p>
                </div>
                {/* <button className='form-control btn btn-success' onClick={()=>buy(cartItem._id,cartItem.bookId.price * itemCounts[cartItem._id],cartItem.bookId)}>Buy</button> */}

                <StripeCheckout
                  name='Purchase'
                  amount={cartItem.bookId.price * itemCounts[cartItem._id] * 100}
                  currency='INR'
                  stripeKey='pk_test_51OKaveSCKRGDSmMNVY86RbfJ9zu6YTiKhpx7q1PQltFdQLp2aQcliLe1cc3CbmaLO9XuejxuXhzkRvSYMSDxTF0o001HBJcKOP'
                  token={buy}
                  >
                  <button className="form-control bg-primary text-white">Buy Item</button>
                </StripeCheckout>
                <button className='form-control btn btn-danger' onClick={() => handleRemove(cartItem._id)}>Remove</button>
              </div>
            ))
          )}
        </div>

      </div>
      {/* <div className="row mt-5 bg-secondary">
        <div className="left-totalAmt col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4  d-flex justify-content-end ">
          <h3>Total Amount : </h3>
        </div>
        <div className="right-amt col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center ">
          <h3>{totalAmount.toFixed(2)}  Rs</h3>
        </div>
        <div className="end-amt col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center ">
      <button>Checkout</button>
        </div>
      </div> */}
    </div>
  );
}

export default Cart;
