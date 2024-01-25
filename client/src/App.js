import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Authentication/Signup/Signup'
import Login from './Authentication/Login/Login'
import Admin from './Pages/Admin'
import Visitor from './Pages/visitor'
import AddBook from './Components/Crud/AddBook'
import UpdateBook from './Components/Crud/UpdateBook'
import Details from './Pages/Details'
import Cart from './Pages/Cart'
import Success from './Components/Payment_Status/Success'
import Failed from './Components/Payment_Status/Failed'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/visitor/:id' element={<Visitor/>}/>
          <Route path='/addBook' element={<AddBook/>}/>
          <Route path='/updateBook/:id' element={<UpdateBook/>}/>
          <Route path='/visitor/details/:id' element={<Details/>}/>
          <Route path='/visitor/cart/:id' element={<Cart/>}/>
          <Route path='/placeorder' element={<Success/>}/>
          <Route path='/cancelOrder' element={<Failed/>}/>
        

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App