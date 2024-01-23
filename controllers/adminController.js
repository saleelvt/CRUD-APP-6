const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/adminAuth");

const inserting = async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hashSync("123",salt) ;
        let data = {
            Email:"admin@gmail.com",
            Password:hashedpassword
        }
        await adminModel.create(data)
    } catch (error) {
        console.log("admin not inserted");
        res.status(500).json({message:"error occured while logging"})
    }
}
inserting()
const adminlogin = async (req, res) => {
  if (req.session.adminAuth) {
    res.redirect("/adminhome");
  } else {
    res.render("admin/adminlogin",{err:" "});
  }
};

const login = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ Email: req.body.Email });
    if (admin) {
      const passwordMatch = await bcrypt.compare(req.body.Password, admin.Password);
      if (passwordMatch) {
        req.session.adminAuth = true;
        req.session.admin = admin;
        res.redirect("/adminhome");
      } else {
        res.render("admin/adminlogin", { err: "INVALID ADMIN" });
      }
    } else {
      res.render("admin/adminlogin", { err: "INVALID ADMIN" });
    }
  } catch (error) {
    res.render("admin/adminlogin", { err: "INVALID ADMIN" });
  }
};


//admin home
const home = async (req, res) => {
    let search = req.query.UserName || ''
    const users = await userModel.find({UserName: {$regex: '^'+search, $options:'i'}});
    res.render("admin/adminhome", { users : users });
};


//edit user - get
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.render("admin/edituser", { user,err:req.session.error });
  } catch (error) {
    res.render('errorpage')
  }
};


// edit user - post
const editUser = async (req, res) => {
    const id = req.params.id;
  try {
    const { UserName, Email } = req.body;
    await userModel.findByIdAndUpdate(id, { UserName, Email: Email });
    res.redirect("/adminhome");
  } catch (error) {
    if(error.code === 11000){
        req.session.error = 'email is already taken'
        res.redirect(`/admin/edituser/${id}`)
    }
  }
};


// deleting user
const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndRemove(id);
    res.redirect("/adminhome");
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "An error occurred while removing user" });
  }
};


// create user - get
const createuser = async (req, res) => {
    res.render("admin/createuser",{error:''}); 
};


//create user - post
const usersignup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    req.body.Password = await bcrypt.hashSync(req.body.Password, salt);

    const userdata = await userModel.create(req.body)
    if(userdata){
        
        res.redirect("/adminhome")
    }
  } catch (error) {
    if (error.code === 11000) {
        req.session.error = "e-mail already taken"
        res.render('admin/createuser',{error:req.session.error})
    }
  }
};

//logout
const logout = async (req, res) => {
  req.session.adminAuth = false
  res.redirect("/");
};

module.exports = {
  adminlogin,
  login,
  home,
  editUser,
  edit,
  removeUser,
  createuser,
  usersignup,
  logout,
};
