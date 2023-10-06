var sectionService=require('../services/sectionService');
var etudiantService=require('../services/etudiantService');
var etudiantSectionService=require('../services/etudiantSectionService');
var anneeService=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var etudiant_sections= await etudiantSectionService.list();
    var annee= await anneeService.getAnneEnCours();
    var sections= await sectionService.list();
    var etudiants= await etudiantService.listEtudiantBySection();
    var etudiant_section=[];
    if(req.params.id !=null){
        etudiant_section= await etudiantSectionService.getById(req.params.id);
    }
    res.render('etudiantSections/list',{
        etudiants:etudiants,
        sections: sections,
        etudiant_sections: etudiant_sections,
        viewMode:req.params.viewMode,
        annee:annee.shift(),
        etudiant_section:etudiant_section.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


router.post('/save', async (req, res)=>{
    const {etudiant, section}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();

    var etudiant_sectionCheck= await etudiantSectionService.getByEtudiantAndSection(etudiant);
    if(etudiant_sectionCheck.rowCount> 0){
        req.flash('error', "Cet Etudant Section existe deja");
        res.redirect('/etudiant_section/list/CREATE');
    }else{
         var rs=await etudiantSectionService.insert(etudiant, section, who_done, when_done);

    if(rs.rowCount==1){
        req.flash('success', "Etudant Section ajouté avec success");
        res.redirect('/etudiant_section/list/CREATE');
    }else{
        req.flash('error', "Etudant Section non ajouté");
        res.redirect('/etudiant_section/list/CREATE');
    }
    }

});

router.post('/edit', async (req, res)=>{
    const {etudiant, section, id}=req.body;

    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var etudiant_sectionCheck= await etudiantSectionService.getByEtudiantAndSection(etudiant, section);
    if(etudiant_sectionCheck.rowCount> 0){
        req.flash('error', "Cet Etudant Section existe deja");
        res.redirect('/etudiant_section/list/CREATE');
    }else{
    var rs=await etudiantSectionService.edit(etudiant, section, who_done, when_done, id);

    if(rs.rowCount==1){
        req.flash('success', "Etudant Section modiifer avec success");
        res.redirect('/etudiant_section/list/CREATE');
    }else{
        req.flash('error', "Etudant Section non modifie");
        res.redirect('/etudiant_section/list/CREATE');
    }
    }
});

router.get('/delete/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    var rs=await etudiantSectionService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Etudiant de la section supprimer avec success");
        res.redirect('/etudiant_section/list/CREATE');
    }else{
        req.flash('error', "Etudiant de la section non supprimer");
        res.redirect('/etudiant_section/list/CREATE');
    }
});

module.exports=router;