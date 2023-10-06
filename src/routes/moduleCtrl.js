var moduleService=require('../services/moduleService');
var anneeService=require('../services/anneeService');
// var sectionService =require('../services/sectionService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var modules= await moduleService.list();
    var annee=await anneeService.getAnneEnCours();
    // var sections=await sectionService.list();
    var module=[];

    if(req.params.id !=null){
        module= await moduleService.getById(req.params.id);
    }
    res.render('modules/list',{
        modules:  modules,
        viewMode:req.params.viewMode,
        module: module.shift(),
        annee:annee.shift(),
        // sections:sections,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});
router.post('/save', async (req, res)=>{
    const {nom, duree, coeficient, section}=req.body;
    var who_done= req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await moduleService.insert(nom, duree, coeficient, who_done, when_done);
    if(rs.rowCount==1){
        req.flash('success', "module ajouté avec success");
        res.redirect('/module/list/CREATE');
    }else{
        req.flash('error', "module non ajouté");
        res.redirect('/module/list/CREATE');
    }

});

router.post('/edit', async (req, res)=>{
    const { nom, duree, coeficient, id}=req.body;
    var who_done=req.session.user.nom_prenom;
    var when_done= new Date();
    var rs=await moduleService.edit( nom, duree, coeficient, who_done, when_done, id);
    if(rs.rowCount==1){
        req.flash('success', "module modiifer avec success");
        res.redirect('/module/list/CREATE');
    }else{
        req.flash('error', "module non modifie");
        res.redirect('/module/list/CREATE');
    }
});

module.exports=router;