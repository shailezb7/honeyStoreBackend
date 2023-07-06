require("dotenv").config();
let express=require("express");
const { connection } = require("./configs/db");
let cors=require("cors")

let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { Usermodel } = require("./models/user.model");
const { authenticate } = require("./middleware/authenticate");
const { Postmodel } = require("./models/post.model");
const { authorization } = require("./middleware/authorization");
// const { authorization } = require("./middleware/authorization");


let app=express();
app.use(express.json());
app.use(cors());





app.get("/",(req,res)=>{
    res.send({msg:"home"})
})

app.post("/signup",async(req,res)=>{

    let {name,email,password,ipaddress}=req.body
    let user=await Usermodel.findOne({email})
if(user){
    res.send({msg:"pls login"})
}   else{
    try{
        let hash=bcrypt.hashSync(password,4);
await Usermodel.create({name,email,password:hash,ipaddress})
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


app.post("/create/todo",authenticate,async(req,res)=>{
    let {taskname,status,tags}=req.body;

await Postmodel.create({taskname,status,tags,userID:req.userID})
    res.send({msg:"post created"})
})


app.put("/update/todo/:todoID",authenticate,authorization,async(req,res)=>{
    let {status}=req.body;
    let {todoID}=req.params;
    try{
        await Postmodel.findByIdAndUpdate({_id:todoID},{status})
        res.send({msg:"post updated"})
    }catch(Err){
res.send({msg:"error in put"})
    }
})


app.delete("/delete/todo/:todoID",authenticate,authorization,async(req,res)=>{
    let {todoID}=req.params;

    try{
        await Postmodel.findByIdAndDelete({_id:todoID})
        res.send({msg:"todo deleted"})
    }catch(Err){
res.send({msg:"error in delete"})
    }
})

app.get("/todos",authenticate,async(req,res)=>{
    let {status,tags}=req.query
    if(status && tags){
        let todos=   await Postmodel.find({userID:req.userID,status,tags});
        res.send({msg:"sucess",data:todos})
    }else if(status){
        let todos=   await Postmodel.find({userID:req.userID,status});
        res.send({msg:"sucess",data:todos})
    }else if(tags){
        let todos=   await Postmodel.find({userID:req.userID,tags});
        res.send({msg:"sucess",data:todos})
    }else{
     let todos=   await Postmodel.find({userID:req.userID});
     res.send({msg:"sucess",data:todos})
    }
})







app.listen(process.env.PORT,()=>{
    connection()
    console.log("listening at port 8080")
})