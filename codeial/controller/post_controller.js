const { response } = require("express")
const User = require("../models/mongoose");
const Post=require("../models/post");
const Comment=require("../models/comment")

module.exports.posting=async function(req,res)
{
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success','post is created');

        return res.redirect('back');
    }catch(err)
    {
        console.log('error at line 12 in post_controller',err);
    }
    
   
    /*
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post)
    {
        if(err){
            console.log("error in post");
            return;

        }
        return res.redirect('back');
    })*/
}

module.exports.destroy=async function(req,res)
{
    let post=await Post.findById(req.params.id);
    try{
        if(post.user==req.user.id){
            
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','post is removed');
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log('error at line 75 in post_controller',err);
    }
    /* async awaited
    Post.findById(req.params.id,function(err,post){
        //dot id means object id into string
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err)
            {
                return res.redirect('back');
            });}else{
                return res.redirect('back');
            }

        })*/
}