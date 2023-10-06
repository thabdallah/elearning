
var express=require('express');
var router=express.Router();
var moduleService2=require('../services/moduleService2');
var fs=require('fs');
const { throws } = require('assert');


router.get('/list', async (req, res)=>{
    var codeProf=req.session.prof_annee.codeprof;
    var codeAnnee='8';//A implementer apres session
    var who_done = req.session.user.nom_prenom;
    cour=await moduleService2.listByProfAndAnne(codeProf, codeAnnee);
    cours=await moduleService2.list(codeProf, codeAnnee);
    res.render('modules/list2', {
        cour:cour,
        cours:cours,
        who_done:who_done,
        result: {error: req.flash('error'), success: req.flash('success')}
       }) 
});

router.post('/save',  async (req, res)=>{
    //const {nom, file}=req.body;
    var who_done=req.session.user.nom_prenom;;
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
        var rs= moduleService2.insert(prof_module, req.files.fichier.name, directory+"/"+req.files.fichier.name, who_done, when_done).then(function(result){
            if(!result){
                req.flash('error', "module non ajouté");
                console.log(err);
        res.redirect('/module2/list');
            }else{
                req.flash('success', "module ajouté avec success");
               res.redirect('/module2/list');
            }
        });
        
      });
});

module.exports=router;