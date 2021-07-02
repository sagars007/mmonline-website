const express=require('express');
const homeController=require('../controller/home_controller');



const router=express.Router();

//add list of routes each route should have route here
router.get('/',homeController.home);
router.get('/search',homeController.find);
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));

module.exports=router;