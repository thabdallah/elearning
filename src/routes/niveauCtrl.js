var niveauService=require('../services/niveauService');
var anneeService=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var niveaux= await niveauService.list();
    var annee= await anneeService.getAnneEnCours();
    var niveau=[];

    if(req.params.id !=null){
        niveau= await niveauService.getById(req.params.id);
    }
    res.render('niveaux/list',{
        niveaux: niveaux,
        viewMode:req.params.viewMode,
        niveau: niveau.shift(),
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});
router.post('/save', async (req, res)=>{
    const {nomNiveau}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await niveauService.insert(nomNiveau, who_done, when_done);
    if(rs.rowCount==1){
        req.flash('success', "Filiere ajouté avec success");
        res.redirect('/niveau/list/CREATE');
    }else{
        req.flash('error', "filiere non ajouté");
        res.redirect('/niveau/list/CREATE');
    }
});

router.post('/edit', async (req, res)=>{
    const {nomNiveau, id}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await niveauService.edit(nomNiveau, who_done, when_done,id);
    if(rs.rowCount==1){
        req.flash('success', "Niveau modiifer avec success");
        res.redirect('/niveau/list/CREATE');
    }else{
        req.flash('error', "Niveau non modifie");
        res.redirect('/niveau/list/CREATE');
    }
});
router.get('/delete/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    
    var rs=await niveauService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Niveau supprimer avec success");
        res.redirect('/niveau/list/CREATE');
    }else{
        req.flash('error', "Niveau non supprimer");
        res.redirect('/niveau/list/CREATE');
    }
});

module.exports=router;