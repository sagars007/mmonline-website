const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const signUpschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:
    {
        type:String
    },
    caste:
    {
        type:String
    },
    gender:
    {
        type:String 
    },
    country:
    {
        type:String
    },
    occup:
    {
        type:String
    },
    edu:
    {
        type:String
    },
    ssign:
    {
        type:String
    },
    moreabout:
    {
        type:String
    }
},{
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('__dirname','..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

signUpschema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
signUpschema.statics.avatarPath=AVATAR_PATH;


const User=mongoose.model('User',signUpschema);
module.exports=User;