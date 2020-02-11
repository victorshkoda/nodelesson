const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/auth');
const key = require('../config/key');
const router = express.Router();

const userData = (req, res, next) => {
  if(req.cookies.token){
    let first = req.cookies.token.substr(0,6);
    let token = req.cookies.token.replace(/^.{6}/, '');
    if(first === "Bearer"){
      req.currentUser = jwt.verify(token, key.jwt);
    }else{
      req.currentUser = {}
    }
  }else{
    req.currentUser = {}
  }

  return next();
};
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/register', controller.register);
router.post('/users',userData, controller.users);
router.post('/check_login',userData, controller.isLogin);

module.exports = router;
