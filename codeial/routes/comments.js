const express=require('express');
const passport = require('passport');
const router=express.Router();

const commentController=require('../controller/comments_controller');

router.post('/create',commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);



module.exports=router;