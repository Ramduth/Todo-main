const express=require("express")
const bodyparser=require("body-parser");
const app=express()
const port = process.env.PORT || 4000 
const cors=require("cors")
app.use(bodyparser.json())
const route=require("./routes/auth")
app.use(cors())
app.use("/",route)
const db=require("./config/db")
app.listen(port,function() {
    console.log("port is working on 4000");
    
})