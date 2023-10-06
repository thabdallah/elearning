var sectionService=require('../services/sectionService');
var filiereService=require('../services/filiereService');
var niveauService=require('../services/niveauService');
var anneeServive=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var sections= await sectionService.list();
    var niveaux= await niveauService.list();
    var filieres= await filiereService.list();
    var annee= await anneeServive.getAnneEnCours();
    var section=[];

    if(req.params.id !=null){
        section= await sectionService.getById(req.params.id);
    }

    res.render('sections/list',{
        filieres:filieres,
        niveaux: niveaux,
        sections: sections,
        viewMode:req.params.viewMode,
        section:section.shift(),
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


router.post('/save', async (req, res)=>{
    const {filiere, niveau}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();

    var sectionCheck= await sectionService.getByNiveauAndFiliere(filiere, niveau);
    if(sectionCheck.rowCount> 0){
        req.flash('error', "Cette section existe deja");
        res.redirect('/section/list/CREATE');
    }else{
         var rs=await sectionService.insert(filiere,niveau, who_done, when_done);

    if(rs.rowCount==1){
        req.flash('success', "Section ajouté avec success");
        res.redirect('/section/list/CREATE');
    }else{
        req.flash('error', "Section non ajouté");
        res.redirect('/section/list/CREATE');
    }
    }
});

router.post('/edit', async (req, res)=>{
    const {filiere, niveau, id}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var sectionCheck= await sectionService.getByNiveauAndFiliere(filiere, niveau);
    if(sectionCheck.rowCount> 0){
        req.flash('error', "Cette section existe deja");
        res.redirect('/section/list/CREATE');
    } else{
    var rs=await sectionService.edit(filiere,niveau, who_done, when_done, id);

    if(rs.rowCount==1){
        req.flash('success', "Section modiifer avec success");
        res.redirect('/section/list/CREATE');
    }else{
        req.flash('error', "Section non modifie");
        res.redirect('/section/list/CREATE');
    }
}

});
router.get('/delete/:id?', async (req, res)=>{
    
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    
    var rs=await sectionService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Section supprimer avec success");
        res.redirect('/section/list/CREATE');
    }else{
        req.flash('error', "Section non supprimer");
        res.redirect('/section/list/CREATE');
    }

});

module.exports=router;