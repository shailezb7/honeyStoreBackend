const { Postmodel } = require("../models/post.model");


let authorization=async(req,res,next)=>{
let {todoID}=req.params;
let todo=await Postmodel.findOne({_id:todoID});
console.log(todo)


let postOwner=todo.userID;
if(postOwner==req.userID){
    next();
}else{
    res.send({msg:"not authorised"})
}



}

module.exports={
    authorization
}