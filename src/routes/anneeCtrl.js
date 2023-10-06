var anneeService=require('../services/anneeService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var annees= await anneeService.list();
    var anneee= await anneeService.getAnneEnCours();
    var annee=[];

    if(req.params.id !=null){
        annee= await anneeService.getById(req.params.id);
    }
    res.render('annees/list',{
        annees: annees,
        viewMode:req.params.viewMode,
        annee: annee.shift(),
        anneee: anneee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.get('/annee-en-cours', async (req, res)=>{
    var annee= await anneeService.getAnneEnCours();
    var annees=await anneeService.list();

    res.render('annees/ancour',{
        annee: annee.shift(),
        annees: annees,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});


router.post('/save', async (req, res)=>{
    const {annee}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var anneescolaireCheck= await anneeService.getByAnnee(annee);
    if(anneescolaireCheck.rowCount> 0){
        req.flash('error', "Cette année existe deja");
        res.redirect('/annee/list/CREATE');
    }else{
    var rs=await anneeService.insert(annee,who_done,when_done);
    if(rs.rowCount==1){
        req.flash('success', "Année ajouté avec success");
        res.redirect('/annee/list/CREATE');
    }else{
        req.flash('error', "Année non ajouté");
        res.redirect('/annee/list/CREATE');
    }
    }

});


router.post('/en-cours', async (req, res)=>{
    const annee=req.body.annee;
  
    var rs=await anneeService.updateAnneeEnCours(annee);
    if(rs.rowCount==1){
        req.flash('success', "Année en cours mis à jours avec success");
        res.redirect('/annee/annee-en-cours');
    }else{
        req.flash('error', "Année en cours non mis à jour");
        res.redirect('/annee/annee-en-cours');
    }

});

router.post('/edit', async (req, res)=>{
    const {annee, id}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var rs=await anneeService.edit(annee,who_done,when_done,id);
    if(rs.rowCount==1){
        req.flash('success', "Année modiifer avec success");
        res.redirect('/annee/list/CREATE');
    }else{
        req.flash('error', "Année non modifie");
        res.redirect('/annee/list/CREATE');
    }

});
router.get('/delete/:id?', async (req, res)=>{
    
    var id=req.params.id;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    
    var rs=await anneeService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Année supprimer avec success");
        res.redirect('/annee/list/CREATE');
    }else{
        req.flash('error', "Année non supprimer");
        res.redirect('/annee/list/CREATE');
    }

});

module.exports=router;