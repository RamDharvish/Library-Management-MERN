const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const path=require('path')
const userModel=require('../models/user')
const bookModel=require('../models/book')
const { v4: uuidv4 } = require('uuid');
const stripe=require('stripe')("sk_test_51OKaveSCKRGDSmMN0crU3E0fo5Wf8vFknf3lS4UMAlQqJpoAEnVQcR22qY1N9QxVf6WXZRtJZ1X5RZUNiPjwlKUw00EUlTGlsP")




function first(req,res) {
    res.send('Hello server is working')
}

function signup(req,res) {
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then(hash => {
        userModel.create({name,email,password:hash})
        .then(user => res.json("success"))
        .catch(err =>res.json(err))
    })
    .catch(err =>res.json(err))
}

function login(req,res) {
   const {email,password}=req.body
   userModel.findOne({email:email})
   .then(user => {
    if(user) {
           bcrypt.compare(password,user.password,(err,response)=> {
            if(response) {
               const token=jwt.sign({email:user.email,role:user.role},"secretKey",{expiresIn:'1d'})
               res.cookie('token',token)
               return res.json({status:"success",role:user.role,email:user.email,id:user._id})
            }else {
                return res.json("password is incorrect")
            }
           })
    }else {
      return  res.json("no record existed")
    }
   })
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,'./images')
    },
    filename:(req,file,cb)=> {
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

function addBook(req,res) {
    const {name,author,year,description,price}=req.body
    const {filename}=req.file
    bookModel.create({
        name:name,
        author:author,
        year:year,     
        description:description,
        price,price,
        image:filename                     
    })
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
}

function getBook(req,res){
    bookModel.find()
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
}

function getBookById(req, res) {
    const { id } = req.params
    bookModel.findById({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
}

function updateBook(req, res) {
    const { id } = req.params;
    const { name, author, year, description, price } = req.body;
        bookModel.findByIdAndUpdate({_id:id},{
            name:name,
            author:author,
            yer:year,
            description:description,
            price:price
        })
        .then(result => res.json(result))
        .catch(err =>res.json(err))
}

function deleteBook(req,res) {
    const {id}=req.params;
    bookModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err =>res.json(err))
}


function addToCart(req, res) {
    const { id } = req.params;
    const { bookId } = req.body;

    userModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

 const existingCartItem = user.cart.find(item => item.bookId.toString() === bookId.toString());

            if (existingCartItem) {
                
                existingCartItem.quantity += 1;
            } else {
          
                user.cart.push({ bookId: bookId });
            }

            // Save the updated user document
            user.save()
                .then(result => res.json(result))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
}




function getCart(req, res) {
    const { id } = req.params;

    userModel.findById(id)
        .populate({
            path: 'cart.bookId',
            model: 'Books', 
            select: 'name author price image'
        })
      
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ cart: user.cart });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    
    function removeFromCart(req, res) {
        const { userId, itemId } = req.params;
    
        userModel.findByIdAndUpdate(
            userId,
            {
                $pull: { cart: { _id: itemId } }
            },
            { new: true }
        )
            .then(result => {
                res.json({ message: 'Item removed from cart successfully' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    const payment=(req,res)=> {
        const {cartItems,token,totalAmount}=req.body
        const transactionKey=uuidv4()
        return stripe.customers.create({
            email:token.email,
            source:token.id,

        }).then((customer)=>{
            stripe.charges.create({
                amount:totalAmount,
                currency:"INR",
                customer:token.customer.id,
                receipt_email:token.email,
                description:"purchase of book"
            }).then((result)=> res.json(result))
            .catch(err=>res.json(err))
        }).catch(err=>res.json(err))
    }

exports.first=first
exports.signup=signup
exports.login=login
exports.addBook=addBook
exports.getBook=getBook
exports.getBookById=getBookById
exports.updateBook=updateBook
exports.deleteBook=deleteBook
exports.addToCart=addToCart
exports.getCart=getCart
exports.removeFromCart=removeFromCart
 exports.payment=payment
