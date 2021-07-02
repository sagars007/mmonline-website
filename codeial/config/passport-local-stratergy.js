const passport=require('passport');
const LocalStratergy=require('passport-local').Strategy;
const User=require('../models/mongoose')
//autheentication using passport
passport.use(new LocalStratergy({
    usernameField: 'email' ,
    passReqToCallback:true
},
    function(req,email,password,done){
        //find a user and establish the identity
        // console.log('Local Startergy');
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                req.flash('error',err);
                console.log('error');
                return done(err);
            }
            if(!user || user.password!=password)
            {
                req.flash('error','error invalid username or password');
                console.log('invalid username / password');
                return done(null,false);
            }
            
            return done(null,user);
        });
    }
));

//serial user function
//serialize the user to decide which key is yo be 
//kept in cookies
passport.serializeUser(function(user,done)
{
    
    // console.log('serialise User');
    done(null,user.id);
});

//deserialise user
passport.deserializeUser(function(id,done)
{
    // console.log('Desiralise User');
    User.findById(id,function(err,user){
        if(err)
        {
            // console.log('error');
            return done(err);
        }
        
        return done(null,user);
    })
   
})

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    console.log('Check Authentication');
    //if the user is signed in,then pass on the req to next functyion (controllers action)
    if(req.isAuthenticated())
    {
        return next();
    }
    //is user is not signed in

    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    console.log('Set Authentication');
    // console.log(res.locals);
    if(req.isAuthenticated())
    {
        // console.log("Set Auth",req.isAuthenticated());
        
        //req.user contains the current signed in user from the session cookie and we are just sending to this to the locals for the views
        res.locals.user=req.user;
       // console.log(res.locals);
    //    console.log("THIS IS USER ID !!!!",req.user);
    }
   
    next();
}


module.exports=passport;