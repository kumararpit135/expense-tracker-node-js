const express=require('express');
const https=require('https');
const signupRouter=require('./router/signup');
const loginRouter=require('./router/login');
const bodypharser=require('body-parser');
const expenseRouter=require('./router/expense');
const ispremium=require("./router/ispremium")
const orderRouter=require('./router/order')
const passwordRouter=require('./router/password');
const helmet=require('helmet');
const compression=require('compression');
const fs=require('fs')
const cors=require('cors');
const morgon=require('morgan');
const path=require('path');
const privekey=fs.readFileSync('server.key')
const certificate=fs.readFileSync('server.cert');


const app=express();
app.use(helmet());
app.use(compression());
app.use(cors());
const accesslogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags :'a'});
app.use(morgon('combined',{stream:accesslogstream}));
app.use(bodypharser.json());
app.use(passwordRouter);
app.use(ispremium);

app.use(expenseRouter);
app.use(orderRouter)
app.use(loginRouter);
app.use(signupRouter);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`views/${req.url}`))
})
app.use('/',(req,res,next)=>{
    console.log('hi how are you i am here for your help in the en dof th request handlesr')
    res.send("fsadflasjdfl")
    
})
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(process.env.PORT || 3000, () => {
    console.log('HTTPS server is running');
});
