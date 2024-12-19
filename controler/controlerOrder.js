
const Razorpay = require('razorpay');
require('dotenv').config();
const mysqul=require('mysql2/promise');

const pool=mysqul.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});

exports.post=async(req,res)=>{
    //console.log("inp post req")
    const userID=req.user.userID;
    //console.log(userID)
    const token=req.headers['authorization'];

    //console.log(token,"hjfhgkgkjgjgkjgkjgjgkjgk")
    const {payment_id,order_id}=req.body;
    try{
        const [result]=await pool.execute("SELECT * FROM orders WHERE orderid=?",[order_id]);
        //console.log(result)
        if (result.length>0){
            await pool.execute("UPDATE orders SET paymentid=?, status=? WHERE orderid=?",[payment_id,"succesful",order_id])
            await pool.execute("UPDATE users SET ispremiumuser=? WHERE id=?",["true",userID])
            res.status(200).json({sucess:true,message:"transaction succesful"})
        }
        else{
            res.status(400).json("not done");
        }

    }catch(err){console.error("Error in Razorpay order creation:", err);
        return res.status(500).json({ success: false, message: "Internal server error" })
    ;}
}
exports.get=async(req,res)=>{
    try{
        var rpz = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount=50000;
        rpz.orders.create({amount,currency: "INR"},async(err,order)=>{
            if(err){
                //console.log(err)
                res.json(err)
            }
            const [result]=await pool.execute("INSERT into  orders (orderid,status,paymentid)VALUES(?,?,?)",[order.id,"PENDING","false"]);
            //console.log(result,'gjhfjhgjhgghgkgkgkjgkjgkjgkjgkg')
            return res.status(201).json({order,key_id:rpz.key_id});
            
            
        })
    }catch(err){
        return res.status(500).json("nonoonon")
    }
}

