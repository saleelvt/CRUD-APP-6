const mongoose = require("mongoose")
require('dotenv').config()

const MONGODB_URL = process.env.MONGO_URL

mongoose.connect(MONGODB_URL)
mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})
mongoose.connection.on('disconnected',()=>{
    console.log("disconnected from database");
})