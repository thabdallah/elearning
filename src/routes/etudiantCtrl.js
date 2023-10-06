var etudiantService=require('../services/etudiantService');
var anneeService=require('../services/anneeService');
var utilisateurService=require('../services/utilisateurService');
var express=require('express');
var router=express.Router();



router.get('/list/:viewMode/:id?', async (req, res)=>{
    var etudiants= await etudiantService.list();
    var annee = await anneeService.getAnneEnCours();
    var etudiant=[];

    if(req.params.id !=null){
        etudiant= await etudiantService.getById(req.params.id);
    }
    
    res.render('etudiants/list',{
        etudiants:  etudiants,
        viewMode:req.params.viewMode,
        etudiant: etudiant.shift(),
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/save', async (req, res)=>{
    const {matricule, nom, prenom, age, nationnalite, mail}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    
    var etudiantCheck= await etudiantService.getByEtudiant(matricule, nom, prenom, age, nationnalite, mail);
    if(etudiantCheck.rowCount> 0){
        req.flash('error', "Cet etudiant existe deja");
        res.redirect('/etudiant/list/CREATE');
    }else{
    var rs=await etudiantService.insert(matricule, nom, prenom, age, nationnalite,mail, who_done, when_done);
    var code = rs.rows[0].id_etudiant;
    if(rs.rowCount==1){
        var resultUtilisateur=await utilisateurService.insert(nom, prenom, matricule, 1234, 'etudiant', who_done, when_done, code);
        if (resultUtilisateur.rowCount==1){
        req.flash('success', "Etudiant ajouté avec success");
        res.redirect('/etudiant/list/CREATE');
    }
    }else{
        req.flash('error', "etudiant non ajouté");
        res.redirect('/etudiant/list/CREATE');
    }
    }

});

router.post('/edit', async (req, res)=>{
    const {matricule, nom, prenom, age, nationnalite, mail, id}=req.body;
    var who_done=req.session.user.nom_prenom; //a implater apres session
    var when_done=new Date();
    var etudiantCheck= await etudiantService.getByEtudiant(matricule, nom, prenom, age, nationnalite, mail);
    if(etudiantCheck.rowCount> 0){
        req.flash('error', "Cet etudiant existe deja");
        res.redirect('/etudiant/list/CREATE');
    } else{
    var rs=await etudiantService.edit(matricule, nom, prenom, age, nationnalite, mail, who_done, when_done, id);
    if(rs.rowCount==1){
        req.flash('success', "Etudiant modiifer avec success");
        res.redirect('/etudiant/list/CREATE');
    }else{
        req.flash('error', "etudiant non modifie");
        res.redirect('/etudiant/list/CREATE');
    }
}

});

router.get('/delete/:id?', async (req, res)=>{
    var id=req.params.id;
    var who_done="test"; //a implater apres session
    var when_done=new Date();
    var deleted="true";
    var rs=await etudiantService.delet(who_done, when_done, deleted,id);
    if(rs.rowCount==1){
        req.flash('success', "Etudiant supprimer avec success");
        res.redirect('/etudiant/list/CREATE');
    }else{
        req.flash('error', "etudiant non supprimer");
        res.redirect('/etudiant/list/CREATE');
    }

});

router.get('/downloadCours/:id?', async (req, res)=>{
    var id=req.params.id;
    var chemin_absolu=await etudiantService.downloadCours(id);
    res.download(chemin_absolu,
                    function (err) {
                //     if (err) {
                //         req.flash('error', "Document non télécharger");
                //         res.redirect('/module1/list/');
                //         console.log(err);  
                //     }else{
                //     req.flash('success', "Document télécharger avec success");
                //     res.redirect('/module1/list/');
                // }
                    
                }
                )
});
router.get('/downloadEvaluation/:id?', async (req, res)=>{
    var id=req.params.id;
    var chemin_absolu=await etudiantService.downloadEvaluation(id);
    res.download(chemin_absolu,
                    function (err) {
                //     if (err) {
                //         req.flash('error', "Document non télécharger");
                //         res.redirect('/module1/list/');
                //         console.log(err);  
                //     }else{
                //     req.flash('success', "Document télécharger avec success");
                //     res.redirect('/module1/list/');
                // }
                    
                }
                )
});
router.get('/downloadTutorial/:id?', async (req, res)=>{
    var id=req.params.id;
    var chemin_absolu=await etudiantService.downloadTutorial(id);
    res.download(chemin_absolu,
                    function (err) {
                //     if (err) {
                //         req.flash('error', "Document non télécharger");
                //         res.redirect('/module1/list/');
                //         console.log(err);  
                //     }else{
                //     req.flash('success', "Document télécharger avec success");
                //     res.redirect('/module1/list/');
                // }
                    
                }
                )
});



module.exports=router;