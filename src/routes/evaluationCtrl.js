
var express=require('express');
var router=express.Router();
var evaluationService=require('../services/evaluationService');
var fs=require('fs');
const { throws } = require('assert');


router.get('/list', async (req, res)=>{
    
    var codeProf=req.session.prof_annee.codeprof; //implementer apres session
    var codeAnnee='8' //implementer apres session
    var who_done = req.session.user.nom_prenom;
    cour=await evaluationService.listByProfAndAnne(codeProf, codeAnnee);
    evaluations= await evaluationService.list(codeProf, codeAnnee);
    res.render('evaluation/list',{
        cour:cour,
        evaluations:evaluations,
        who_done:who_done,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/save',  async (req, res)=>{
    //const {nom, file}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var codeAnnee='8'//A implementer apres session
    var directory="C:/Users/ABDALLAH/Documents/Projet/public/cours/"+codeAnnee;

    //var rs=await moduleService2.insert(nom, file, who_done, when_done);
    
    const { cours } = req.body;

      fs.exists(directory, (err, data)=>{
        if (!err)
        fs.mkdir(directory, function(err, data){
            console.log("Directory is created.");
        });

      });

    fs.writeFile(directory+"/"+req.files.fichier.name, req.files.fichier.data, (err) => {
       // if (err) throw err;
        var rs= evaluationService.insert(req.files.fichier.name, cours, who_done, when_done, directory+"/"+req.files.fichier.name).then(function(result){
            if(!result){
                req.flash('error', "evaluation non ajouté");
                res.redirect('/evaluation/list');
        res.redirect('/evaluation/list');
            }else{
                req.flash('success', "evaluation ajouté avec success");
                res.redirect('/evaluation/list');
            }
        });
        
      });
 

});




module.exports=router;