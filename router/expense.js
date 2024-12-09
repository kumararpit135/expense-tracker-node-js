const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');
const pool=mysqul.createPool({
    host:'localhost',
    user:'root',
    database:'expensetracker',
    password:'20130008890'
});

router.post('/expense',async(req,res)=>{
    console.log(req.body)
    const {expense,dicription,category}=req.body;
    
    try{
        console.log(await pool.execute("SELECT * FROM expenses"))
        const [result] = await pool.execute(
            "INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)",
            [expense, dicription, category])
        res.json(result)


    }catch(err){
        res.json(err)
    }
})

router.get('/expense',async(req,res)=>{
    
    
    try{
        const [result] = await pool.execute("SELECT * FROM expenses")
        
        
        res.json(result)


    }catch(err){
        res.json(err)
    }
})
router.delete('/expense/:id',async(req,res)=>{
    const {id}=req.params
    console.log(id)
    
    try{
        const [result] = await pool.execute("DELETE FROM expenses WHERE id=?",[id])
        
        console.log(result)
        res.json({message:"delete part done"})


    }catch(err){
        res.json(err)
    }
})
module.exports=router;