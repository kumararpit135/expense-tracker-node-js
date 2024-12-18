const express=require('express')
const router=express.Router()

const controlerSignup=require("../controler/controlerSignup")



router.post('/signup',controlerSignup.post);

module.exports=router;


