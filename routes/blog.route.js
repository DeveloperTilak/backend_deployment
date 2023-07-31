const {Router} = require("express");



const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");


const BlogRouter = Router();





BlogRouter.get("/", async (req, res)=>{

    const blog = await BlogModel.find();

    res.send({"message": "your blogs", "blog":blog})
})


BlogRouter.get("/create", async(req,res)=>{

    const {title,description} = req.body;
    console.log(req.body)

    const userId = req.userId;
    console.log(userId)
    const user = await UserModel.findOne({_id: userId})

    const new_blog = new BlogModel({
        title,
        description,
        author_name: user.name,
        author_email: user.email

    })
    console.log(new_blog)
    await new_blog.save();
    res.status(200).send("Blog Created")

    


})

BlogRouter.delete("/delete/:blogID", async(req,res)=>{

    const blogID = req.params.blogID;


    const user_id = req.userId;

    const user = await UserModel.findOne({_id: user_id})

    const user_email = user.email;

    const blog = await BlogModel.findOne({_id: blogID})


    const blog_author_email = blog.author_email;


    if(user_email != blog_author_email){
        res.send({"message": "you are not authorized"})
    }else{
        await BlogModel.findByIdAndDelete(blogID)
        res.send(`blog ${blogID} deleted`)
    }
})
BlogRouter.put("/edit/:blogID", async(req,res)=>{

    const blogID = req.params.blogID;

    const payload  = req.body;

    const user_id = req.userId;

    const user = await UserModel.findOne({_id: user_id})

    const user_email = user.email;

    const blog = await BlogModel.findOne({_id: blogID})


    const blog_author_email = blog.author_email;


    if(user_email != blog_author_email){
        res.send({"message": "you are not authorized"})
    }else{
        await BlogModel.findByIdAndUpdate(blogID, payload)
        res.send(`blog ${blogID} updated`)
    }
})

module.exports = {BlogRouter}