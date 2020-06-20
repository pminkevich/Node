const router=require('express').Router();
const validation=require('./tokenValidation');
const User=require('../model/user');


router.get('/',validation,async (req,res)=>{

    
    const usuario=await User.findOne({_id: req.user});
    res.send(usuario);
})


module.exports=router;