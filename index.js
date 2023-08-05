const express = require("express");

const cors = require("cors")

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { BlogRouter } = require("./routes/blog.route");
const { authentication } = require("./middleWares/authentication");


const app = express();
app.use(express.json())

app.use(cors({
    origin : 'http://127.0.0.1:5173'
}))

app.get("/", (req, res)=>{
    res.send("HomePage.")
})

app.use("/user", userRouter)
app.use("/blog",authentication, BlogRouter)

// let PORT = 8500;

app.listen(4000, async()=>{

    try {
        await connection
        console.log("Connected to db.")
        
    } catch (error) {
        console.log("Failed to connect db server.")
        console.log(error)
        
    }
    console.log(`Server started on port 4000`);
})