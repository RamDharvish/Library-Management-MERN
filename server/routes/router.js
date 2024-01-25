const express = require('express')
const controllers = require('../Controllers.js/AuthController')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const stripe = require('stripe')('sk_test_51OKaveSCKRGDSmMN0crU3E0fo5Wf8vFknf3lS4UMAlQqJpoAEnVQcR22qY1N9QxVf6WXZRtJZ1X5RZUNiPjwlKUw00EUlTGlsP')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid');
const cors=require('cors')
const app = express()
dotenv.config()



//stripe configuration

app.use(cors())
app.use(express.json())

// app.post('/payment',  (req, res) => {
//     console.log(req.body)
//     res.send("working")
//   });



  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.get('/', controllers.first)
router.post('/signup', controllers.signup)
router.post('/login', controllers.login)
router.post('/addBook', upload.single('file'), controllers.addBook);
router.get('/getBook', controllers.getBook)
router.get('/getBookById/:id', controllers.getBookById)
router.put('/updateBook/:id', controllers.updateBook);
router.delete('/deleteBook/:id', controllers.deleteBook)
router.put('/addToCart/:id', controllers.addToCart)
router.get('/getCart/:id', controllers.getCart)
router.delete('/removeFromCart/:userId/:itemId', controllers.removeFromCart)
 router.post('/payment',controllers.payment)




module.exports = router