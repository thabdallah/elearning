var noteService = require('../services/noteService');
var express=require('express');
var router=express.Router();



router.get('/list', async (req, res)=>{
    
    res.render('etudiants/list_note',{
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


module.exports=router;