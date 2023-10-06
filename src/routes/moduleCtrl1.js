
var express=require('express');
var router=express.Router();
var moduleService1=require('../services/moduleService1');



router.get('/list', async (req, res)=>{
    var codesect= req.session.etudiant_section.codesect; //A implementer apres session
    var codeAnnee='8'//A implementer apres session
    var cours=await moduleService1.list(codesect, codeAnnee);
    var who_done = req.session.user.nom_prenom;
    res.render('modules/list1',{
        cours:cours,
        who_done:who_done,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


module.exports=router;