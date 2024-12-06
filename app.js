const express=require('express');
const bodypharser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(cors())
app.use(bodypharser.json())
app.post('/signup',async(req,res)=>{
    const ak={Name,Email,Password}=req.body;
    console.log(req.body)
    try{
        res.json(ak)
        
    }catch(err){
        res.json(err)
    }
})
app.listen(3000,()=>{
    console.log('yes listeningngngnnghah')
})