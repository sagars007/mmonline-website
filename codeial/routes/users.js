const express=require('express');
const router=express.Router();
const userController=require('../controller/users_controller');
const passport = require('passport');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.get('/signin',userController.signIn);
router.get('/signup',userController.signUp);

router.post('/create',userController.create);
router.post('/update/:id',passport.checkAuthentication,userController.update);

//posting comments
// router.post('/postit',);

console.log('user.js controller');
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),userController.createSessions);

router.get('/signout',userController.destrroySession);
module.exports=router;
