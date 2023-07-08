
let mongoose=require("mongoose");
let connection=()=>{
   try{ mongoose.connect(process.env.MONGO_URL);
console.log("Connnected to Atlas DB ")
}
   catch(err){
    console.log("Error connecting to Atlas DB")
   }
}

module.exports={
    connection
}