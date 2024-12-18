const express = require('express');
const router = express.Router();
const mysqul=require('mysql2/promise')
const bodyParser = require('body-parser');
const controlerIspremium=require('../controler/controlerIspremium')
const Razorpay = require('razorpay');
require('dotenv').config();
const verification=require('../middlware/verifyToken');
const { route } = require('./order');
const pool=mysqul.createPool({
    host:'localhost',
    user:'root',
    database:'expensetracker',
    password:'20130008890'
});

router.post('/leaderbord',async(req,res)=>{
    
    try{
        const [result]=await pool.execute("SELECT * FROM users")
        res.json(result)
    
    }catch(err){}
   
})

router.get('/ispremium',verification,controlerIspremium.get)


module.exports=router;