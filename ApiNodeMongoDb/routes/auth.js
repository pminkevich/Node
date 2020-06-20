const router=require('express').Router();
const User=require('../model/user');
const {regValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');



router.post('/register', async (req,res)=>{
    
    //valido antes de grabar
    const {error}=regValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //chequeo que no haya un mail repetido
    const emailExist= await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('El mail ya Existe');

    //hash pasworrd
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);


    //creando nuevo usuario
    const user=new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    
    //grabo usuario
    try{
        const userSaved= await user.save();
        res.send('Usuario Nuevo Guardado');
    }
    catch(err){
        res.status(400).send(err);
    }
    });

    router.post('/login', async (req,res)=>{
        //valido antes de grabar
        const {error}=loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        //chequeo que no haya un mail repetido
        const user= await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Usuario o Password no Valido');
        //chequeo pássword
        const isValid= await bcrypt.compare(req.body.password,user.password);
        if(!isValid) return res.status(400).send('Email o Password no Valido')

        //crear y asignar token
        const token=jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token',token).send(token);
       
    });


module.exports=router;
