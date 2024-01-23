const authMiddleware = (req, res, next) => {
    if (req.session.adminAuth) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/adminlogin');
    }
  };
  
module.exports = {authMiddleware};