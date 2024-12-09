const express=require('express');
const signupRouter=require('./router/signup');
const loginRouter=require('./router/login');
const bodypharser=require('body-parser');
const expenseRouter=require('./router/expense');
const cors=require('cors');

const app=express();
app.use(cors())
app.use(bodypharser.json())
app.use(expenseRouter);
app.use(loginRouter);
app.use(signupRouter);
app.use('/',(req,res,next)=>{
    console.log('fhladshfahds')
    
})
app.listen(3000,()=>{
    console.log('yes listeningngngnnghah')
})