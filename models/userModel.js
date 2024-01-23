const mongoose = require('mongoose')


const schema = mongoose.Schema({
    UserName:{
        type:String,required:true,unique:true
    },
    Email:{
        type:String,required:true,unique:true
    },
    Password:{
        type:String,required:true
    }
})
module.exports = mongoose.model('UserData',schema)