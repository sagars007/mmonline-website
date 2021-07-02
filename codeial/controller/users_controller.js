const { response } = require("express")
const User = require("../models/mongoose");
const Post=require("../models/post");
const fs=require('fs');//file sysytem
const path=require('path');

module.exports.profile=async function(req,res)
{
    //i am here
    try{
        let user=await User.findById(req.params.id);
        let posts=await Post.find({})
        .populate('user')
        .populate({

            path:'Comments',
            populate:{
                path:'user'
            }
        });
        let users=await User.find({});
        return res.render('_userprofile',{
            title:'User Profile',
            posts:posts,
            all_users:users,
            profile_user:user});
    }catch(err)
    {
        console.log('error at line 11 in users_controller',err);
    }
    /*
        User.findById(req.params.id,function(err,user){
            return res.render('_userprofile',{
                title:'User Profile',
                profile_user:user
            });
        });*/
};
module.exports.update=async function(req,res)
{
    if(req.user.id==req.params.id)
    {
        try{
            // let user=await User.findByIdAndUpdate(req.params.id,req.body);
            let user=await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err)
            {
                if(err){console.log('error in avatars******',err)};
                user.name=req.body.name;
                user.email=req.body.email;
                user.caste=req.body.caste;
                user.gender=req.body.gender;
                user.country=req.body.country;
                user.occup=req.body.occup;
                user.edu=req.body.edu;
                user.ssign=req.body.ssign;
                user.moreabout=req.body.moreabout;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');

            })
           
        }catch(err)
        {
            console.log('error at line 11 in users_controller',err);
        }
        
       
        // User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //     return res.redirect('back');
        // });
    }else{
        return res.status(401).send('Unauthorized')
    }
}
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirmPassword)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){
            console.log('error');
            return;
        }
        if(!user)
        {
            User.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            },function(err,user){
                if(err)
                {
                    console.log('error in signinig up ');
                    return;
                }else{
                    return res.redirect('/users/signin');
                }

            })
        }
        else
        {
            return res.redirect('back');

        }
    })

    
}
module.exports.signUp=function(req,res)
{
    console.log(req);
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('_userSignUp.ejs');
}

module.exports.signIn=function(req,res)
{
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('_userSignIn.ejs');
}

module.exports.createSessions=function(req,res)
{
    console.log("after session create",req.isAuthenticated());
    console.log('sesion created');
    req.flash('success','logged-in-successfully');

    return res.redirect('/');
}

module.exports.destrroySession=function(req,res)
{
    console.log('sesion destroyed');
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/users/signin');
}


//posting comments to database


