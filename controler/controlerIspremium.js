const express=require('express')

const mysqul=require('mysql2/promise');
require('dotenv').config();
const pool=mysqul.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});



exports.get=async(req,res)=>{
    const userID=req.user.userID
    try{
        const [isprem]=await pool.execute("SELECT ispremiumuser FROM users WHERE id=?",[userID]);
        if(isprem.length>0){
            console.log("in premium check");
            res.status(200).json({isprem,premium: isprem[0].ispremiumuser==='true'});
        }
        else{
            return res.status(400).jons("sfkdfdshakfh");
        }
    }catch(err){res.status(200).json({message:"false"})};
}