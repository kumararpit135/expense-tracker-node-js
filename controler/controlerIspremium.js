const express=require('express')

const mysqul=require('mysql2/promise');

const pool=mysqul.createPool({
    host:'localhost',
    user:'root',
    database:'expensetracker',
    password:'20130008890'
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