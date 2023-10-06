var utilisateurService=require('../services/utilisateurService');
var anneeService=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var utilisateurs= await utilisateurService.list();
    var utilisateur=[];
    var annee= await anneeService.getAnneEnCours();
    if(req.params.id !=null){
        utilisateur= await utilisateurService.getById(req.params.id);
    }
    res.render('utilisateurs/list',{
        utilisateurs:  utilisateurs,
        viewMode:req.params.viewMode,
        utilisateur: utilisateur.shift(),
        annee: annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/save', async (req, res)=>{
    const {nom, prenom, login, motdepasse, profile}=req.body;
    var who_done= req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await utilisateurService.insert(nom, prenom, login, motdepasse, profile, who_done, when_done);
    if(rs.rowCount==1){
        req.flash('success', "Utilisateur ajouté avec success");
        res.redirect('/utilisateur/list/CREATE');
    }else{
        req.flash('error', "Utilisateur non ajouté");
        res.redirect('/utilisateur/list/CREATE');
    }
});

router.post('/edit', async (req, res)=>{
    const {login, motdepasse, profile, id}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await utilisateurService.edit(login, motdepasse, profile, who_done, when_done, id);
    if(rs.rowCount==1){
        req.flash('success', "Utilisateur modiifer avec success");
        res.redirect('/utilisateur/list/CREATE');
    }else{
        req.flash('error', "Utilisateur non modifie");
        res.redirect('/utilisateur/list/CREATE');
    }
});

router.get('/active/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var active="true";
    var rs=await utilisateurService.active(who_done, when_done, active,id);
    if(rs.rowCount==1){
        req.flash('success', "Ce compte est activé avec success");
        res.redirect('/utilisateur/list/CREATE');
    }else{
        req.flash('error', "Ce compte ne pas desactivé");
        res.redirect('/utilisateur/list/CREATE');
    }
});

router.get('/desactive/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var active="false";
    var rs=await utilisateurService.active(who_done, when_done, active,id);
    if(rs.rowCount==1){
        req.flash('success', "Ce compte est desactivé avec success");
        res.redirect('/utilisateur/list/CREATE');
    }else{
        req.flash('error', "Ce compte ne pas desactivé");
        res.redirect('/utilisateur/list/CREATE');
    }

});
router.get('/reinitialise/:id?', async (req, res)=>{
    var id=req.params.id;
    var motdepasse=1234;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var rs=await utilisateurService.reinitialise(motdepasse,who_done, when_done,id);
    if(rs.rowCount==1){
        req.flash('success', "mot de passe reinitialisé avec success");
        res.redirect('/utilisateur/list/CREATE');
    }else{
        req.flash('error', "mot de passe ne pas reinitialisé");
        res.redirect('/utilisateur/list/CREATE');
    }
});

module.exports=router;