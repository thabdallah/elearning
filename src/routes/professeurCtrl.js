var professeurService=require('../services/professeurService');
var anneeService=require('../services/anneeService');
var utilisateurService=require('../services/utilisateurService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var professeurs= await professeurService.list();
    var annee = await anneeService.getAnneEnCours();
    var professeur=[];

    if(req.params.id !=null){
        professeur= await professeurService.getById(req.params.id);
    }
    res.render('professeurs/list',{
        professeurs:  professeurs,
        viewMode:req.params.viewMode,
        professeur: professeur.shift(),
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


router.post('/save', async (req, res)=>{
    const {nom, prenom, adresse, diplome, mail, specialite}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var professeurCheck= await professeurService.getByProfesseur(nom, prenom, adresse, diplome, mail, specialite);
    if(professeurCheck.rowCount> 0){
        req.flash('error', "Ce professeur existe deja");
        res.redirect('/professeur/list/CREATE');
    }else{
        var rs=await professeurService.insert(nom, prenom, adresse, diplome, mail, specialite, who_done, when_done);
        var code = rs.rows[0].id_professeur;
        // console.log(code);
    if(rs.rowCount==1){
        var resultUtilisateur=await utilisateurService.insert(nom, prenom, mail, 1234, 'professeur', who_done, when_done, code);
        if (resultUtilisateur.rowCount==1) {
        req.flash('success', "Professeur ajouté avec success");
        res.redirect('/professeur/list/CREATE');
    }
    }else{
        req.flash('error', "Professeur non ajouté");
        res.redirect('/professeur/list/CREATE');
    }
    }

});

router.post('/edit', async (req, res)=>{
    const { nom, prenom, adresse, diplome, mail, specialite, id}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var professeurCheck= await professeurService.getByProfesseur(nom, prenom, adresse, diplome, mail, specialite);
    if(professeurCheck.rowCount> 0){
        req.flash('error', "Ce professeur existe deja");
        res.redirect('/professeur/list/CREATE');
    }else{
    var rs=await professeurService.edit(nom, prenom, adresse, diplome, mail, specialite, who_done, when_done, id);
    if(rs.rowCount==1){
        req.flash('success', "Professeur modiifer avec success");
        res.redirect('/professeur/list/CREATE');
    }else{
        req.flash('error', "Professeur non modifie");
        res.redirect('/professeur/list/CREATE');
    }
    }

});
router.get('/delete/:id?', async (req, res)=>{
    
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom;//a implater apres session
    var when_done=new Date();
    var deleted="true";
    
    var rs=await professeurService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Professeur supprimer avec success");
        res.redirect('/professeur/list/CREATE');
    }else{
        req.flash('error', "Professeur non supprimer");
        res.redirect('/professeur/list/CREATE');
    }

});
module.exports=router;