const express = require("express");
const mongoose = require("mongoose")
const app = express();
const router = require("./route/todolist")
const cors = require("cors")

const PORT = 8001;

mongoose.connect("mongodb://127.0.0.1:27017/todolist")
.then(()=>console.log("Mongodb Connected"))


// app.get("/", (req,res)=>{
//     return res.send("harash")
// })
app.use(cors());
app.use(express.json())
app.use("/todo",router);


app.listen(PORT,()=>console.log(`Started Server at PORT: ${PORT}`))


