require('dotenv').config();
const express = require("express");
const userRouter = require("./api/users/user.router");
const postRouter = require("./api/posts/post.router");
const app = express();


app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/api", (req,res) => {
    res.json({
        success:1,
        message:"this is rest api working"
    })
})

app.listen(process.env.APP_PORT, () =>{
    console.log("server up and running on port : ", process.env.APP_PORT)
})