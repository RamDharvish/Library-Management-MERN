const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        default:"visitor"
    },
    cart: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books'
        },
    }]
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel