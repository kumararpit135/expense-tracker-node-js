
const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');



const pool=mysqul.createPool({
    host:'localhost',
    user:'root',
    database:'expensetracker',
    password:'20130008890'
});
router.post('/login',async(req,res)=>{
    const {Email,Password}=req.body;
    //console.log(req.body,"hgfhgff")
    try{
        const [user]=await pool.execute("SELECT * FROM users WHERE email =?",[Email])
        if (user.length>0){

            const userPassword=user[0]
            console.log("password check := "+Password,userPassword.password)
            if(this.toString(userPassword.Password)===this.toString(Password)){
                console.log("dfhkhdfsk")
                res.status(200).json(user);
            }
            else{
                res.status(200).json(false)
            }
        }
        else{
            res.status(400).json("you cant not ragisterd this")
        }
        
    }catch(err){
        res.json(err)
    }
})


module.exports=router;