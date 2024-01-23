const authMiddleware = (req, res, next) => {
    if ( req.session.auth) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/userlogin');
    }
  };  
  
module.exports = {authMiddleware};