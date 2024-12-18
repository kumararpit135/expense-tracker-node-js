const jwt=require('jsonwebtoken')

function verifyToken(req,res,next){
    const token=req.headers['authorization']
    console.log("IN the middlware")
    if(!token){
        return res.status(400).json({message:"Token is not found "})
    }
    jwt.verify(token,'fasdfsdfsdf465s4df654s6df4s654f6asd654f6sf',(err,env)=>{
        if(err){
            return res.status(400).json({message:"not done "})
        }
        //console.log(env,'dfkjhksdhfks')
        req.user=env;
        next()
    })
    

}
module.exports=verifyToken;