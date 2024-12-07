const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');



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
            res.status(400).json("you cant not ragisterd this")
        }
        else{
            const [result]=await pool.execute("INSERT INTO users (name,email,password) VALUES(?,?,?)",[Name,Email,Password]);
            res.json(result)
        }
        
    }catch(err){
        res.json(err)
    }
})


module.exports=router;


