let mongoose=require("mongoose");

let postschema=new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["done","pending"],
        default:"pending"
    },
    tags:{
        type:String,
        enum:["personal","family","oficial"],
        default:"personal"
    },
    userID:{
        type:String
    }
})

let Postmodel=mongoose.model("post",postschema);

module.exports={
    Postmodel
}