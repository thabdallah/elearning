var noteProfService = require('../services/noteProfService');
var moduleService2=require('../services/moduleService2');
var etudiantSectionService=require('../services/etudiantSectionService');
var express=require('express');
var router=express.Router();


router.get('/list', async (req, res)=>{
    var codeProf='2'//A implementer apres session
    var codeAnnee='8'//A implementer apres session
    cour=await moduleService2.listByProfAndAnneandNote(codeProf, codeAnnee);
    var who_done = req.session.user.nom_prenom;
    // cours=await moduleService2.list(codeProf, codeAnnee);
    res.render('notes/list', {
        cour:cour,
        // etudiant_sections:etudiant_sections,
        // cours:cours,
        who_done:who_done,
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/check', async (req, res)=>{
    const {prof_module}=req.body;
    var codeProfModule='12'//A implementer apres session
    etudiants = await noteProfService.getByEtudiantSection(prof_module);
    notes_etudiant=await noteProfService.list(codeProfModule);
    res.render('notes/list',{
        etudiants:etudiants,
        notes:notes_etudiant,
       })
});

router.post('/save', async (req, res)=>{
    const {notes, etudiantss, prof_module}=req.body;
    // var who_done='test';
    // var when_done= new Date();
    //console.log(notes);
    var rs= noteProfService.isNoteValide(notes);
    if(!rs){
        req.flash('error', "Veuillez entrer des notes valides");
        res.redirect('/noteProf/list/');
    }else{
        // var checkNoteEtudiant = await noteProfService.getByNoteEtudiant(notes, etudiantss, prof_module)
        var notesTableau=noteProfService.fetchNote(notes, etudiantss, prof_module);
        for(var i=0; i<notesTableau.length; i++){
          var checkNoteEtudiant=  await noteProfService.getByNoteEtudiant(notesTableau[i]);
        } 
        console.log(checkNoteEtudiant);
        if (checkNoteEtudiant.rowCount>0) {
            req.flash('error', "Les notes de ce module ont ete deja saissi");
            res.redirect('/noteProf/list/');
        }
        else{
            var notesTableau=noteProfService.fetchNote(notes, etudiantss, prof_module);
            for(var i=0; i<notesTableau.length; i++){
                await noteProfService.insert(notesTableau[i]);
            } 
            req.flash('success', "notes ajoutés avec success");
            res.redirect('/noteProf/list/');
        } 
    }
});

module.exports=router;