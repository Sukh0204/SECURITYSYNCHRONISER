const express= require('express');
const router= express.Router();
//add controller
const homeController= require('../controller/home_controller.js');

console.log('router is loaded');
router.get('/', homeController.home);
module.exports=router;