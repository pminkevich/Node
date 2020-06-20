const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
//importo rutas
const authRoute=require('./routes/auth.js');
const postRoute=require('./routes/post.js');

dotenv.config();
//conecta a la db

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true},
()=>console.log('Conectado a la BD')
);

//Midleware
app.use(express.json());
//rutas middleware
app.use('/api/user',authRoute);
app.use('/api/user/post',postRoute);

app.listen(3000,()=>console.log('Server corriendo'));

