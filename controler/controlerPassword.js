//const Sib=require('sib-api-v3-sdk');
const sgMail=require('@sendgrid/mail');
const mysqul=require('mysql2/promise');
require('dotenv').config();
const pool=mysqul.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});


const bcrypt=require("bcrypt");
const { text } = require('body-parser');



exports.reset=async(req,res)=>{
    const {userID}=req.params
    console.log(userID)
    try{
        const [result]=await pool.execute("SELECT * FROM users WHERE id=?",[userID])
        if (result){
            res.status(200).send(
                                `<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/updatepassword/${userID}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`

            )
            res.end()
        }else{
            res.status(200).json("in reset there is err")
        }
    }catch(err){
        res.status(200).json(err)
    }
}
exports.update=async(req,res)=>{
    const {userID}=req.params
    console.log(req.body,'fkjsdhkfhskdhfsdhjfh')
    const {newpassword}=req.query;

    try{
        const saltround=10
        const hashPassword=await bcrypt.hash(newpassword,saltround);
        const [result]=await pool.execute("UPDATE users SET password=? WHERE id=?",[hashPassword,userID])
        console.log(result)
        res.status(200).json(result)


    }catch(err){
        res.status(200).json("something went wrong in the reset ")
    }
}

exports.forget=async(req,res)=>{
    const {email}=req.body;
    const userID=req.user.userID;
    
    
    try{
       
        const [result]=await pool.execute("SELECT * FROM users WHERE email=?",[email])
        if (!result.length){
            res.status(200).json("dfkhakdsfhlkah")
        }
        await pool.execute("UPDATE users SET isActive=? WHERE id=?",[false,email])
        console.log(" in if condition")
        sgMail.setApiKey(process.env.SENDERS_API_KEY)
        const msg=[{
            to:email,
            from:'kumararpit994@gmail.com',
            subject:'resert password link',
            text:'click on this link thatsit',
            html: `<a href="http://localhost:3000/resetpassword/${userID}">Reset password</a>`
        }]
        await sgMail.send(msg)
        res.status(200).json("done here everything")
        
        
    }catch(err){
        console.log(err)
        res.status(200).json(err)
    }
}