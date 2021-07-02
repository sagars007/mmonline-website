const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes/comments');
const User=require('../models/mongoose');


module.exports.create=async function(req,res){
    // console.log("this is user!!! ",req.user._id);
    let post=await  Post.findById(req.body.post);
    if(post)
    {
        
        try{
            let comment=await Comment.create({
                comment:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            let user1=await User.findById(post.user._id);
            req.flash('success','Comment Created');

            post.save();
            post.Comments.push(comment);
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            
            
            
            
                    //this command saves it in the database
                   
            res.redirect('/');

        }catch(err)
        {
                console.log("this is error at line 25 in comment_controller");
        }
        
    }
    // Post.findById(req.body.post,function(err,post)
    // {
    //     if(post)
    //     {
    //         Comment.create({
    //             comment:req.body.content,
    //             post:req.body.post,
    //             user:req.user._id
    //         },function(err,comment)
    //         {
    //             if(err)
    //             {
    //                 console.log('Comment error',err);
    //                 return;
    //             }
    //             post.Comments.push(comment);
    //             post.save();
    //             //this command saves it in the database
    //             res.redirect('/');
    //         });
    //     }
    // });
}


module.exports.destroy=async function(req,res)
{
    let  comment= await Comment.findById(req.params.id);
    try{
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{Comments:req.params.id}});
            req.flash('success',comment.comment+' : this comment is removed');
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log("this is error at line 61 in comment_controller");
    }

    // Comment.findById(req.params.id,function(err,comment)
    // {
    //     if(err)
    //     {
    //         console.log(err,"There is an error !!")
    //     }
    //     if(comment.user==req.user.id)
    //     {
    //         //save post id in another variable
    //         let postId=comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId,{$pull:{Comments:req.params.id}},function(err,post)
    //         {
    //             return res.redirect('back');
    //         })
    // }else{
    //     return res.redirect('back');
    // }})
}
