const express=require('express');
const app=express();
const port=8080;
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const { request } = require('express');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratergy');
const nodeSassMiddleware = require('node-sass-middleware');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customWare=require('./config/middleware');
//static files
app.use(sassMiddleware({
    src:'./assets/scss',//from where to pick up css file for compilation
    dest:'./assets/css',
    debug:true,//when in production put false
    outputStyle:'extended',
    prefix:'/css'//where should look into for css
}))
app.use(express.urlencoded());
app.use(express.static('./assets'))
app.use('/uploads',express.static(__dirname+'/uploads'))

//setting up cookie parser
app.use(cookieParser());

//we tell our app to use it routes views should belong to some sort of layout
app.use(expressLayouts);
//extract styles and script for the subpages
app.set('layout extractStyles', true);
app.set('layout extractScript', true);



//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie in db

app.use(session({
    name:'codeial',
    secret:'babuskainbababla',
    saveUninitialized:false,
    resave:false,
    cookie:{
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connected to mongo db setup');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//this is set up after session cookie
app.use(flash());
app.use(customWare.setFlash);


//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log('error here at line 77 in index.js');
        return;
    }
    console.log('server is running on port:',port)
});

