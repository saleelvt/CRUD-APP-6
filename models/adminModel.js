const mongoose = require('mongoose')

const schema = mongoose.Schema({
    Email:{
        type:String , required:true
    },
    Password:{
        type:String,required:true
    }
})

module.exports = mongoose.model('admin',schema)