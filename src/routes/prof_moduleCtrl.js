var professeurService=require('../services/professeurService');
var moduleService=require('../services/moduleService');
var anneeService=require('../services/anneeService');
var prof_moduleService=require('../services/prof_moduleService');
var sectionService =require('../services/sectionService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var professeurs= await professeurService.list();
    var modules= await moduleService.list();
    var annees= await anneeService.list();
    var annee= await anneeService.getAnneEnCours();
    var prof_modules= await prof_moduleService.list();
    var sections=await sectionService.list();
    var prof_module=[];
    

    if(req.params.id !=null){
        prof_module= await prof_moduleService.getById(req.params.id);
    }

    res.render('profModules/list',{
        professeurs:professeurs,
        modules: modules,
        annees: annees,
        annee:annee.shift(),
        prof_modules: prof_modules,
        viewMode:req.params.viewMode,
        prof_module:prof_module.shift(),
        sections:sections,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


router.post('/save', async (req, res)=>{
    const {professeur, module, annee,section}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();

    var prof_moduleCheck= await prof_moduleService.getByProfesseurAndModuleandAnnee(professeur, module, annee);
    if(prof_moduleCheck.rowCount> 0){
        req.flash('error', "Cette section existe deja");
        res.redirect('/profmodule/list/CREATE');
    }else{
         var rs=await prof_moduleService.insert(professeur, module, annee, who_done, when_done, section);

    if(rs.rowCount==1){
        req.flash('success', "Module programmé avec success");
        res.redirect('/profmodule/list/CREATE');
    }else{
        req.flash('error', "Module programmé non ajouté");
        res.redirect('/profmodule/list/CREATE');
    }
    }
});

router.post('/edit', async (req, res)=>{
    const {professeur, module, annee, id}=req.body;

    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var prof_moduleCheck= await prof_moduleService.getByProfesseurAndModuleandAnnee(professeur, module, annee);
    if(prof_moduleCheck.rowCount> 0){
        req.flash('error', "Cette section existe deja");
        res.redirect('/profmodule/list/CREATE');
    }else{  
    var rs=await prof_moduleService.edit(professeur, module, annee, who_done, when_done, section, id);
    if(rs.rowCount==1){
        req.flash('success', "Section modiifer avec success");
        res.redirect('/profmodule/list/CREATE');
    }else{
        req.flash('error', "Section non modifie");
        res.redirect('/profmodule/list/CREATE');
    }
}

});
router.get('/delete/:id?', async (req, res)=>{
    
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    
    var rs=await prof_moduleService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Etudiant de la section supprimer avec success");
        res.redirect('/profmodule/list/CREATE');
    }else{
        req.flash('error', "Etudiant de la section non supprimer");
        res.redirect('/profmodule/list/CREATE');
    }

});


module.exports=router;