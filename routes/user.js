const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController") 
const auth = require('../middlewares/userAuth')


router.get("/user",(req,res)=>{
    res.render("welcome")
})


router.get("/signup",userController.signup)
router.post('/signup',userController.insertuser)

router.get('/userlogin',userController.login)
router.post('/userlogin',userController.checkuser)

router.get('/home',auth.authMiddleware,userController.homepage)

router.get('/signout',auth.authMiddleware,userController.signout)

    
module.exports = router; 