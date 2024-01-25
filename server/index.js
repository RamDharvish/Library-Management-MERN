
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const router=require('./routes/router')
const path=require('path')
const app=express()
const dotenv=require('dotenv')


mongoose.connect(process.env.MONGO_DB_URL)
.then(console.log("DB connected"))
.catch(err =>console.log(err))

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}

))
app.use('/',router)
app.use('/images', express.static(path.join(__dirname, './routes/images')));


PORT=process.env.PORT
app.listen(PORT,()=>console.log('server is running on port : ',PORT))
