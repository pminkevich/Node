const jwt=require('jsonwebtoken');


module.exports=function(req,res,next){

    const token=req.header('auth-token');
    if(!token) res.status(401).send('acceso denegado');

    try
    {
        const verified= jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();

    }
    catch{
        res.status(400).send('token invalido');
    }
}