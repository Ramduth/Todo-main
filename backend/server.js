const express=require("express")
const mongoose = require('mongoose')
const bodyparser=require("body-parser");
const app=express()
const port = process.env.PORT || 4000
require('dotenv').config() 
const cors=require("cors")
app.use(bodyparser.json())
const route=require("./routes/auth")
app.use(cors())
app.use("/",route)
mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log(`Connection Succesfull`))
.catch((err)=> console.log(err))

app.listen(port,function() {
    console.log(`port is working on ${port}`);
    
})