const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});
//include the array of ids all comments un the post schema itself
 const Comment=mongoose.model('Comment',commentSchema);
 module.exports=Comment;