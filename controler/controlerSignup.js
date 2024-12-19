const express=require('express')
require('dotenv').config();
const mysqul=require('mysql2/promise');
const bcrypt=require('bcrypt');
console.log(process.env.DB_HOST)

const pool=mysqul.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD
});


exports.post=async(req,res)=>{
    const {Name,Email,Password}=req.body;
    console.log(req.body);
    if (!Name || !Email || !Password){
        return res.status(400).json({message:"something is missing"})
    }
    try{
        const [check]=await pool.execute("SELECT * FROM users WHERE email =?",[Email])
        if (check.length>0){
            res.status(400).json({message:"you cant not ragisterd this"})
        }
        else{
            const saltround=10;
            const hashPassword=await bcrypt.hash(Password,saltround)
            console.log(hashPassword)
            const [result]=await pool.execute("INSERT INTO users (name,email,password,ispremiumuser,totalamount) VALUES(?,?,?,?,?)",[Name,Email,hashPassword,'false','0']);
            res.json({message:"done the storing part"})
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}