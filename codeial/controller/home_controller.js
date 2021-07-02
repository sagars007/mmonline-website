const { populate } = require('../models/post');
const Post=require('../models/post');
const User=require('../models/mongoose');
module.exports.home=async function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',25);
    // return res.render('home.ejs');
    // Post.find({},function(err,posts)
    // {
    // return res.render('home',{
    //     title:"Buzz Konnect Home",
    //     posts:posts
    // });
    try{
        let posts=await Post.find({})
        .populate('user')
        .populate({

            path:'Comments',
            populate:{
                path:'user'
            }
        });
        let users=await User.find({});
        return res.render('home',{
            title:"MM Online HOME",
            posts:posts,
            all_users:users
        });
    }catch(err)
    {
        console.log(err,' Error at line 33 in home_controller');
    }
        

   /*Post.find({})
    .populate('user')
    .populate({

        path:'Comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts)
    {
            User.find({},function(err,users)
            {
                return res.render('home',{
                    title:"Buzz Konnect Home",
                    posts:posts,
                    All_Users:users
                });

            })
            
    
    });*/
};



module.exports.page=function(req,res)
{
    return res.send('<h1>hai thats it</h1>');

}

module.exports.find=function(req,res)
{
        console.log('function is called hellllllll****************');
        console.log(req.body);        
}