



const AWS=require('aws-sdk');



const mysqul=require('mysql2/promise');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const pool=mysqul.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
});


function uploadToS3(data,fileName){
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const I_AM_USER_KEY=process.env.I_AM_USER_KEY;
    const I_AM_USER_SECRET=process.env.I_AM_USER_SECRET;
    let S3bucket=new AWS.S3({
        accessKeyId:I_AM_USER_KEY,
        secretAccessKey:I_AM_USER_SECRET,
        //bucket:BUCKET_NAME
    })
    
    return new Promise((resolve,reject)=>{
        var params={
            Bucket:BUCKET_NAME,
            Key:fileName,
            Body: data,
            ACL: 'public-read'
        }
    
    S3bucket.upload(params,(err,res)=>{
        if(err){
            console.log("in S3bucket something wenet weong", err)
            reject(err)

        }else{
            console.log('success',res)
            resolve( res.Location)
        }
    })
    })
    
}





exports.downloadexpense=async(req,res)=>{
    const userID=req.user.userID
    const expense=await pool.execute('SELECT * FROM expenses WHERE userId=?',[userID]);
    
    const strigifiedExpenses= JSON.stringify(expense);
    //console.log(expense)
    //console.log(strigifiedExpenses)
    const fileName=`Expense${userID}/${new Date()}.txt`
    const fileUrl=await uploadToS3(strigifiedExpenses,fileName)
    //console.log(fileUrl,'hfjfhjfjhf')
    res.status(200).json({fileUrl,sucess:true})
}

exports.updateAmount=async(req,res)=>{
    //console.log('hihihi')
    const userID=req.user.userID;
    let {expense}=req.body;
    //console.log(expense,'dflhsldh')

    const connection = await pool.getConnection()
    const [user]=await pool.execute('SELECT * FROM users WHERE id=?',[userID]);
    //console.log(user[0].totalamount)
    let amount=Number(expense)+Number(user[0].totalamount);
    try{
        await connection.beginTransaction()
        const [result]=await pool.execute("UPDATE users SET totalamount=? WHERE id=?",[amount,userID])
        await connection.commit()
        res.status(200).json(result)
    }catch(err){
        await connection.rollback()
        res.status(500).json(err)
    }finally{
        connection.release()
    }
}
    


exports.post=async(req,res)=>{
    const connection=await pool.getConnection()
    console.log(req.body)
    const {expense,dicription,category}=req.body;
    const userID=req.user.userID;
    //console.log(userID,'fskdhfkjhs')
    try{
        //console.log(totalamount.totalamount)
        await connection.beginTransaction()

        const [result] = await pool.execute(
            "INSERT INTO expenses (amount, description, category, userID) VALUES (?, ?, ?,?)",
            [expense, dicription, category,userID]
        );   

        await connection.commit()
        res.json(result)
    }catch(err){
        await connection.rollback()
        res.json(err)
    }finally{
        connection.release()
    }
}

exports.get=async(req,res)=>{
    const userID=req.user.userID;
    console.log('in the get of expense req')
    const {page,limit}=req.query
    try{
        
        const [expenses] = await pool.execute("SELECT * FROM expenses WHERE userID=?", [userID]
        );
        const totalPages = Math.ceil(expenses.length/ limit);
        //console.log('hiii')
        //console.log(expenses)
        //console.log(totalPages)
        const startIndex=(page-1)*limit;
        const endIndex=startIndex+limit
        res.json({
            expenses: expenses.slice(startIndex,endIndex),
            limit:limit,
            totalPages: totalPages
        });
        
    }catch(err){
        res.json(err)
    }
    /*try{
        const [result] = await pool.execute("SELECT * FROM expenses WHERE userID=?",[userID])
        console.log(result)
        
        
        res.json(result)


    }catch(err){
        res.json(err)
    }*/
}
exports.delete=async(req,res)=>{
    const userID=req.user.userID;
    const {id}=req.params
    
    
    try{
        const [totalamount]=await pool.execute("SELECT totalamount FROM users WHERE id=?",[userID])
        const [result] = await pool.execute("SELECT amount FROM expenses WHERE id=? ",[id])
        await pool.execute("DELETE FROM expenses WHERE id=? ",[id])
        const amount=Number(totalamount[0].totalamount)-Number(result[0].amount)
        await pool.execute("UPDATE users SET totalamount=? WHERE id=?",[amount,userID])
        
        
        //console.log(result)
        res.json({message:"delete part done"})


    }catch(err){
        res.json(err)
    }
}