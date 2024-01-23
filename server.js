const express = require('express')
const session = require('express-session')
const path = require('path')
require('dotenv').config()
const nocache = require('nocache')

const userRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin.js')
const db = require('./db/db.js')



const app = express()
app.set("views", path.join(__dirname, "views"))

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000000000000 }
}));

app.use((req, res, next) => {
  res.set('Cache-Control',
    'no-cache,private,no-store,must-revalidate')
  next();
})


app.use("/", userRouter);
app.use("/", adminRouter)
app.use("*", (req, res) => {
  res.render('errorpage')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("connected succesfully");
})
module.exports = app;



