const express= require("express");
const bodyParser= require("body-parser");

const Post =require("./models/post");
const mongoose =require("mongoose");

const app= express();

mongoose.connect("mongodb+srv://projam:icBcJWLadGu4ix8f@cluster0.zpaa0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(()=> {
        console.log('Connected to database!'); 
    })
    .catch(()=>{
        console.log('Connection failed!');
    });

app.use(bodyParser.json());

app.use((req, res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req,res,next)=>{
    const post=new Post({
        pname: req.body.pname,
        desc: req.body.desc,
        psize: req.body.psize
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req,res,next)=>{
    Post.find().then(documents=>{
        res.status(200).json({
            message: 'Posts fected successfully',
            posts:documents
    })
    
    });

});

app.delete("/api/posts/:delname", (req, res, next) =>{
    Post.deleteOne({pname: req.params.delname}).then(result =>{
        console.log(result);
        res.status(200).json({message:'Post deleted'});
    });
    
});


module.exports= app;






