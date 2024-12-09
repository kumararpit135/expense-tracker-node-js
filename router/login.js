
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
router.post('/login',async(req,res)=>{
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
                console.log("dfhkhdfsk")
                res.status(200).json({message:"user login successfully"});
            }
            else{
                res.status(401).json({message:"password incorrect"})
            }
        }
        else{
            res.json({message:"you haven't signup"})
        }
        
    }catch(err){
        res.json(err)
    }
})


module.exports=router;