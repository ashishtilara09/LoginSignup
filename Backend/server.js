const express=require("express");
const app=express();
const dotenv=require("dotenv");
const connectDb=require("./DB/databaseconnect");
const cors = require("cors");
const bcrypt = require('bcrypt');
const User = require("./Models/User");

connectDb();
dotenv.config();
app.use(express.json());
app.use(cors());

app.post("/Login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            console.log("typed password is "+password);
            console.log("Database password is "+user.password);
           if(bcrypt.compareSync(password, user.password)){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send({message:"not registered"})
        }
    })
});
app.post("/Signup",(req,res)=>{
    console.log(req.body); 
    var {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            password=bcrypt.hashSync(password, 10);
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Account sucessfully created"})
                }
            })
        }
    })
});


const PORT=process.env.PORT||8080;
app.listen(PORT,console.log(`server started on ${PORT}`));