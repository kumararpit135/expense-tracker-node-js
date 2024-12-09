const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');
const bcrypt=require('bcrypt')

const pool=mysqul.createPool({
    host:'localhost',
    user:'root',
    database:'expensetracker',
    password:'20130008890'
});
router.post('/signup',async(req,res)=>{
    const {Name,Email,Password}=req.body;
    console.log(req.body)
    try{
        const [check]=await pool.execute("SELECT * FROM users WHERE email =?",[Email])
        if (check.length>0){
            res.status(400).json({message:"you cant not ragisterd this"})
        }
        else{
            const saltround=10;
            const hashPassword=await bcrypt.hash(Password,saltround)
            console.log(hashPassword)
            const [result]=await pool.execute("INSERT INTO users (name,email,password) VALUES(?,?,?)",[Name,Email,hashPassword]);
            res.json({message:"done the storing part"})
        }
        
    }catch(err){
        res.json(err)
    }
})


module.exports=router;


