
var express=require('express');
var router=express.Router();
var tutorialService=require('../services/tutorialService')
var fs=require('fs');
const { throws } = require('assert');


router.get('/list', async (req, res)=>{
    var codeProf=req.session.prof_annee.codeprof;//A implementer apres session
    var codeAnnee='8'//A implementer apres session
    var who_done = req.session.user.nom_prenom;
    cour=await tutorialService.listByProfAndAnne(codeProf, codeAnnee);
    tutorials=await tutorialService.list(codeProf, codeAnnee);
    res.render('tutorial/list',{
        cour:cour,
        tutorials:tutorials,
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
    
    const { prof_module } = req.body;

      fs.exists(directory, (err, data)=>{
        if (!err)
        fs.mkdir(directory, function(err, data){
            console.log("Directory is created.");
        });

      });

    fs.writeFile(directory+"/"+req.files.fichier.name, req.files.fichier.data, (err) => {
       // if (err) throw err;
        var rs= tutorialService.insert(prof_module, req.files.fichier.name, directory+"/"+req.files.fichier.name, who_done, when_done).then(function(result){
            if(!result){
                req.flash('error', "Tutorial non ajouté");
        res.redirect('/tutorial/list');
            }else{
                req.flash('success', "Tutorial ajouté avec success");
               res.redirect('/tutorial/list');
            }
        });
        
      });
 

});




module.exports=router;