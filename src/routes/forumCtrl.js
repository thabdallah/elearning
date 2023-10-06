var forumService=require('../services/forumService');
var express=require('express');
const { route } = require('./utilisateurCtrl');
var router=express.Router();

router.get('/list', async(req, res)=>{
    res.render('forums/list',{
    result:{error:req.flash('error'), success:req.flash('success')}
    })
})

module.exports=router;