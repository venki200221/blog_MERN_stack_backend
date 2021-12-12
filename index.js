const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/Posts");
const categoryRoute=require("./routes/categories");
const multer=require("multer");
const path=require("path");



dotenv.config();

app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))


mongoose.connect(process.env.Mongo_URL,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Conected to mongo DB");
    }
});

const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
       cb(null,"images")
   },
   filename:(req,file,cb)=>{
       cb(null,req.body.name)
   },
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("image has been uploaded")
});



app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);

app.listen("3000",()=>{
    console.log("Server sucessfully ported on port 3000");
});