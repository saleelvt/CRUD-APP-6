
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//signup -get
const signup = async (req, res) => {
  if (req.session.auth) {
    res.redirect("/home");
  } else {
    res.render("user/usersignup",{err:""});
  }
};

//signup - post
const insertuser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    req.body.Password = await bcrypt.hashSync(req.body.Password, salt);
    const userdata = await UserModel.create(req.body)
    if(userdata){
        req.session.auth = true;
        req.session.user = userdata
        res.redirect('/home')
    }
  } catch (error) {
    if (error.code === 11000) {
      res.render("user/usersignup", { err: "Email already exist" });
    }
  }
};

//login - get
const login = (req, res) => {
  if (req.session.auth) {
    res.redirect("/home");
  } else {
    res.render("user/userlogin", { err: req.session.error });
  }
};

//login - post

const checkuser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ Email: req.body.Email });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.Password,
        user.Password
      );

      if (passwordMatch) {
        req.session.auth = true;
        req.session.user = user;
        res.redirect("/home");
      } else {
        req.session.error = "invalid username or password";
        res.redirect("/userlogin");
      }
    } else {
      req.session.error = "invalid username or password";
      res.redirect("/userlogin");
    }
  } catch (error) {
    req.session.error = "invalid username or password";
    res.redirect("/userlogin");
  }
};

const homepage = async (req, res) => {
  res.render("user/home");
};

const signout = async (req, res) => {
  req.session.auth = false;
  res.render("user/userlogin",{err:""});
};

module.exports = { signup, insertuser, login, checkuser, homepage, signout };
