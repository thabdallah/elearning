var filiereService=require('../services/filiereService');
var anneeService=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var filieres= await filiereService.list();
    var filiere=[];
    var annee= await anneeService.getAnneEnCours();
    if(req.params.id !=null){
        filiere= await filiereService.getById(req.params.id);
    }
    res.render('filieres/list',{
        filieres:filieres,
        viewMode:req.params.viewMode,
        filiere:filiere.shift(),
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});
router.post('/save', async (req, res)=>{
    const {nomfiliere}=req.body;
    var who_done=req.session.user.nom_prenom;//a implater apres session
    var when_done= new Date();
    var rs=await filiereService.insert(nomfiliere, who_done, when_done);
    if(rs.rowCount==1){
        req.flash('success', "Filiere ajouté avec success");
        res.redirect('/filiere/list/CREATE');
    }else{
        req.flash('error', "filiere non ajouté");
        res.redirect('/filiere/list/CREATE');
    }

});

router.post('/edit', async (req, res)=>{
    const {nomfiliere, id}=req.body;
    var who_done=req.session.user.nom_prenom;//a implater apres session
    var when_done= new Date();
    var rs=await filiereService.edit(nomfiliere, who_done, when_done,id);
    if(rs.rowCount==1){
        req.flash('success', "Etudiant modiifer avec success");
        res.redirect('/filiere/list/CREATE');
    }else{
        req.flash('error', "etudiant non modifie");
        res.redirect('/filiere/list/CREATE');
    }
});
router.get('/delete/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    var rs=await filiereService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Filière supprimer avec success");
        res.redirect('/filiere/list/CREATE');
    }else{
        req.flash('error', "Filière non supprimer");
        res.redirect('/filiere/list/CREATE');
    }
});

module.exports=router;