const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const auth = require('../middlewares/adminAuth')
const adminController = require('../controllers/adminController')


router.get('/',(req,res)=>{

    res.render("welcome")

})

//login
router.get('/adminlogin',adminController.adminlogin)
router.post('/adminlogin',adminController.login)

//home
router.get('/adminhome',auth.authMiddleware,adminController.home)


//edit
router.get('/admin/edituser/:id',auth.authMiddleware,adminController.edit)
router.post('/admin/edituser/:id',auth.authMiddleware,adminController.editUser)


//remove
router.get('/admin/removeUser/:id',auth.authMiddleware,adminController.removeUser)


//create
router.get('/admin/createuser',auth.authMiddleware,adminController.createuser)
router.post('/admin/createuser',auth.authMiddleware,adminController.usersignup)

//logout
router.get('/logout',adminController.logout)

module.exports = router