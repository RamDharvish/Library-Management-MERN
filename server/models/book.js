const mongoose = require('mongoose')

const bookSchema=mongoose.Schema({
    name:String,
    author:String,
    year:String,
    description:String,
    price:Number,
    image:String
})

const bookModel=mongoose.model('Books',bookSchema)

module.exports=bookModel