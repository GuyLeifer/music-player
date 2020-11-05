const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err.massage);
          res.redirect('/');
        } else {
          console.log("token", decoded)
          next();
        }
      })
    } else {
      res.redirect('/');
    }
  }

  module.exports = { requireAuth };