require("dotenv").config();
let express=require("express");
const { connection } = require("./configs/db");
let cors=require("cors")

let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { Usermodel } = require("./models/user.model");
const { authenticate } = require("./middleware/authenticate");
const { Postmodel } = require("./models/post.model");



let app=express();
app.use(express.json());
app.use(cors());





app.get("/",(req,res)=>{
    res.send({msg:"home"})
})

app.post("/signup",async(req,res)=>{

    let {name,email,password}=req.body
    let user=await Usermodel.findOne({email})
if(user){
    res.send({msg:"pls login"})
}   else{
    try{
        let hash=bcrypt.hashSync(password,4);
await Usermodel.create({name,email,password:hash})
res.send({msg:"user sign up success"})        
    }catch(err){
        res.send({msg:"error to sign up"})
    }
}
})

app.post("/login",async(req,res)=>{
let {email,password}=req.body;
let user=await Usermodel.findOne({email});
if(user){
try{
let userpass=user.password;
let match=bcrypt.compareSync(password,userpass);
if(match){
    let token=jwt.sign({userID:user._id},process.env.SECRET_KEY);
    res.send({msg:"login success",token})
}else{
    res.send({msg:"invalid credentials"})
}
}catch(err){
    res.send({msg:"login failed"})
}
}else{
    res.send({msg:"sign up first"});
}

})


app.get('/products', async(req,res)=>{
    res.send({msg:"data"});
})





app.listen(process.env.PORT,()=>{
    connection()
    console.log("listening at port 8080")
})