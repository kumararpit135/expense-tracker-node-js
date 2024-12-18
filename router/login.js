
const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const controlerLogin=require('../controler/controlerLogin')

router.post('/login',controlerLogin.post)


module.exports=router;