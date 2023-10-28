const express =  require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
require("dotenv").config()

const app =  express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.get("/",(req,res)=>{
    res.send("Testing Server OK")
})

app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log(`Server is running at PORT ${process.env.PORT}` )
    }
    catch(err){
        console.log("Error in connecting to DB")
        console.log(err)
    }
})