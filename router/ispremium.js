const express = require('express');
const router = express.Router();
const mysqul=require('mysql2/promise')
const bodyParser = require('body-parser');
const controlerIspremium=require('../controler/controlerIspremium')
const Razorpay = require('razorpay');

const verification=require('../middlware/verifyToken');
const { route } = require('./order');
require('dotenv').config();
const pool=mysqul.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD
});

router.post('/leaderbord',async(req,res)=>{
    
    try{
        const [result]=await pool.execute("SELECT * FROM users")
        res.json(result)
    
    }catch(err){}
   
})

router.get('/ispremium',verification,controlerIspremium.get)


module.exports=router;