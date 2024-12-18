const express=require('express')
const router = express.Router();
const mysqul=require('mysql2/promise')
const bodyParser = require('body-parser');
const controlerForgotPassowrd=require('../controler/controlerPassword')
const Razorpay = require('razorpay');
require('dotenv').config();
const verification=require('../middlware/verifyToken');

console.log("dfgldshfsl")
router.get('/resetpassword/:userID',controlerForgotPassowrd.reset)
router.post('/password',verification,controlerForgotPassowrd.forget)
router.get('/updatepassword/:userID',controlerForgotPassowrd.update)
//$2b$10$JsT8DXRQVNWA3AAe5RT4s.SrJ7pcCajkOw7mQNAbUrJK6puz7E9GC
//$2b$10$wEdXfZzm436CzsSFD6m1wenzvQLEzO2UJaCNflbHnR5A7ZNQQxUi.
module.exports=router;