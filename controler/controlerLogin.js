
const express=require('express')
require('dotenv').config();
const mysqul=require('mysql2/promise');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const pool=mysqul.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});

function generateToekn(id){
    return jwt.sign({userID:id}, 'fasdfsdfsdf465s4df654s6df4s654f6asd654f6sf')
}
exports.post=async(req,res)=>{
    const {Email,Password}=req.body;
    console.log(req.body,"hgfhgff")
    try{
        const [user]=await pool.execute("SELECT * FROM users WHERE email =?",[Email])
        console.log(user,'fkdkj')
        if (user.length>0){


            const userPassword=user[0].password
            
            console.log("password check := "+Password,userPassword)
            const comaprePassword=await bcrypt.compare(Password,userPassword)
            if(comaprePassword){
                
                res.status(200).json({message:"userlogin doone",true:true,token:generateToekn(user[0].id)});
            }
            else{
                res.status(400).json({message:"password does not match",true:false});
            }
        }
        else{
            res.status(400).json({message:"you haven't signup"})
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}