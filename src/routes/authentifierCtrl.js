var express = require('express');
var router= express.Router();
var authentifierService=require('../services/authentifierService')


router.get('/logout', async (req, res)=>{
    res.render('authentification/form',{
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/login', async(req, res) => {
    const {login, password}=req.body;
    if (!login || !password) {
        req.flash("error","Veuillez bien remplir le formulaire !");
        return res.redirect('/logout');  
    }else{
        var user = await authentifierService.check(login, password);
        if (user.rows.length==1) {
            u=user.rows.shift();
            req.session.user={login: u.login, profil: u.profil, nom_prenom: u.nom_utilisateur+' '+u.prenom_utilisateur, code: u.code};
            if (req.session.user.profil=='admin'){
                return res.redirect('/annee/list/CREATE')
            }else if (req.session.user.profil=='etudiant') {
            var etudiant_section = await authentifierService.getEtudiantSection(req.session.user.code);
            console.log(etudiant_section);
            if(etudiant_section.rows.length==1){
                es=etudiant_section.rows.shift();
                req.session.etudiant_section={etudiant: es.etudiant, codesect: es.section};
                return res.redirect('/module1/list')               
            }
            }else if (req.session.user.profil=='professeur') {
                var codeProf = req.session.user.code;
                var codeAnnee ='8';
                var prof_annee = await authentifierService.getProfByAnnee(codeProf, codeAnnee);
                if (prof_annee.rows.length==0) {
                    res.send("VOUS N'AVEZ PAS ETE PROGRAMME")
                }else{
                    p=prof_annee.rows.shift();
                    req.session.prof_annee={prof: p.professeur, codeprof: p.codeprof};    
                    return res.redirect('/module2/list')               
                }
            }     
        }else{
            req.flash("error", "Login et/ou mot de passe incorrect");
            return res.redirect('/logout');
        }
    }
    // var rs = await authentifierService.check(user, password);
    // if(rs.rowCount==1){
    //     if (rs.rows[0].profile=='admin') {
    //         res.redirect('/annee/list/CREATE');
    //     } else if (rs.rows[0].profile=='professeur') {
    //         res.redirect('/module2/list');
    //     }else if(rs.rows[0].profile=='etudiant'){
    //         res.redirect('/module1/list');
    //     } 
    //     console.log(rs);
    // }else if(rs.rowCount==0){
    //     req.flash('error', "Login ou Password incorrect");
    //     res.redirect('/logout');
    //     console.log(rs);
    // }
});

module.exports=router;